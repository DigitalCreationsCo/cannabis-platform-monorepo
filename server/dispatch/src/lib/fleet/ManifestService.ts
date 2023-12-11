/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AuthenticatedDeliveryServiceProvider from './auth/AuthenticatedDeliveryServiceProvider';
import { fleetApi, mapsApi } from './fleet.api';
import { StopState } from './fleet.types';
import StateService from './StateService';
import BaseService from './utils/BaseServiceClass';

class ManifestService extends BaseService {
	stateService: typeof StateService;
	authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider;

	constructor(
		stateService: typeof StateService,
		authenticatedDeliveryServiceProvider: typeof AuthenticatedDeliveryServiceProvider,
	) {
		super();
		this.stateService = stateService;
		this.authenticatedDeliveryServiceProvider =
			authenticatedDeliveryServiceProvider;
	}

	/**
	 * Assigns a vehicle to the client.
	 *
	 * @param clientId The ID of the client.
	 * @param vehicleId The ID of the vehicle.
	 * @return The assigned vehicle.
	 * @throws error if the vehicle could not be assigned to the client.
	 */
	assignVehicleToClient(clientId: string, vehicleId: string) {
		// Assignment does not require a vehicleId; but if a vehicleId is supplied, attempt to use it.
		const existingVehicleId =
			StateService.getDeliveryVehicleMapByClient(clientId);
		let vehicle;

		if (existingVehicleId) {
			// If the client is already assigned another vehicle...
			if (vehicleId !== '' && vehicleId !== existingVehicleId) {
				console.error('The client attempted to re-request another vehicle.');
				throw new Error(`You cannot request different vehicles.`);
			}

			vehicle = StateService.getDeliveryVehicleById(existingVehicleId);
			if (!vehicle) {
				console.error(`The client's assigned vehicle doesn't exist.`);
				throw new Error(`The requested vehicle doesn't exist.`);
			}
		} else if (vehicleId === '') {
			// If vehicleId is null, assign the next available vehicle
			vehicle = StateService.getAnyAvailableDeliveryVehicle();
			if (!vehicle) {
				console.error(
					'The client requested a vehicle for assignment, but none were available.',
				);
				throw new Error('There are no available vehicles for assignment.');
			}
		} else {
			// If vehicleId is not null, attempt to assign that vehicle
			vehicle = StateService.getDeliveryVehicleById(vehicleId);
			if (!vehicle) {
				console.error('The client attempted to request a non-existent vehicle');
				throw new Error("The requested vehicle doesn't exist.");
			}
			if (StateService.isDeliveryVehicleAssigned(vehicleId)) {
				console.error(
					'The client attempted to request a vehicle that is currently assigned',
				);
				throw new Error('The requested vehicle is currently assigned.');
			}
		}
		// We have a vehicle available for assignment, or is already assigned to the same vehicle.
		StateService.addClientToDeliveryVehicleMap(clientId, vehicle);
		return vehicle;
	}

	async updateVehicleStopState(
		vehicle: mapsApi.fleetengine.delivery.v1.IDeliveryVehicle,
		stopStateName: string,
	) {
		let state: mapsApi.fleetengine.delivery.v1.VehicleStop.State;
		switch (stopStateName) {
			case 'STATE_UNSPECIFIED':
				state =
					mapsApi.fleetengine.delivery.v1.VehicleStop.State.STATE_UNSPECIFIED;
				break;
			case 'NEW':
				state = mapsApi.fleetengine.delivery.v1.VehicleStop.State.NEW;
				break;
			case 'ENROUTE':
				state = mapsApi.fleetengine.delivery.v1.VehicleStop.State.ENROUTE;
				break;
			case 'ARRIVED':
				state = mapsApi.fleetengine.delivery.v1.VehicleStop.State.ARRIVED;
				break;
			default:
				console.error(`Stop state ${stopStateName} is invalid.`);
				throw new Error(`Stop state ${stopStateName} is invalid.`);
		}
		vehicle.remainingVehicleJourneySegments![0].stop!.state = state;

		const updateReq = new fleetApi.UpdateDeliveryVehicleRequest({
			deliveryVehicle: vehicle,
			updateMask: {
				paths: ['remaining_vehicle_journey_segments'],
			},
		});
		const authenticatedDeliveryService =
			await this.authenticatedDeliveryServiceProvider.getAuthenticatedDeliveryService();
		const responseVehicle =
			(await authenticatedDeliveryService.updateDeliveryVehicle(
				updateReq,
			)) as mapsApi.fleetengine.delivery.v1.IDeliveryVehicle;
		StateService.addDeliveryVehicle(responseVehicle);
		const vehicleId = StateService.getId(vehicle.name as string);
		const fleetConfigStopState = StopState[stopStateName];
		console.info(
			`Updating manifest with vehicled ID ${vehicleId} and stop state ${fleetConfigStopState
				.valueOf()
				.toString()}`,
		);
		StateService.getManifest(vehicleId)!.current_stop_state =
			fleetConfigStopState;

		return responseVehicle;
	}

	async updateVehicleStopList(
		vehicle: mapsApi.fleetengine.delivery.v1.IDeliveryVehicle,
		stopIds: string[],
	) {
		const vehicleId = StateService.getId(vehicle.name as string);
		const manifest = StateService.getManifest(vehicleId)!;

		// stopIds must be a subset of the existing set of remaining stopIds. To check this, create a
		// map of remainingStopIdList -> VehicleJourneySegment.
		const stopMaps = new Map<
			string,
			mapsApi.fleetengine.delivery.v1.IVehicleJourneySegment
		>();
		for (let i = 0; i < manifest!.remaining_stop_id_list.length; i++) {
			stopMaps.set(
				manifest?.remaining_stop_id_list[i],
				vehicle.remainingVehicleJourneySegments![i]!,
			);
		}

		const newVJSList: mapsApi.fleetengine.delivery.v1.IVehicleJourneySegment[] =
			[];
		for (const stopId of stopIds) {
			if (!stopMaps.has(stopId)) {
				console.error(
					"The update request contained a stopId that isn't in the original set",
				);
				throw new Error(
					"The update request contained a stopId that isn't in the original set",
				);
			}
			// It is an error condition for the state of stops after the first stop to be anything other
			// than NEW. Starting with the second stop, reset its state.
			if (newVJSList.length === 0) {
				newVJSList.push(stopMaps.get(stopId)!);
			} else {
				const vjs = new mapsApi.fleetengine.delivery.v1.VehicleJourneySegment({
					stop: { ...stopMaps.get(stopId), state: 'NEW' },
				});
				newVJSList.push(vjs);
			}
		}

		vehicle.remainingVehicleJourneySegments = newVJSList;
		const updateReq = new fleetApi.UpdateDeliveryVehicleRequest({
			deliveryVehicle: vehicle,
			updateMask: {
				paths: ['remaining_vehicle_journey_segments'],
			},
		});
		const authenticatedDeliveryService =
			await this.authenticatedDeliveryServiceProvider.getAuthenticatedDeliveryService();
		const responseVehicle =
			(await authenticatedDeliveryService.updateDeliveryVehicle(
				updateReq,
			)) as mapsApi.fleetengine.delivery.v1.IDeliveryVehicle;
		StateService.addDeliveryVehicle(responseVehicle);

		manifest.remaining_stop_id_list = stopIds;
		return responseVehicle;
	}
}

export default ManifestService.getInstance(
	StateService,
	AuthenticatedDeliveryServiceProvider,
);
