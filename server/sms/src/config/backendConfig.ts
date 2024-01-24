/* eslint-disable no-case-declarations */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable sonarjs/cognitive-complexity */
import jwksClient from 'jwks-rsa';
import jwt from 'supertokens-node/recipe/jwt';
import Session from 'supertokens-node/recipe/session';
import { type AuthConfig } from '../../interfaces';

const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'grascannabis.org';
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
			connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
		},
		appInfo,
		recipeList: [
			Session.init({
				cookieSecure: true,
				cookieDomain: `.${baseDomain}`,
			}),
			jwt.init(),
		],
		isInServerlessEnv: false,
	};
};

// eslint-disable-next-line no-var
export const jwtClient = jwksClient({
	jwksUri: `${apiDomain}${apiBasePath}/jwt/jwks.json`,
});

export async function createToken(payload: any) {
	const jwtResponse = await jwt.createJWT({
		...payload,
		source: 'microservice',
	});
	if (jwtResponse.status === 'OK') {
		return jwtResponse.jwt;
	}
	throw new Error('Unable to create JWT. Should never come here.');
}
