import Session from 'supertokens-node/recipe/session';
import { AuthConfig } from '../../interfaces';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	apiDomain,
	websiteDomain: dashboardDomain,
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
			Session.init({
				cookieSecure: true,
				cookieDomain: `.${baseDomain}`,
				jwt: { enable: true },
			}),
		],
		isInServerlessEnv: false,
	};
};
