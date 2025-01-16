import { LoadingPage, Paragraph } from '@gras/ui';
import { loadHotJar } from '@gras/core/lib/hotjar/hotjar-dashboard';
import {
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from 'next';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect } from 'react';
import toast from 'react-hot-toast';
import { JoinWithInvitation, Join } from '@/components/auth';
import GithubButton from '@/components/auth/GithubButton';
import GoogleButton from '@/components/auth/GoogleButton';
import { AuthLayout } from '@/components/layouts';
import { authProviderEnabled } from '@/lib/auth';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';

const Signup: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ authProviders, recaptchaSiteKey }) => {
	const router = useRouter();
	const { status } = useSession();
	const { t } = useTranslation('common');

	const { error, token } = router.query as {
		error: string;
		token: string;
	};

	useEffect(() => {
		if (error) {
			toast.error(t(error));
		}
	}, [error, t]);

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'authenticated') {
		router.push(env.redirectIfAuthenticated);
	}

	const params = token ? `?token=${token}` : '';

	return (
		<div className="bg-secondary text-inverse">
			<AuthLayout heading="get-started" description="create-a-business-account">
				<Head>
					<title>{t('create-a-business-account')}</title>
					{loadHotJar()}
				</Head>
				<div className="text-dark rounded p-6 bg-inverse drop-shadow">
					<div className="flex gap-2 flex-wrap">
						{authProviders.github && <GithubButton />}
						{authProviders.google && <GoogleButton />}
					</div>

					{(authProviders.github || authProviders.google) &&
						authProviders.credentials && (
							<div className="divider">{t('or')}</div>
						)}

					{authProviders.credentials && (
						<>
							{token ? (
								<JoinWithInvitation
									inviteToken={token}
									recaptchaSiteKey={recaptchaSiteKey}
								/>
							) : (
								<Join recaptchaSiteKey={recaptchaSiteKey} />
							)}
						</>
					)}
					<Paragraph className="text-center text-sm text-gray-600 mt-3">
						{t('already-have-an-account')}
						<Link
							href={`/auth/login/${params}`}
							className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
						>
							&nbsp;{t('sign-in')}
						</Link>
					</Paragraph>
				</div>
			</AuthLayout>
		</div>
	);
};

Signup.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { locale } = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			authProviders: authProviderEnabled(),
			recaptchaSiteKey: env.recaptcha.siteKey,
		},
	};
};

export default Signup;
