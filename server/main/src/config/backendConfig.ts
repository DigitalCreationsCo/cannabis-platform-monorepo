/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import {
	phoneWithoutDialCode,
	type PasswordlessSignInRequestPayload,
} from '@cd/core-lib';
import {
	Driver,
	type DriverWithSessionJoin,
	type UserWithDetails,
} from '@cd/data-access';
import { createId } from '@paralleldrive/cuid2';
import { driver, user } from 'api/routes';
import { response } from 'express';
import jwksClient from 'jwks-rsa';
import SuperTokens, { RecipeUserId } from 'supertokens-node';
import { type User } from 'supertokens-node/lib/build/types';
import Dashboard from 'supertokens-node/recipe/dashboard';
import jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type AuthConfig } from '../../interfaces';
import { DriverDA, UserDA } from '../api/data-access';

type STUser = User & (UserWithDetails | DriverWithSessionJoin);

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'https://app.grascannabis.org';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;
const apiBasePath = '/api/v1';

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	apiDomain,
	websiteDomain: baseDomain,
	apiBasePath,
};

export const backendConfig = (): AuthConfig => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
				override: {
					functions: (originalImplementation) => {
						return {
							...originalImplementation,
							createCode: async (input) => {
								try {
									return await originalImplementation.createCode(input);
								} catch (error) {
									throw new Error(
										'The Sign In server is not available. Please contact Gras team.',
									);
								}
							},
							consumeCode: async (
								input: any,
							): Promise<
								| {
										status: 'OK';
										createdNewUser: boolean;
										user: STUser;
								  }
								| any
							> => {
								try {
									const response = await originalImplementation.consumeCode(
										input,
									);
									console.info('response, ', response);
									if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
										throw new Error(`Invalid passcode. Please try again. 
                          You have ${
														response.maximumCodeInputAttempts -
														response.failedCodeInputAttemptCount
													} attempts left.`);
									}

									if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
										throw new Error(`Invalid passcode. Please try again. 
                          You have ${
														response.maximumCodeInputAttempts -
														response.failedCodeInputAttemptCount
													} attempts left.`);
									}

									if (response.status === 'RESTART_FLOW_ERROR') {
										console.error(response.status);
										throw new Error('There was an error. Please try again.');
									}

									if (response.status === 'OK') {
										let driver: DriverWithSessionJoin;
										let user: UserWithDetails;
										switch (input.userContext.appUser) {
											case 'DRIVER':
												// driver sign in flow
												// the driver is already created in the database at this point, from the signup form
												if (response.user.emails[0]) {
													driver = (await DriverDA.getDriverByEmail(
														response.user.emails[0],
													)) as DriverWithSessionJoin;
												} else if (response.user.phoneNumbers[0]) {
													driver = (await DriverDA.getDriverByPhone(
														response.user.phoneNumbers[0],
													)) as DriverWithSessionJoin;
												} else {
													driver = (await DriverDA.getDriverById(
														response.user.id,
													)) as DriverWithSessionJoin;
												}

												// map new supertokens user with created driver id
												if (
													response.createdNewRecipeUser &&
													response.user.loginMethods.length === 1
												) {
													const externalUserId = driver.user.id;

													await SuperTokens.createUserIdMapping({
														superTokensUserId: response.user.id,
														externalUserId,
													});
													response.user.id = externalUserId;
													response.user.loginMethods[0].recipeUserId =
														new RecipeUserId(externalUserId);
												}
												response.user = {
													...response.user,
													...driver,
												};
												// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
												break;

											default:
												// user sign in flow
												// the user is created in supertokens first, the signup form is completed afterward
												if (
													response.createdNewRecipeUser &&
													response.user.loginMethods.length === 1
												) {
													const externalUserId = createId();
													await SuperTokens.createUserIdMapping({
														superTokensUserId: response.user.id,
														externalUserId,
													});
													response.user.id = externalUserId;
													response.user.loginMethods[0].recipeUserId =
														new RecipeUserId(externalUserId);
												} else if (response.user.emails[0]) {
													user = await UserDA.getUserByEmail(
														response.user.emails[0],
													);
												} else if (response.user.phoneNumbers[0]) {
													user = await UserDA.getUserByPhone(
														phoneWithoutDialCode(response.user.phoneNumbers[0]),
													);
												}
												if (
													user?.memberships?.length > 0 &&
													(user?.memberships?.[0]?.role.toLocaleUpperCase() ===
														'ADMIN' ||
														user?.memberships?.[0]?.role.toLocaleUpperCase() ===
															'OWNER' ||
														user?.memberships?.[0]?.role.toLocaleUpperCase() ===
															'MEMBER')
												) {
													const addRole = await UserRoles.addRoleToUser(
														response.user.id,
														response.user.id,
														user?.memberships?.[0]?.role.toLocaleUpperCase(),
													);
													if (addRole.status === 'UNKNOWN_ROLE_ERROR') {
														// No such role exists
														console.info('no such role exists');
													}
													if (
														addRole.status === 'OK' &&
														addRole.didUserAlreadyHaveRole === true
													) {
														console.log('user already had the role');
														// The user already had the role
													}
												}

												response.user = {
													...response.user,
													...user,
												};
												// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
												break;
										}
										return response;
									}
								} catch (error: any) {
									console.error(' consume code error: ', error);
									return { message: error.message };
									// throw new Error(error.message);
								}
							},
						};
					},
					apis: (originalImplementation) => {
						return {
							...originalImplementation,
							consumeCodePOST: async (
								// input: PasswordlessSignInRequestPayload & { options: any },
								input: any,
							) => {
								const { appUser } = await input.options.req.getJSONBody();
								input.userContext = { ...input.userContext, appUser };
								return originalImplementation.consumeCodePOST(input);
							},
						};
					},
				},
			}),
			Session.init({
				cookieSecure: true,
				cookieDomain: `.${baseDomain}`,
			}),
			UserRoles.init(),
			Dashboard.init({
				apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
			}),
			jwt.init(),
		],
		isInServerlessEnv: false,
	};
};

// eslint-disable-next-line no-var
export const jwtClient = jwksClient({
	jwksUri: `${apiDomain}${apiBasePath}/jwt/jwks.json`,
});

export async function createToken(payload: any) {
	const jwtResponse = await jwt.createJWT({
		...payload,
		source: 'microservice',
	});
	if (jwtResponse.status === 'OK') {
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create JWT. Should never come here.');
}
