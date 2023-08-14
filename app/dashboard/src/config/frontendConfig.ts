import { hasMembershipRoleAccess, TextContent } from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `http://localhost:6001`;

const appInfo: AppInfo = {
	appName,
	websiteDomain: dashboardDomain,
	apiDomain,
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
				onHandleEvent: (event: Passwordless.OnHandleEventContext) => {
					if (event.action === 'SUCCESS') {
						const { user } = event as Passwordless.OnHandleEventContext & {
							user: UserWithDetails;
						};
						if (hasMembershipRoleAccess(user, 'MEMBER')) {
							return;
						} else {
							throw new Error(TextContent.account.NO_MEMBERSHIP_PERMISSION);
						}
					}
				},
			}),
			Session.init({ cookieDomain: `.${baseDomain}` }),
		],
		isInServerLessEnv: false,
	};
};
