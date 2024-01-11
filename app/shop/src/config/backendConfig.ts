/* eslint-disable sonarjs/cognitive-complexity */
import { createId } from '@paralleldrive/cuid2';
import jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import { type AuthConfig } from '../../interfaces';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'https://app.grascannabis.org';
const apiDomain = process.env.BACKEND_URL || `https://backend.grascannabis.org`;
const apiBasePath = '/api/v1';

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	apiDomain,
	websiteDomain: baseDomain,
	apiBasePath,
};

export const backendConfig = (): AuthConfig => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
			}),
			Session.init({
				cookieSecure: true,
				cookieDomain: `.${baseDomain}`,
			}),
			jwt.init(),
		],
		isInServerlessEnv: false,
	};
};

export async function createAnonymousJWT(payload: any) {
	const jwtResponse = await Session.createJWT(
		{
			id: `guest-${createId()}`,
		},
		60000,
	);
	if (jwtResponse.status === 'OK') {
		console.info('createAnonymousJWT jwtResponse: ', jwtResponse.jwt);
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create anonymous JWT. Should never come here.');
}
