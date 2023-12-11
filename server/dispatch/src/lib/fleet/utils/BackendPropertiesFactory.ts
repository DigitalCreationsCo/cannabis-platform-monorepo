/* eslint-disable @typescript-eslint/naming-convention */
import { BackendProperties } from './BackendProperties';

export class BackendPropertiesFactory {
	static FLEET_ENGINE_ADDRESS_PROP_KEY = 'fleetengine-address';
	static PROVIDER_ID_PROP_KEY = 'provider-id';
	static SERVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY = 'server-service-account-email';
	static DRIVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY = 'driver-service-account-email';
	static CONSUMER_SERVICE_ACCOUNT_EMAIL_PROP_KEY =
		'consumer-service-account-email';
	static FLEET_READER_SERVICE_ACCOUNT_EMAIL_PROP_KEY =
		'fleet-reader-service-account-email';
	static API_KEY_PROP_KEY = 'api-key';
	static BACKEND_HOST_PROP_KEY = 'backend-host';

	public static create(
		providerId: string,
		fleetEngineAddress: string,
		serverServiceAccountEmail: string,
		driverServiceAccountEmail: string,
		consumerServiceAccountEmail: string,
		fleetReaderServiceAccountEmail: string,
		apiKey: string,
		backendHost: string,
	): BackendProperties {
		return new BackendProperties(
			providerId,
			fleetEngineAddress,
			serverServiceAccountEmail,
			driverServiceAccountEmail,
			consumerServiceAccountEmail,
			fleetReaderServiceAccountEmail,
			apiKey,
			backendHost,
		);
	}

	public static createFromBuffer(input: Buffer) {
		const properties: BackendProperties =
			BackendPropertiesFactory.loadPropertiesFromBuffer(input);
		return this.create(
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				'PROVIDER_ID_PROP_KEY',
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.FLEET_ENGINE_ADDRESS_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.SERVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.DRIVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.CONSUMER_SERVICE_ACCOUNT_EMAIL_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.FLEET_READER_SERVICE_ACCOUNT_EMAIL_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.API_KEY_PROP_KEY,
			),
			BackendPropertiesFactory.getPropertyFromKey(
				properties,
				BackendPropertiesFactory.BACKEND_HOST_PROP_KEY,
			),
		);
	}

	private static loadPropertiesFromBuffer(input: Buffer): BackendProperties {
		const properties: BackendProperties = JSON.parse(input.toString());
		return properties;
	}

	private static getPropertyFromKey(properties: any, key: string) {
		if (!properties[key]) throw new Error('Could not find property: ' + key);
		return properties[key]();
	}
}
