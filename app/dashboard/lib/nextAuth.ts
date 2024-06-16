/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
import { randomUUID } from 'crypto';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { maxLengthPolicies, forceConsume } from '@cd/core-lib';
import {
	createUser,
	getUser,
	Role,
	getAccount,
	addStaffMember,
	getDispensary,
} from '@cd/data-access';
import { setCookie, getCookie } from 'cookies-next';
import type {
	NextApiRequest,
	NextApiResponse,
	GetServerSidePropsContext,
} from 'next';
import {
	type Account,
	type NextAuthOptions,
	type Profile,
	type User,
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import { encode, decode } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import BoxyHQSAMLProvider from 'next-auth/providers/boxyhq-saml';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import {
	clearLoginAttempts,
	exceededLoginAttemptsThreshold,
	incrementLoginAttempts,
} from '@/lib/accountLock';
import { verifyPassword, isAuthProviderEnabled } from '@/lib/auth';
import { sendMagicLink } from '@/lib/email/sendMagicLink';
import { isEmailAllowed } from '@/lib/email/utils';
import env from '@/lib/env';
import { validateRecaptcha } from '@/lib/recaptcha';
import { clientPromise } from './db';

import { slackNotify } from './slack';

const adapter = MongoDBAdapter(clientPromise);
const providers: Provider[] = [];
const sessionMaxAge = 30 * 24 * 60 * 60; // 30 days
const useSecureCookie = env.appUrl.startsWith('https://');

export const sessionTokenCookieName =
	(useSecureCookie ? '__Secure-' : '') + 'next-auth.session-token';

if (isAuthProviderEnabled('credentials')) {
	providers.push(
		CredentialsProvider({
			id: 'credentials',
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
				recaptchaToken: { type: 'text' },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error('no-credentials');
				}

				const client = await clientPromise;
				const { email, password, recaptchaToken } = credentials;

				await validateRecaptcha(recaptchaToken);

				if (!email || !password) {
					return null;
				}

				const user = await getUser({ client, where: { email } });

				console.trace('user ', user);
				if (!user) {
					throw new Error('invalid-credentials');
				}

				if (exceededLoginAttemptsThreshold(user)) {
					throw new Error('exceeded-login-attempts');
				}

				if (env.confirmEmail && !user.emailVerified) {
					throw new Error('confirm-your-email');
				}

				const hasValidPassword = await verifyPassword(
					password,
					user?.password as string
				);

				if (!hasValidPassword) {
					console.debug('user gave invalid password');
					if (
						exceededLoginAttemptsThreshold(await incrementLoginAttempts(user))
					) {
						throw new Error('exceeded-login-attempts');
					}

					throw new Error('invalid-credentials');
				}

				await clearLoginAttempts(user);

				return {
					id: user.id,
					name: user.name,
					email: user.email,
				};
			},
		})
	);
}

if (isAuthProviderEnabled('github')) {
	providers.push(
		GitHubProvider({
			clientId: env.github.clientId,
			clientSecret: env.github.clientSecret,
			allowDangerousEmailAccountLinking: true,
		})
	);
}

if (isAuthProviderEnabled('google')) {
	providers.push(
		GoogleProvider({
			clientId: env.google.clientId,
			clientSecret: env.google.clientSecret,
			allowDangerousEmailAccountLinking: true,
		})
	);
}

if (isAuthProviderEnabled('saml')) {
	providers.push(
		BoxyHQSAMLProvider({
			authorization: { params: { scope: '' } },
			issuer: env.jackson.selfHosted ? env.jackson.url : env.appUrl,
			clientId: 'dummy',
			clientSecret: 'dummy',
			allowDangerousEmailAccountLinking: true,
			httpOptions: {
				timeout: 30000,
			},
		})
	);
}

// console.info(
// 	'jackson url: ',
// 	env.jackson.selfHosted ? env.jackson.url : env.appUrl,
// );
// console.info('appUrl: ', env.appUrl);
// console.info('NEXTAUTH_URL: ', process.env.NEXTAUTH_URL);
// console.info('NEXTAUTH_SESSION_STRATEGY: ', env.nextAuth.sessionStrategy);
if (isAuthProviderEnabled('idp-initiated')) {
	providers.push(
		CredentialsProvider({
			id: 'boxyhq-idp',
			name: 'IdP Login',
			credentials: {
				code: {
					type: 'text',
				},
			},
			async authorize(credentials) {
				const { code } = credentials || {};

				if (!code) {
					return null;
				}

				const samlLoginUrl = env.jackson.selfHosted
					? env.jackson.url
					: env.appUrl;

				const res = await fetch(`${samlLoginUrl}/api/oauth/token`, {
					method: 'POST',
					body: JSON.stringify({
						grant_type: 'authorization_code',
						client_id: 'dummy',
						client_secret: 'dummy',
						redirect_url: process.env.NEXTAUTH_URL,
						code,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (res.status !== 200) {
					forceConsume(res);
					return null;
				}

				const json = await res.json();
				if (!json?.access_token) {
					return null;
				}

				const resUserInfo = await fetch(`${samlLoginUrl}/api/oauth/userinfo`, {
					headers: {
						Authorization: `Bearer ${json.access_token}`,
					},
				});

				if (!resUserInfo.ok) {
					forceConsume(resUserInfo);
					return null;
				}

				const profile = await resUserInfo.json();

				if (profile?.id && profile?.email) {
					return {
						name: [profile.firstName, profile.lastName]
							.filter(Boolean)
							.join(' '),
						image: null,
						...profile,
					};
				}

				return null;
			},
		})
	);
}

if (isAuthProviderEnabled('email')) {
	providers.push(
		EmailProvider({
			server: {
				host: env.smtp.host,
				port: env.smtp.port,
				auth: {
					user: env.smtp.user,
					pass: env.smtp.password,
				},
			},
			from: env.smtp.from,
			maxAge: 1 * 60 * 60, // 1 hour
			sendVerificationRequest: async ({ identifier, url }) => {
				await sendMagicLink(identifier, url);
			},
		})
	);
}

async function createDatabaseSession(
	user: any,
	req: NextApiRequest | GetServerSidePropsContext['req'],
	res: NextApiResponse | GetServerSidePropsContext['res']
) {
	const sessionToken = randomUUID();
	const expires = new Date(Date.now() + sessionMaxAge * 1000);

	if (adapter.createSession) {
		await adapter.createSession({
			sessionToken,
			userId: user.id,
			expires,
		});
	}

	setCookie(sessionTokenCookieName, sessionToken, {
		req,
		res,
		expires,
		secure: useSecureCookie,
	});
}

export const getAuthOptions = (
	req: NextApiRequest | GetServerSidePropsContext['req'],
	res: NextApiResponse | GetServerSidePropsContext['res']
) => {
	const isCredentialsProviderCallbackWithDbSession =
		(req as NextApiRequest).query &&
		(req as NextApiRequest).query.nextauth?.includes('callback') &&
		((req as NextApiRequest).query.nextauth?.includes('credentials') ||
			(req as NextApiRequest).query.nextauth?.includes('boxyhq-idp')) &&
		req.method === 'POST' &&
		env.nextAuth.sessionStrategy === 'database';

	const authOptions: NextAuthOptions = {
		adapter: adapter as Adapter,
		providers,
		pages: {
			signIn: '/auth/login',
			verifyRequest: '/auth/verify-request',
		},
		session: {
			strategy: env.nextAuth.sessionStrategy,
			maxAge: sessionMaxAge,
		},
		secret: env.nextAuth.secret,
		callbacks: {
			async signIn({ user, account, profile }) {
				if (!user || !user.email || !account) {
					return false;
				}

				console.trace('user? ', user);
				console.trace('account ', account);
				console.trace('profile ', profile);

				if (!isEmailAllowed(user.email)) {
					return '/auth/login?error=allow-only-work-email';
				}

				const client = await clientPromise;
				const existingUser = await getUser({
					client,
					where: { email: user.email },
				});
				const isIdpLogin = account.provider === 'boxyhq-idp';

				// Handle credentials provider
				if (isCredentialsProviderCallbackWithDbSession && !isIdpLogin) {
					await createDatabaseSession(user, req, res);
				}

				if (account?.provider === 'credentials') {
					return true;
				}

				// Login via email (Magic Link)
				if (account?.provider === 'email') {
					return Boolean(existingUser);
				}

				// First time users
				if (!existingUser) {
					const newUser = await createUser({
						client,
						data: {
							name: `${user.name}`,
							email: `${user.email}`,
						},
					});

					await linkAccount(newUser, account);

					if (isIdpLogin && user) {
						await linkToTeam(user as unknown as Profile, newUser.id);
					}

					if (account.provider === 'boxyhq-saml' && profile) {
						await linkToTeam(profile, newUser.id);
					}

					if (isCredentialsProviderCallbackWithDbSession) {
						await createDatabaseSession(newUser, req, res);
					}

					slackNotify()?.alert({
						text: 'New user signed up',
						fields: {
							Name: user.name || '',
							Email: user.email,
						},
					});

					return true;
				}

				// Existing users reach here
				if (isCredentialsProviderCallbackWithDbSession) {
					await createDatabaseSession(existingUser, req, res);
				}

				const linkedAccount = await getAccount({
					client,
					where: { userId: existingUser.id },
				});

				if (!linkedAccount) {
					await linkAccount(existingUser, account);
				}

				return true;
			},

			async session({ session, token, user }) {
				// When using JWT for sessions, the JWT payload (token) is provided.
				// When using database sessions, the User (user) object is provided.
				if (session && (token || user)) {
					session.user.id = token?.sub || user?.id;
				}

				if (user?.name) {
					user.name = user.name.substring(0, maxLengthPolicies.name);
				}
				if (session?.user?.name) {
					session.user.name = session.user.name.substring(
						0,
						maxLengthPolicies.name
					);
				}

				return session;
			},

			async jwt({ token, trigger, session, account }) {
				if (trigger === 'signIn' && account?.provider === 'boxyhq-idp') {
					const userByAccount = await adapter.getUserByAccount!({
						providerAccountId: account.providerAccountId,
						provider: account.provider,
					});

					return { ...token, sub: userByAccount?.id };
				}

				if (trigger === 'update' && 'name' in session && session.name) {
					return { ...token, name: session.name };
				}

				return token;
			},
		},
		jwt: {
			encode: async (params) => {
				if (isCredentialsProviderCallbackWithDbSession) {
					return getCookie(sessionTokenCookieName, { req, res }) || '';
				}

				return encode(params);
			},

			decode: async (params) => {
				if (isCredentialsProviderCallbackWithDbSession) {
					return null;
				}

				return decode(params);
			},
		},
	};

	return authOptions;
};

const linkAccount = async (user: User, account: Account) => {
	if (adapter.linkAccount) {
		return await adapter.linkAccount({
			providerAccountId: account.providerAccountId,
			userId: user.id,
			provider: account.provider,
			type: 'oauth',
			scope: account.scope,
			token_type: account.token_type as any,
			access_token: account.access_token,
		});
	}
};

const linkToTeam = async (profile: any, userId: string) => {
	const client = await clientPromise;
	const team = await getDispensary({
		client,
		where: { id: profile.requested.tenant },
	});

	// Sort out roles
	const roles = profile.roles || profile.groups || [];
	let userRole: Role = Role.MEMBER;

	for (let role of roles) {
		if (env.groupPrefix) {
			role = role.replace(env.groupPrefix, '');
		}

		// Owner > Admin > Member
		if (
			role.toUpperCase() === Role.ADMIN &&
			userRole.toUpperCase() !== Role.OWNER.toUpperCase()
		) {
			userRole = Role.ADMIN;
			continue;
		}

		if (role.toUpperCase() === Role.OWNER) {
			userRole = Role.OWNER;
			break;
		}
	}

	await addStaffMember({ client, dispensary: team.id, userId, role: userRole });
};
