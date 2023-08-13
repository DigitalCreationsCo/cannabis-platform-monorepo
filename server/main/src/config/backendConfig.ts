/* eslint-disable sonarjs/cognitive-complexity */
// import { UserRoleClaim } from "supertokens-node/recipe/userroles";
import { type PasswordlessSignInRequestPayload } from '@cd/core-lib';
import { type DriverWithDetails, type UserWithDetails } from '@cd/data-access';
import Dashboard from 'supertokens-node/recipe/dashboard';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { type AuthConfig } from '../../interfaces';
import { DriverDA, UserDA } from '../api/data-access';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	apiDomain,
	websiteDomain: dashboardDomain,
	// define this path for auth endpoints
	apiBasePath: '/api/v1',
};

export const backendConfig = (): AuthConfig => {
	console.info(' >> server/main backend config: ', appInfo);
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
									console.info('create-code input: ', input);
									const response = await originalImplementation.createCode(
										input,
									);
									console.info('create-code response: ', response);

									return response;
								} catch (error) {
									console.log(' create code error: ', error);
									throw new Error(
										'The Sign In server is not available. Please contact Gras team.',
									);
								}
							},

							consumeCode: async (input: PasswordlessSignInRequestPayload) => {
								try {
									console.info('consume-code input: ', input);
									const response = await originalImplementation.consumeCode(
										input,
									);
									console.info('consume-code response: ', response);

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

									if (
										response.status === 'OK' &&
										response.createdNewUser === false
									) {
										let user;
										if (input.userContext.appUser === 'DRIVER') {
											if (response.user.email) {
												user =
													(await DriverDA.getDriverByEmail(
														response.user.email,
													)) || null;
												response.user = {
													...response.user,
													...user,
												} as Passwordless.User & DriverWithDetails;
											} else if (response.user.phoneNumber) {
												user =
													(await DriverDA.getDriverByPhone(
														response.user.phoneNumber,
													)) || null;
												response.user = {
													...response.user,
													...user,
												} as Passwordless.User & DriverWithDetails;
											}
										} else {
											if (response.user.email) {
												user =
													(await UserDA.getUserByEmail(response.user.email)) ||
													null;
												const membershipRole =
													user.memberships?.[0]?.role.toLocaleUpperCase();
												console.info('membershipRole 1: ', membershipRole);
												if (
													membershipRole === 'ADMIN' ||
													membershipRole === 'OWNER' ||
													membershipRole === 'MEMBER'
												) {
													const addRole = await UserRoles.addRoleToUser(
														response.user.id,
														membershipRole,
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
												} as Passwordless.User & UserWithDetails;
											} else if (response.user.phoneNumber) {
												user =
													(await UserDA.getUserByPhone(
														response.user.phoneNumber,
													)) || null;
												const membershipRole =
													user.memberships?.[0]?.role.toLocaleUpperCase();
												console.info('membershipRole: 2 ', membershipRole);

												if (
													membershipRole === 'ADMIN' ||
													membershipRole === 'OWNER' ||
													membershipRole === 'MEMBER'
												) {
													console.info('membershipRole: ', membershipRole);
													console.info('user id: ', response.user.id);

													const addRole = await UserRoles.addRoleToUser(
														response.user.id,
														membershipRole,
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
												} as Passwordless.User & UserWithDetails;
											}
										}
									}
									console.debug('consume code finalized response: ', response);
									return response;
								} catch (error: any) {
									console.error(' consume code error: ', error);
									throw new Error(error.message);
								}
							},
						};
					},
					apis: (originalImplementation) => {
						return {
							...originalImplementation,
							consumeCodePOST: async (
								input: PasswordlessSignInRequestPayload & { options: any },
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
				jwt: {
					enable: true,
				},
			}),
			UserRoles.init({
				override: {
					functions: (oI) => {
						// oI.createNewRoleOrAddPermissions({
						// 	role: 'OWNER',
						// 	permissions: ['OWNER'],
						// 	userContext: {},
						// });
						// oI.createNewRoleOrAddPermissions({
						// 	role: 'ADMIN',
						// 	permissions: ['ADMIN'],
						// 	userContext: {},
						// });
						// oI.createNewRoleOrAddPermissions({
						// 	role: 'MEMBER',
						// 	permissions: ['MEMBER'],
						// 	userContext: {},
						// });
						return oI;
					},
					apis: (oI) => {
						return oI;
					},
				},
			}),
			Dashboard.init({
				apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
			}),
		],
		isInServerlessEnv: false,
	};
};
