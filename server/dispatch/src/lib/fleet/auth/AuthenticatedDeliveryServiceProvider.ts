/* eslint-disable @typescript-eslint/no-empty-function */
import fleetengine from '@googlemaps/fleetengine-delivery';
import { GoogleAuth } from 'google-auth-library';
import { type JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import BaseService from '../utils/BaseServiceClass';
import { AuthorizationHeaderProvider, signToken } from './authUtils';

class AuthenticatedDeliveryServiceProvider extends BaseService {
	constructor() {
		super();
	}

	async getAuthenticatedDeliveryService() {
		const token = await signToken({});
		const googleAuth = new GoogleAuth();
		googleAuth.cachedCredential = new AuthorizationHeaderProvider(
			token as string,
		) as unknown as JSONClient;
		return new fleetengine.DeliveryServiceClient({ auth: googleAuth });
	}
}
export default AuthenticatedDeliveryServiceProvider.getInstance();
