import type { ServerResponse } from 'http';
import AuthenticatedDeliveryServiceProvider from './auth/AuthenticatedDeliveryServiceProvider';
import { fleetApi } from './fleet.api';
import { type Stop, type Manifest } from './fleet.types';
import type FleetConfig from './fleetConfig';
import StateService from './StateService';
import { FleetConfigUtils } from './utils';
import BaseService from './utils/BaseServiceClass';
import { ServiceUtils } from './utils/ServiceUtils';

const PROJECT_ID = 'YOUR_GCP_PROJECT_NAME';
const VEHICLE_ID = 'YOUR_VEHICLE_ID';
const SERVICE_ACCOUNT = 'YOUR_SERVICE_ACCOUNT';
const SERVICE_ACCOUNT_EMAIL = `${SERVICE_ACCOUNT}@${PROJECT_ID}.iam.gserviceaccount.com`;

const FLEET_ENGINE_ADDRESS_PROP_KEY = 'fleetengine-address';
const PROVIDER_ID_PROP_KEY = 'provider-id';
const SERVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY = 'server-service-account-email';
const DRIVER_SERVICE_ACCOUNT_EMAIL_PROP_KEY = 'driver-service-account-email';
const CONSUMER_SERVICE_ACCOUNT_EMAIL_PROP_KEY =
	'consumer-service-account-email';
const FLEET_READER_SERVICE_ACCOUNT_EMAIL_PROP_KEY =
	'fleet-reader-service-account-email';
const API_KEY_PROP_KEY = 'api-key';
const BACKEND_HOST_PROP_KEY = 'backend-host';

function assertConfig<FleetConfig>(
	config: FleetConfig,
	errorMessage: string,
): asserts config is FleetConfig {
	if (!(config instanceof Object)) {
		throw new Error(errorMessage);
	}
	if (!('description' in config)) {
		throw new Error(errorMessage);
	}
	if (!('manifests' in config)) {
		throw new Error(errorMessage);
	}
}

class FleetConfigService extends BaseService {
	constructor(
		stateService: typeof StateService,
		authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider,
	) {
		super();
		this.stateService = stateService;
		this.authenticatedDeliveryServiceProvider =
			authenticatedDeliveryServiceProvider;
	}

	stateService: typeof StateService;
	authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider;

	async processConfigUpload(fileContent: File, response: ServerResponse) {
		console.log('Processing config...');

		const fleetConfig = JSON.parse(fileContent.stream.toString());
		assertConfig<FleetConfig>(
			fleetConfig,
			'The fleet config is not valid schema.',
		);

		// create a FleetEngine client
		const authenticatedDeliveryService =
			await this.authenticatedDeliveryServiceProvider.getAuthenticatedDeliveryService();

		response.setDefaultEncoding('utf-8');

		// loop through manifests and invoke the FleetEngine APIs
		for (const m of fleetConfig.manifests) {
			// add timestamp here

			let startLocation: Manifest['vehicle']['start_location'];
			if (m.vehicle.start_location !== null) {
				startLocation = m.vehicle.start_location;
			}

			// create the vehicle
			const deliveryVehicleRequest = new fleetApi.CreateDeliveryVehicleRequest({
				parent: FleetConfigUtils.PARENT,
				deliveryVehicleId: m.vehicle.id,
				deliveryVehicle: {
					name: m.vehicle.id,
					type: m.vehicle.type,
					lastLocation: {
						location: {
							latitude: m.vehicle.start_location.latitude,
							longitude: m.vehicle.start_location.longitude,
						},
					},
					remainingVehicleJourneySegments: [],
				},
			});
			const [responseDeliveryVehicle] =
				await authenticatedDeliveryService.createDeliveryVehicle(
					deliveryVehicleRequest,
				);
			console.info(responseDeliveryVehicle);

			// create the tasks for each vehicle
			for (const t of m.tasks) {
				// add timestamp here

				const taskRequest = new fleetApi.CreateTaskRequest({
					parent: FleetConfigUtils.PARENT,
					taskId: t.id,
					task: FleetConfigUtils.createTask(t).task,
				});

				const [responseTask] = await authenticatedDeliveryService.createTask(
					taskRequest,
				);
				response.write('Task created');
				response.write(responseTask);
				console.info(responseTask);
				StateService.addTask(responseTask);
			}

			// Update the created delivery vehicle to include the VehicleJourneySegments.

			// 	// Create the stops in the order specified in m.remainingStopIdList. If that field doesn't
			// 	// exist, use the order in m.stops.
			if (m.remaining_stop_id_list === null) {
				m.remaining_stop_id_list = m.stops.map((s) => s.stopId);
			}

			const stopsMap = new Map<string, Stop>();
			for (const s of m.stops) {
				stopsMap.set(s.stopId, s);
				s.tasks = s.tasks.map((id) => FleetConfigUtils.getTimestampedId(id));
			}
			m.stops = m.remaining_stop_id_list.map((s) => stopsMap.get(s) as Stop);
			try {
				for (const vehicleJourneySegment of FleetConfigUtils.createVehicleJourneySegments(
					m,
				)) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					responseDeliveryVehicle.remainingVehicleJourneySegments!.push(
						vehicleJourneySegment,
					);
				}
			} catch (error: any) {
				console.info(error.message);
				ServiceUtils.setErrorResponse(response, error.message, 400);
				return;
			}

			const updateRequest = new fleetApi.UpdateDeliveryVehicleRequest({
				deliveryVehicle: responseDeliveryVehicle,
				updateMask: {
					paths: ['remaining_vehicle_journey_segments'],
				},
			});

			const [updatedResponseDeliveryVehicle] =
				await authenticatedDeliveryService.updateDeliveryVehicle(updateRequest);
			response.write('Vehicle created and assigned:\n');
			response.write(updatedResponseDeliveryVehicle);
			StateService.addDeliveryVehicle(updatedResponseDeliveryVehicle);

			// Set the backend ID for each manifest.
			for (const manifest of fleetConfig.manifests) {
				// test key, add the backend property generator class and abstract these keys
				manifest.vehicle.provider_id = PROVIDER_ID_PROP_KEY;
			}
		}

		// add the backend config and exit.
		StateService.setFleetConfig(fleetConfig);
		console.info('Fleet config uploaded successfully.');
		console.info(response.req.read());
		// response.flushHeaders(); // maybe do this idk
		response.end();
	}
}

export default FleetConfigService.getInstance(
	StateService,
	AuthenticatedDeliveryServiceProvider,
);
