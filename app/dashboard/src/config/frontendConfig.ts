/* eslint-disable @typescript-eslint/naming-convention */
import {
	type AppUser,
	hasMembershipRoleAccess,
	TextContent,
} from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
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
				// preAPIHook: async (context) => {
				// 	const appUser: AppUser = 'DISPENSARY_USER';
				// 	console.info('Passwordless.preAPIHook ', context);

				// 	if (context.action === 'PASSWORDLESS_CONSUME_CODE') {
				// 		// attach app-user identifier header to request
				// 		context.requestInit.headers = {
				// 			...context.requestInit.headers,
				// 			'app-user': appUser,
				// 		};
				// 	}
				// 	return context;
				// },
				// postAPIHook: (context) => {
				// 	console.info('Passwordless.postAPIHook ', context);
				// 	return context;
				// },
				// onHandleEvent: async (context) => {
				// 	console.info(
				// 		'onHandleEvent successful: ',
				// 		context.action === 'SUCCESS' && (context.user as any),
				// 	);
				// 	return context;
				// },
				// override: {
				// 	functions: (oi) => {
				// 		return {
				// 			...oi,
				// 			consumeCode: async (input) => {
				// 				console.info('oi.consumeCode input: ', input);
				// 				console.info(
				// 					'oi.consumeCode input.userContext: ',
				// 					input.userContext,
				// 				);

				// 				const response = await oi.consumeCode(input);
				// 				console.info('oi.consumeCode response: ', response);

				// 				console.info(
				// 					'oi.consumeCode response.user: ',
				// 					response.status === 'OK' && (response.user as any),
				// 				);
				// 				return response;
				// 			},
				// 		};
				// 	},
				// },
				// onHandleEvent: (
				// 	event: Passwordless.OnHandleEventContext & { _user: UserWithDetails },
				// ) => {
				// 	if (event.action === 'SUCCESS') {
				// 		console.info('Passwordless.onHandleEvent ', event);
				// 		// const { user } = event as Passwordless.OnHandleEventContext & {
				// 		// 	user: UserWithDetails;
				// 		// };
				// 		const { _user: user } = event;
				// 		console.info('checking membership role access ', user);
				// 		if (hasMembershipRoleAccess(user, 'MEMBER')) {
				// 			return;
				// 		} else {
				// 			throw new Error(TextContent.account.NO_MEMBERSHIP_PERMISSION);
				// 		}
				// 	}
				// },
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
