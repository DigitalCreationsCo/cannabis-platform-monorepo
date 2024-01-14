/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import {
	getPhoneWithoutDialCode,
	type ConsumerCodeResponse,
	type PasswordlessSignInRequestPayload,
} from '@cd/core-lib';
import {
	type DriverWithSessionJoin,
	type UserWithDetails,
} from '@cd/data-access';
import { createId } from '@paralleldrive/cuid2';
import { response } from 'express';
import jwksClient from 'jwks-rsa';
import SuperTokens, { RecipeUserId } from 'supertokens-node';
import Dashboard from 'supertokens-node/recipe/dashboard';
import jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { user } from 'api/routes';
import { type AuthConfig } from '../../interfaces';
import { DriverDA, UserDA } from '../api/data-access';

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
							): Promise<ConsumerCodeResponse | any> => {
								try {
									const response = await originalImplementation.consumeCode(
										input,
									);
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
										// 	switch (input.userContext.appUser) {
										// 		case 'DRIVER':
										// 			(async () => {
										// 				let user: DriverWithSessionJoin = null;
										// 				// driver sign in flow
										// 				// the driver is already created in the database at this point, from the signup form
										// 				if (response.user.emails[0]) {
										// 					user = await DriverDA.getDriverByEmail(
										// 						response.user.emails[0],
										// 					);
										// 				} else if (response.user.phoneNumbers[0]) {
										// 					user = await DriverDA.getDriverByPhone(
										// 						response.user.phoneNumbers[0],
										// 					);
										// 				} else {
										// 					user = await DriverDA.getDriverById(
										// 						response.user.id,
										// 					);
										// 				}
										// 				// map new supertokens user with created driver id
										// 				if (
										// 					response.createdNewRecipeUser &&
										// 					response.user.loginMethods.length === 1
										// 				) {
										// 					const externalUserId = user.user.id;
										// 					await SuperTokens.createUserIdMapping({
										// 						superTokensUserId: response.user.id,
										// 						externalUserId,
										// 					});
										// 					response.user.id = externalUserId;
										// 					response.user.loginMethods[0].recipeUserId =
										// 						new RecipeUserId(externalUserId);
										// 				}
										// 				Object.assign(response, {
										// 					_user: {
										// 						user,
										// 						token: await createToken({
										// 							id: user.user.id,
										// 							email: user.user.email,
										// 						}),
										// 					},
										// 				});
										// 				// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
										// 			})();
										// 			break;
										// 		default:
										// 			(async () => {
										// 				let user: UserWithDetails = null;
										// 				// user sign in flow
										// 				// the user is created in supertokens first, the signup form is completed afterward
										// 				if (
										// 					response.createdNewRecipeUser &&
										// 					response.user.loginMethods.length === 1
										// 				) {
										// 					const externalUserId = createId();
										// 					await SuperTokens.createUserIdMapping({
										// 						superTokensUserId: response.user.id,
										// 						externalUserId,
										// 					});
										// 					response.user.id = externalUserId;
										// 					response.user.loginMethods[0].recipeUserId =
										// 						new RecipeUserId(externalUserId);
										// 				} else if (response.user.emails[0]) {
										// 					user = await UserDA.getUserByEmail(
										// 						response.user.emails[0],
										// 					);
										// 				} else {
										// 					console.info('consumeCode response, ', response);
										// 				}
										// 				// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
										// 			})();
										// 			break;
										// 	}
									}
									console.info('consumeCode response, ', response);
									return response as unknown as ConsumerCodeResponse;
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
							): Promise<ConsumerCodeResponse | any> => {
								try {
									console.info('consumeCodePOST input, ', input);
									const { appUser } = await input.options.req.getJSONBody();
									input.userContext = { ...input.userContext, appUser };
									const response =
										(await originalImplementation.consumeCodePOST(
											input,
										)) as unknown as ConsumerCodeResponse;

									if (response.status === 'OK') {
										switch (appUser) {
											case 'DRIVER':
												await (async () => {
													let user: DriverWithSessionJoin;

													// driver sign in flow
													// TODO: resolve when a user will log in,
													// if they will fill a web form,
													// or how to handle supertokens id to match the user id

													// in theory, the user can create the supertokens user, and
													// use the same email / phone to fill the web form,

													// On the backend, the same credential will be used to link
													// supertokens account and db account

													if (response.user.emails[0]) {
														user = await DriverDA.getDriverByEmail(
															response.user.emails[0],
														);
													} else if (response.user.phoneNumbers[0]) {
														user = await DriverDA.getDriverByPhone(
															getPhoneWithoutDialCode(
																response.user.phoneNumbers[0],
															),
														);
													} else {
														user = await DriverDA.getDriverById(
															response.user.id,
														);
													}

													if (
														response.createdNewRecipeUser &&
														response.user.loginMethods.length === 1
													) {
														const externalUserId = user.user.id;
														await SuperTokens.createUserIdMapping({
															superTokensUserId: response.user.id,
															externalUserId,
														});
														response.user.id = externalUserId;
														response.user.loginMethods[0].recipeUserId =
															new RecipeUserId(externalUserId);
														// if new user, send a welcome email
													}

													// map new supertokens user with created driver id
													response._user = {
														user: { ...user, id: response.user.id },
														token: await createToken({
															id: user.user.id,
														}),
													};
													// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
												})();
												break;

											default:
												await (async () => {
													let user: UserWithDetails;

													// user sign in flow
													// the user is created in supertokens first, the signup form is completed afterward

													// 2. in weed-text signup, the user is created before supertokens is called.
													// figure out a way to resolve this / call supertokens first to create the Passwordless user
													if (
														response.createdNewRecipeUser &&
														response.user.loginMethods.length === 1
													) {
														const externalUserId = createId();
														await SuperTokens.deleteUserIdMapping({
															userId: response.user.id,
														});
														await SuperTokens.createUserIdMapping({
															superTokensUserId: response.user.id,
															externalUserId,
														});
														response.user.id = externalUserId;

														console.info(
															'loginMethods[0], ',
															response.user.loginMethods[0],
														);
														response.user.loginMethods[0].recipeUserId =
															new RecipeUserId(externalUserId);

														// if new user, send a welcome email, and link to complete signup
														// if new user completed signup, send a welcome email
													} else {
														if (response.user.emails[0]) {
															user = await UserDA.getUserByEmail(
																response.user.emails[0],
															);
														} else if (response.user.phoneNumbers[0]) {
															user = await UserDA.getUserByPhone(
																getPhoneWithoutDialCode(
																	response.user.phoneNumbers[0],
																),
															);
														} else {
															user = await UserDA.getUserById(response.user.id);
														}
													}
													response._user = {
														user: { ...user, id: response.user.id },
														token: await createToken({
															id: response.user.id,
														}),
													};
												})();
												break;
										}
									}
									console.info('consumeCodePOST response, ', response);
									return response;
								} catch (error: any) {
									console.error('consumeCodePOST: ', error);
									return { message: error.message };
									// throw new Error(error.message);
								}
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
