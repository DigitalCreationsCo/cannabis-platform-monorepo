/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import {
	type AppUser,
	getPhoneWithoutDialCode,
	type ConsumeCodeResponse,
	type UserFromDBAuthResponse,
} from '@cd/core-lib';
import jwksClient from 'jwks-rsa';
import SuperTokens, { RecipeUserId } from 'supertokens-node';
import { type HttpRequest } from 'supertokens-node/lib/build/types';
import Dashboard from 'supertokens-node/recipe/dashboard';
import Jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type AuthConfig } from '../../interfaces';
import { DriverDA, UserDA } from '../api/data-access';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
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
			networkInterceptor: (request: HttpRequest, userContext: any) => {
				console.log('networkInterceptor userContext: ', userContext);
				console.log('networkInterceptor http request to core: ', request);
				// this can also be used to return a modified request object.
				return request;
			},
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
				override: {
					functions: (oi) => {
						return {
							...oi,
							createCode: async (input) => {
								try {
									return await oi.createCode(input);
								} catch (error) {
									throw new Error(
										'The Sign In server is not available. Please contact Gras Support.',
									);
								}
							},
						};
					},
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
									let user: UserFromDBAuthResponse['user'];
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
											try {
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
											} catch (error) {
												console.error('consumeCodePOST: ', error);
												throw new Error(error.message);
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
