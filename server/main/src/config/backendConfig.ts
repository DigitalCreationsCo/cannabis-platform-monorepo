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

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'https://app.grascannabis.org';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	apiDomain,
	websiteDomain: baseDomain,
	apiBasePath: '/api/v1',
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
							consumeCode: async (input: PasswordlessSignInRequestPayload) => {
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

									if (
										response.status === 'OK'
										// && response.createdNewUser === false
									) {
										let user: UserWithDetails | DriverWithDetails | null;
										if (input.userContext.appUser === 'DRIVER') {
											if (response.user.email) {
												user = await DriverDA.getDriverByEmail(
													response.user.email,
												);
												response.user = {
													...response.user,
													...user,
												} as Passwordless.User & DriverWithDetails;
											} else if (response.user.phoneNumber) {
												user = await DriverDA.getDriverByPhone(
													response.user.phoneNumber,
												);
												response.user = {
													...response.user,
													...user,
												} as Passwordless.User & DriverWithDetails;
											}
										} else {
											if (response.user.email) {
												user = await UserDA.getUserByEmail(response.user.email);
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
												} as Passwordless.User & UserWithDetails;
											} else if (response.user.phoneNumber) {
												user = await UserDA.getUserByPhone(
													response.user.phoneNumber,
												);
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
												} as Passwordless.User & UserWithDetails;
											}
										}
									}
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
			UserRoles.init(),
			Dashboard.init({
				apiKey: process.env.SUPERTOKENS_DASHBOARD_KEY,
			}),
		],
		isInServerlessEnv: false,
	};
};
