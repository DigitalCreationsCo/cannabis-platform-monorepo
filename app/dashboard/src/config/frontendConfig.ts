import { hasMembershipRoleAccess, TextContent } from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras';
const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'https://app.grascannabis.org';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

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
						console.info('Passwordless.onHandleEvent ', event);
						const { user } = event as Passwordless.OnHandleEventContext & {
							user: UserWithDetails;
						};
						console.info('checking membership role access ', user);
						if (hasMembershipRoleAccess(user, 'MEMBER')) {
							return;
						} else {
							throw new Error(TextContent.account.NO_MEMBERSHIP_PERMISSION);
						}
					}
				},
			}),
			Session.init(),
		],
	};
};
