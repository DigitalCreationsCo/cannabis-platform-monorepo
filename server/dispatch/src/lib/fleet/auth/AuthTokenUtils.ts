/* eslint-disable @typescript-eslint/naming-convention */
import { google } from 'googleapis';
import { type Compute } from 'googleapis-common';

export class AuthTokenUtils {
	static PROJECT_ID = 'YOUR_GCP_PROJECT_NAME';
	static VEHICLE_ID = 'YOUR_VEHICLE_ID';
	static SERVICE_ACCOUNT = 'YOUR_SERVICE_ACCOUNT';
	static SERVICE_ACCOUNT_EMAIL = `${AuthTokenUtils.SERVICE_ACCOUNT}@${AuthTokenUtils.PROJECT_ID}.iam.gserviceaccount.com`;

	static HOWLONG = 55 * 60; // 55 minutes, cannot be more than 60 minutes

	// /**
	//  * Convert the FleetEngineToken returned by the minter to the AuthToken format expected by the
	//  * clients.
	//  */
	// static toAuthToken(fleetEngineToken: FleetEngineToken) {
	// 	return fleetengine;
	// 	return AuthToken.builder()
	// 		.setCreationTimestampMs(fleetEngineToken.creationTimestamp().getTime())
	// 		.setExpirationTimestampMs(
	// 			fleetEngineToken.expirationTimestamp().getTime(),
	// 		)
	// 		.setToken(fleetEngineToken.jwt())
	// 		.build();
	// }

	/** Returns an existing or newly minted server token. */
	static getServerToken() {
		return AuthTokenUtils.signToken({});
		// AuthTokenUtils.AUTH_TOKEN_MINTER.getDeliveryServerToken()
	}

	/**
	 * Returns a new consumer token with tracking id as given. This function does not cache minted
	 * tokens.
	 */
	static getDeliveryConsumerToken(id: string) {
		return AuthTokenUtils.signToken({ trackingid: id });
		// AuthTokenUtils.AUTH_TOKEN_MINTER.getDeliveryConsumerToken(TrackingClaims.create(id))
	}
	/**
	 * Returns a new untrusted driver token with vehicle id as given. This function does not cache
	 * minted tokens.
	 */
	static getDeliveryDriverToken(id: string) {
		return AuthTokenUtils.signToken({ deliveryvehicleid: id });
		// AuthTokenUtils.AUTH_TOKEN_MINTER.getUntrustedDeliveryVehicleToken(DeliveryVehicleClaims.create(id))
	}

	/** Returns a new fleet reader token. This function does not cache minted tokens. */
	static getDeliveryFleetReaderToken() {
		return AuthTokenUtils.signToken({});
		// AuthTokenUtils.AUTH_TOKEN_MINTER.getDeliveryFleetReaderToken()
	}

	// pass the qualified claims to signToken depending on the iam role
	static async signToken(claims: any) {
		const googleAuth = new google.auth.GoogleAuth({
			scopes: ['https://www.googleapis.com/auth/cloud-platform'],
		});
		const authClient = (await googleAuth.getClient()) as Compute;
		google.options({ auth: authClient });

		const now = Math.round(Date.now() / 1000);
		const iat = now - 300;
		const exp = now + AuthTokenUtils.HOWLONG;

		const request = {
			name: `projects/-/serviceAccounts/${AuthTokenUtils.SERVICE_ACCOUNT_EMAIL}`,
			requestBody: {
				payload: JSON.stringify({
					iss: AuthTokenUtils.SERVICE_ACCOUNT_EMAIL,
					sub: AuthTokenUtils.SERVICE_ACCOUNT_EMAIL,
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
}

export class AuthorizationHeaderProvider {
	token: string;

	constructor(token: string) {
		this.token = token;
	}

	getRequestMetadata(url: string, callback: any) {
		callback(null, { authorization: `Bearer ${this.token}` });
	}
}
