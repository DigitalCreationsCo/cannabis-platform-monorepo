/* eslint-disable @typescript-eslint/naming-convention */
import {
	type AppUser,
	hasMembershipRoleAccess,
	TextContent,
	type ConsumeCodeResponse,
} from '@cd/core-lib';
import { type UserDispensaryStaffWithDispensaryDetails } from '@cd/data-access';
import { default as Router } from 'next/router';
import { type SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type WindowHandlerInterface } from 'supertokens-web-js/utils/windowHandler/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';

const appInfo = {
	appName,
	websiteDomain: dashboardDomain,
	websiteBasePath: '/',
	apiDomain: dashboardDomain,
	apiBasePath: '/api/auth',
};

export const frontendConfig = (): SuperTokensConfig => {
	return {
		appInfo,
		enableDebugLogs: process.env.SUPERTOKENS_DEBUG === 'true',
		recipeList: [
			Passwordless.init({
				contactMethod: 'EMAIL_OR_PHONE',
				// getRedirectionURL: async (context) => {
				// 	if (context.action === 'SUCCESS') {
				// 		console.info('getRedirectionURL context: ', context);

				// 		// called on a successful sign in / up. Where should the user go next?
				// 		const redirectToPath = context.redirectToPath;
				// 		if (redirectToPath !== undefined) {
				// 			// we are navigating back to where the user was before they authenticated
				// 			return redirectToPath;
				// 		}
				// 		if (context.isNewRecipeUser) {
				// 			// user signed up
				// 			return '/onboarding';
				// 		} else {
				// 			// user signed in
				// 			return '/dashboard';
				// 		}
				// 	}
				// 	// return undefined to let the default behaviour play out
				// 	return undefined;
				// },
				preAPIHook: async (context) => {
					const appUser: AppUser = 'DISPENSARY_USER';
					if (context.action === 'PASSWORDLESS_CONSUME_CODE') {
						// attach app-user identifier header to request
						context.requestInit.headers = {
							...context.requestInit.headers,
							'app-user': appUser,
						};
					}
					return context;
				},
				override: {
					functions: (oi) => {
						return {
							...oi,
							consumeCode: async (
								input,
							): Promise<
								| ConsumeCodeResponse<UserDispensaryStaffWithDispensaryDetails>
								| any
							> => {
								try {
									console.info('oi.consumeCode input: ', input);
									console.info(
										'oi.consumeCode input.userContext: ',
										input.userContext,
									);

									const response = (await oi.consumeCode(
										input,
									)) as unknown as ConsumeCodeResponse<UserDispensaryStaffWithDispensaryDetails>;

									if (
										!hasMembershipRoleAccess(response.userFromDb.user, 'MEMBER')
									) {
										throw new Error(
											TextContent.account.NO_MEMBERSHIP_PERMISSION,
										);
									}

									return response;
								} catch (error) {
									console.info('oi.consumeCode error: ', error);
									throw new Error(error.message);
								}
							},
						};
					},
				},
				onHandleEvent: (context: Passwordless.OnHandleEventContext) => {
					// onHandleEvent: (
					// 	context: Passwordless.OnHandleEventContext['action'] & {
					// 		_user: UserWithDetails;
					// 	},
					// ) => {
					if (context.action === 'SUCCESS') {
						console.info('Passwordless.onHandleEvent ', context);
						// const { user } = event as Passwordless.OnHandleEventContext & {
						// 	user: UserWithDetails;
						// };
						// const { _user: user } = context;
						// console.info('checking membership role access ', user);
					}
					return context;
				},
			}),
			Session.init(),
		],
		windowHandler: (oI: WindowHandlerInterface) => {
			return {
				...oI,
				location: {
					...oI.location,
					setHref: (href: string) => {
						Router.push(href);
					},
				},
			};
		},
	};
};
