import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const shopDomain =
	process.env.NEXT_PUBLIC_SHOP_APP_URL || 'http://localhost:3000';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;
const apiBasePath =
	(process.env.NODE_ENV === 'development' && 'api/v1') || '/main/api/v1';

const appInfo: AppInfo = {
	appName,
	websiteDomain: dashboardDomain,
	apiDomain,
	apiBasePath,
	apiGatewayPath: '/main',
};

export const frontendConfig = () => {
	console.info('dashboard frontend config: ', appInfo);
	return {
		appInfo,
		enableDebugLogs: process.env.SUPERTOKENS_DEBUG === 'true',
		recipeList: [
			Passwordless.init({
				contactMethod: 'EMAIL_OR_PHONE',
				onHandleEvent: (event: any) => {
					console.info('passwordless event: ', event);
					if (event.action === 'SUCCESS') {
						console.info(
							'role ? ',
							event.user &&
								event.user.memberships?.[0]?.role.toLocaleUpperCase(),
						);

						console.info(
							(event.user &&
								event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
									'ADMIN') ||
								event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
									'OWNER' ||
								event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
									'MEMBER',
						);
						if (
							(event.user &&
								event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
									'ADMIN') ||
							event.user.memberships?.[0]?.role.toLocaleUpperCase() ===
								'OWNER' ||
							event.user.memberships?.[0]?.role.toLocaleUpperCase() === 'MEMBER'
						) {
							window.location.href = dashboardDomain + '/dashboard';
						} else {
							throw new Error(
								`You don't have the admin permissions to sign in here. 
                                Please contact Gras support.`,
							);
						}
					}
				},
			}),
			Session.init({
				// tokenTransferMethod: "cookie",

				// sessionTokenFrontendDomain: '.localhost:3000',

				// define common top level domain
				// sessionTokenBackendDomain: `.${baseDomain}`,
				cookieDomain: `.${baseDomain}`,

				onHandleEvent: (event) => {
					if (event.action === 'UNAUTHORISED' || event.action === 'SIGN_OUT') {
						window.location.href = '/';
					}
					if (event.action === 'SESSION_CREATED') {
						if (
							event.userContext.memberships?.[0]?.role.toLocaleUpperCase() ===
								'ADMIN' ||
							event.userContext.memberships?.[0]?.role.toLocaleUpperCase() ===
								'OWNER'
						) {
							window.location.href = `${dashboardDomain}/dashboard`;
						} else {
							window.location.href = shopDomain;
						}
					}
				},
			}),
		],
		isInServerLessEnv: false,
	};
};
