import { google } from 'googleapis';
import { type Compute } from 'googleapis-common';

const PROJECT_ID = 'YOUR_GCP_PROJECT_NAME';
const VEHICLE_ID = 'YOUR_VEHICLE_ID';
const SERVICE_ACCOUNT = 'YOUR_SERVICE_ACCOUNT';
const SERVICE_ACCOUNT_EMAIL = `${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com`;

const HOWLONG = 55 * 60; // 55 minutes, cannot be more than 60 minutes

async function signToken(claims: any) {
	const googleAuth = new google.auth.GoogleAuth({
		scopes: ['https://www.googleapis.com/auth/cloud-platform'],
	});
	const authClient = (await googleAuth.getClient()) as Compute;
	google.options({ auth: authClient });

	const now = Math.round(Date.now() / 1000);
	const iat = now - 300;
	const exp = now + HOWLONG;

	const request = {
		name: `projects/-/serviceAccounts/${SERVICE_ACCOUNT_EMAIL}`,
		requestBody: {
			payload: JSON.stringify({
				iss: SERVICE_ACCOUNT_EMAIL,
				sub: SERVICE_ACCOUNT_EMAIL,
				aud: 'https://fleetengine.googleapis.com/',
				iat: iat,
				exp: exp,
				authorization: claims,
			}),
		},
	};

	const response = await google
		.iamcredentials('v1')
		.projects.serviceAccounts.signJwt(request)
		.catch((err) => {
			if (err.errors) throw err.errors;
			else throw err;
		});
	return response.data.signedJwt;
}

class AuthorizationHeaderProvider {
	token;
	constructor(token: string) {
		this.token = token;
	}

	getRequestMetadata(url, callback) {
		callback(null, { authorization: `Bearer ${this.token}` });
	}
}

export { signToken, AuthorizationHeaderProvider };
