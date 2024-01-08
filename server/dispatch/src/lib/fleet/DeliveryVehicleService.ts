/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AuthenticatedDeliveryServiceProvider from './auth/AuthenticatedDeliveryServiceProvider';
import { fleetApi, mapsApi } from './fleet.api';
import StateService from './StateService';
import BaseService from './utils/BaseServiceClass';

class DeliveryVehicleService extends BaseService {
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
		return responseVehicle;
	}

	async updateVehicle(updatedVehicle: any) {
		const updateReq = new fleetApi.UpdateDeliveryVehicleRequest({
			deliveryVehicle: updatedVehicle,
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
		return responseVehicle;
	}
}

// Types for Request and Response objects need to be defined as per your server framework

export default DeliveryVehicleService.getInstance(
	StateService,
	AuthenticatedDeliveryServiceProvider,
);
