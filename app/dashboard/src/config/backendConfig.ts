/* eslint-disable sonarjs/cognitive-complexity */
import { createId } from '@paralleldrive/cuid2';
import Jwt from 'supertokens-node/recipe/jwt';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import { type TypeInput } from 'supertokens-node/types';

const dashboardDomain =
	process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || 'http://localhost:3001';

const appInfo = {
	appName: process.env.NEXT_PUBLIC_SHOP_APP_NAME || 'Gras',
	websiteDomain: dashboardDomain,
	websiteBasePath: '/',
	apiDomain: dashboardDomain,
	apiBasePath: '/api/auth',
};

export const backendConfig = (): TypeInput => {
	return {
		framework: 'express',
		supertokens: {
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI as string,
			apiKey: process.env.SUPERTOKENS_CORE_API_KEY,
		},
		appInfo,
		recipeList: [
			Passwordless.init({
				flowType: 'USER_INPUT_CODE',
				contactMethod: 'EMAIL_OR_PHONE',
			}),
			Session.init(),
			Jwt.init(),
		],
		isInServerlessEnv: true,
	};
};

export async function createAnonymousJWT(payload: any) {
	const jwtResponse = await Session.createJWT(
		{
			id: `guest-${createId()}`,
			...payload,
		},
		60000,
	);
	if (jwtResponse.status === 'OK') {
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create anonymous JWT. Should never come here.');
}
