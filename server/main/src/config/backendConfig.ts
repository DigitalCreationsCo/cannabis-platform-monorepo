/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import {
	type AppUser,
	getPhoneWithoutDialCode,
	type ConsumeCodeResponse,
} from '@cd/core-lib';
import {
	type UserWithDetails,
	type DriverWithSessionJoin,
	type UserDispensaryStaffWithDispensaryDetails,
} from '@cd/data-access';
import jwksClient from 'jwks-rsa';
import SuperTokens, { RecipeUserId } from 'supertokens-node';
import Dashboard from 'supertokens-node/recipe/dashboard';
import Jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
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
			// // enable for debugging
			// networkInterceptor: (request: HttpRequest, userContext: any) => {
			// 	console.log('networkInterceptor userContext: ', userContext);
			// 	console.log('networkInterceptor http request to core: ', request);
			// 	// this can also be used to return a modified request object.
			// 	return request;
			// },
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
				override: {
					// functions: (oi) => {
					// 	return {
					// 		...oi,
					// 		createCode: async (input) => {
					// 			try {
					// 				return await oi.createCode(input);
					// 			} catch (error) {
					// 				throw new Error(
					// 					'The Sign In server is not available. Please contact Gras Support.',
					// 				);
					// 			}
					// 		},
					// 	};
					// },
					apis: (oi) => {
						return {
							...oi,
							async consumeCodePOST(input): Promise<ConsumeCodeResponse | any> {
								console.info('consumeCodePOST input, ', input);

								let appUser: AppUser;

								const request = SuperTokens.getRequestFromUserContext(
									input.userContext,
								);

								if (request !== undefined) {
									appUser = request.getHeaderValue('app-user') as AppUser;
								} else {
									/**
									 * This is possible if the function is triggered from the user management dashboard
									 *
									 * In this case set a reasonable default value to use
									 */
									appUser = 'DISPENSARY_USER';
								}

								const response = (await oi.consumeCodePOST(
									input,
								)) as unknown as ConsumeCodeResponse;

								if (response.status === 'OK') {
									let user:
										| UserWithDetails
										| UserDispensaryStaffWithDispensaryDetails
										| DriverWithSessionJoin;
									switch (appUser) {
										case 'ADMIN_USER':
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
											break;
										case 'DISPENSARY_USER':
											if (response.user.emails[0]) {
												user = await UserDA.getDispensaryStaffUserByEmail(
													response.user.emails[0],
												);
											} else if (response.user.phoneNumbers[0]) {
												user = await UserDA.getDispensaryStaffUserByPhone(
													getPhoneWithoutDialCode(
														response.user.phoneNumbers[0],
													),
												);
											} else {
												user = await UserDA.getUserById(response.user.id);
											}
											break;
										case 'CUSTOMER_USER':
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
											break;
										case 'DRIVER_USER':
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
												user = await DriverDA.getDriverById(response.user.id);
											}
									}

									if (
										response.createdNewRecipeUser &&
										response.user.loginMethods.length === 1
									) {
										const externalUserId = user.id;
										await SuperTokens.deleteUserIdMapping({
											userId: response.user.id,
										});
										await SuperTokens.createUserIdMapping({
											superTokensUserId: response.user.id,
											externalUserId,
										});
										// response.user.id = externalUserId;
										response.user.loginMethods[0].recipeUserId =
											new RecipeUserId(externalUserId);

										// if new user, send a welcome email, and link to complete signup
										// if new user completed signup, send a welcome email
									}

									response.userFromDb = {
										user,
										token: await createToken({}),
									} as any;
								}

								console.info('consumeCodePOST response, ', response);

								return response;
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
			Jwt.init(),
			Dashboard.init({
				apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
			}),
		],
		isInServerlessEnv: false,
	};
};

export const jwtClient = jwksClient({
	jwksUri: `${apiDomain}${apiBasePath}/jwt/jwks.json`,
});

export async function createToken(payload: any) {
	const jwtResponse = await Jwt.createJWT({
		...payload,
		source: 'microservice',
	});
	if (jwtResponse.status === 'OK') {
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create JWT. Should never come here.');
}

// 	// functions: (originalImplementation) => {
// 	// 	return {
// 	// 		...originalImplementation,
// 	// 		createCode: async (input) => {
// 	// 			try {
// 	// 				return await originalImplementation.createCode(input);
// 	// 			} catch (error) {
// 	// 				throw new Error(
// 	// 					'The Sign In server is not available. Please contact Gras team.',
// 	// 				);
// 	// 			}
// 	// 		},

// 	apis: (originalImplementation) => {
// 		return {
// 			...originalImplementation,
// 			consumeCodePOST: async (
// 				// input: PasswordlessSignInRequestPayload & { options: any },
// 				input: any,
// 			): Promise<ConsumerCodeResponse | any> => {
// 				try {
// 					console.info('consumeCodePOST input, ', input);
// 					const { appUser } = await input.options.req.getJSONBody();
// 					input.userContext = { ...input.userContext, appUser };
// 					const response =
// 						(await originalImplementation.consumeCodePOST(
// 							input,
// 						)) as unknown as ConsumerCodeResponse;

// 					if (response.status === 'OK') {
// 						switch (appUser) {
// 							case 'DRIVER':
// 								await (async () => {
// 									let user: DriverWithSessionJoin;

// 									// driver sign in flow
// 									// TODO: resolve when a user will log in,
// 									// if they will fill a web form,
// 									// or how to handle supertokens id to match the user id

// 									// in theory, the user can create the supertokens user, and
// 									// use the same email / phone to fill the web form,

// 									// On the backend, the same credential will be used to link
// 									// supertokens account and db account

// 									if (response.user.emails[0]) {
// 										user = await DriverDA.getDriverByEmail(
// 											response.user.emails[0],
// 										);
// 									} else if (response.user.phoneNumbers[0]) {
// 										user = await DriverDA.getDriverByPhone(
// 											getPhoneWithoutDialCode(
// 												response.user.phoneNumbers[0],
// 											),
// 										);
// 									} else {
// 										user = await DriverDA.getDriverById(
// 											response.user.id,
// 										);
// 									}

// 									if (
// 										response.createdNewRecipeUser &&
// 										response.user.loginMethods.length === 1
// 									) {
// 										const externalUserId = user.user.id;
// 										await SuperTokens.createUserIdMapping({
// 											superTokensUserId: response.user.id,
// 											externalUserId,
// 										});
// 										response.user.id = externalUserId;
// 										response.user.loginMethods[0].recipeUserId =
// 											new RecipeUserId(externalUserId);
// 										// if new user, send a welcome email
// 									}

// 									// map new supertokens user with created driver id
// 									response._user = {
// 										user: { ...user, id: response.user.id },
// 										token: await createToken({
// 											id: user.user.id,
// 										}),
// 									};
// 									// RETURN JWT TOKEN IN ACCESS PAYLOAD ??
// 								})();
// 								break;

// 							default:
// 								await (async () => {
// 									let user: UserWithDetails;

// 									// user sign in flow
// 									// the user is created in supertokens first, the signup form is completed afterward

// 									// 2. in weed-text signup, the user is created before supertokens is called.
// 									// figure out a way to resolve this / call supertokens first to create the Passwordless user
// 									if (
// 										response.createdNewRecipeUser &&
// 										response.user.loginMethods.length === 1
// 									) {
// 										const externalUserId = createId();
// 										await SuperTokens.deleteUserIdMapping({
// 											userId: response.user.id,
// 										});
// 										await SuperTokens.createUserIdMapping({
// 											superTokensUserId: response.user.id,
// 											externalUserId,
// 										});
// 										response.user.id = externalUserId;

// 										console.info(
// 											'loginMethods[0], ',
// 											response.user.loginMethods[0],
// 										);
// 										response.user.loginMethods[0].recipeUserId =
// 											new RecipeUserId(externalUserId);

// 										// if new user, send a welcome email, and link to complete signup
// 										// if new user completed signup, send a welcome email
// 									} else {
// 										if (response.user.emails[0]) {
// 											user = await UserDA.getUserByEmail(
// 												response.user.emails[0],
// 											);
// 										} else if (response.user.phoneNumbers[0]) {
// 											user = await UserDA.getUserByPhone(
// 												getPhoneWithoutDialCode(
// 													response.user.phoneNumbers[0],
// 												),
// 											);
// 										} else {
// 											user = await UserDA.getUserById(response.user.id);
// 										}
// 									}
// 									// response._user = {
// 									// 	user: { ...user, id: response.user.id },
// 									// 	token: await createToken({
// 									// 		id: response.user.id,
// 									// 	}),
// 									// };
// 									response.user = {
// 										...response.user,
// 										...user,
// 										id: response.user.id,
// 										token: await createToken({
// 											id: response.user.id,
// 										}),
// 									} as any;
// 								})();
// 								break;
// 						}
// 					}
// 					console.info('consumeCodePOST response, ', response);
// 					return response;
// 				} catch (error: any) {
// 					console.error('consumeCodePOST: ', error);
// 					return { message: error.message };
// 					// throw new Error(error.message);
// 				}
// 			},
// 		};
// 	},
// },
