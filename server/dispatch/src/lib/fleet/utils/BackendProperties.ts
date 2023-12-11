export class BackendProperties {
	providerId: () => string;
	fleetEngineAddress: () => string;
	serverServiceAccountEmail: () => string;
	driverServiceAccountEmail: () => string;
	consumerServiceAccountEmail: () => string;
	fleetReaderServiceAccountEmail: () => string;
	apiKey: () => string;
	backendHost: () => string;

	constructor(
		providerId: string,
		fleetEngineAddress: string,
		serverServiceAccountEmail: string,
		driverServiceAccountEmail: string,
		consumerServiceAccountEmail: string,
		fleetReaderServiceAccountEmail: string,
		apiKey: string,
		backendHost: string,
	) {
		this.providerId = () => providerId;
		this.fleetEngineAddress = () => fleetEngineAddress;
		this.serverServiceAccountEmail = () => serverServiceAccountEmail;
		this.driverServiceAccountEmail = () => driverServiceAccountEmail;
		this.consumerServiceAccountEmail = () => consumerServiceAccountEmail;
		this.fleetReaderServiceAccountEmail = () => fleetReaderServiceAccountEmail;
		this.apiKey = () => apiKey;
		this.backendHost = () => backendHost;
	}
}
