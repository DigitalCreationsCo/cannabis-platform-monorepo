import Passwordless from 'supertokens-auth-react/recipe/passwordless';
import Session from 'supertokens-auth-react/recipe/session';
import { type AppInfo } from 'supertokens-node/lib/build/types';

const fleetTrackingDomain =
	process.env.NEXT_PUBLIC_FLEET_TRACKING_APP_URL || 'http://localhost:3000';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

const appInfo: AppInfo = {
	appName: 'fleet-tracking',
	websiteDomain: fleetTrackingDomain,
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
			}),
			Session.init(),
		],
	};
};
