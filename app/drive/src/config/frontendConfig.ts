/* eslint-disable @typescript-eslint/naming-convention */
import { type AppUser } from '@cd/core-lib';
import { default as Router } from 'next/router';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const driveDomain =
	process.env.NEXT_PUBLIC_DRIVE_APP_URL || 'http://localhost:3002';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

const appInfo: AppInfo = {
	appName,
	websiteDomain: driveDomain,
	apiDomain,
	// query this path for all auth requests
	apiBasePath:
		(process.env.NODE_ENV === 'production' && '/main/api/v1') || '/api/v1',
};

export const frontendConfig = () => {
	return {
		appInfo,
		enableDebugLogs: process.env.SUPERTOKENS_DEBUG === 'true',
		recipeList: [
			Passwordless.init({
				contactMethod: 'EMAIL_OR_PHONE',
				preAPIHook: async (context) => {
					const appUser: AppUser = 'DRIVER_USER';
					console.info('Passwordless.preAPIHook ', context);

					if (context.action === 'PASSWORDLESS_CONSUME_CODE') {
						// attach app-user identifier header to request
						context.requestInit.headers = {
							...context.requestInit.headers,
							'app-user': appUser,
						};
					}
					return context;
				},
				postAPIHook: async (context) => {
					console.info('Passwordless.postAPIHook ', context);
				},
				onHandleEvent: async (context) => {
					console.info(
						'onHandleEvent successful: ',
						context.action === 'SUCCESS' && (context.user as any),
					);
					return context;
				},
				override: {
					functions: (oi) => {
						return {
							...oi,
							consumeCode: async (input) => {
								try {
									console.info('oi.consumeCode input: ', input);
									console.info(
										'oi.consumeCode input.userContext: ',
										input.userContext,
									);

									const response = await oi.consumeCode(input);
									console.info('oi.consumeCode response: ', response);

									console.info(
										'oi.consumeCode response.user: ',
										response.status === 'OK' && (response.user as any),
									);
									return response;
								} catch (error) {
									console.info('frontend config consumeCode: ', error);
									throw new Error(error.message);
								}
							},
						};
					},
				},
			}),
			Session.init(),
		],
		windowHandler: (oI: any) => {
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
