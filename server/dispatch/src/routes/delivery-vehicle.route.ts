/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isEmpty } from '@cd/core-lib';
import { Router } from 'express';
import { StateService } from '../lib/fleet';
import DeliveryVehicleService from '../lib/fleet/DeliveryVehicleService';
import { ServiceUtils } from '../lib/fleet/utils/ServiceUtils';

const deliveryVehicleRoutes = Router();

deliveryVehicleRoutes.get('/:vehicleId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	// res.setDefaultEncoding = 'utf-8';

	if (!req.params.vehicleId) {
		console.error(
			'The client attempted to get a vehicle without specifying its ID',
		);
		ServiceUtils.setErrorResponse(
			res,
			'The vehicle ID must be specified.',
			400,
		);
		return res.end();
	}

	const vehicleId = req.params.vehicleId;
	const vehicle = StateService.getDeliveryVehicleById(vehicleId);

	if (vehicle === null) {
		console.error('The client attempted to retrieve a non-existent vehicle');
		ServiceUtils.setErrorResponse(
			res,
			"The requested vehicle doesn't exist.",
			404,
		);
		return res.end();
	}
	res.write(JSON.stringify(vehicle));
	res.flushHeaders();
});

deliveryVehicleRoutes.post('/:vehicleId', async (req, res) => {
	if (!req.params.vehicleId) {
		console.error(
			'The client attempted to get a vehicle without specifying its ID',
		);
		ServiceUtils.setErrorResponse(
			res,
			'The vehicle ID must be specified.',
			400,
		);
		return res.end();
	}

	const vehicleId = req.params.vehicleId;
	let vehicle = StateService.getDeliveryVehicleById(vehicleId);
	if (!vehicle) {
		console.error('The client attempted to retrieve a non-existent vehicle');
		ServiceUtils.setErrorResponse(
			res,
			"The requested vehicle doesn't exist.",
			404,
		);
		return res.end();
	}

	const updates = JSON.parse(req.body);
	if (isEmpty(updates)) {
		console.error('The client attempted to update the vehicle with no data');
		ServiceUtils.setErrorResponse(
			res,
			'The vehicle update data must be specified.',
			400,
		);
		return res.end();
	}

	if (updates['stopState'] === undefined) {
		console.error('No stop state for vehicle ID specified: ', vehicleId);
		ServiceUtils.setErrorResponse(res, 'No stop state was specified.', 400);
		return res.end();
	}

	const stopStateName = updates['stopState'];
	vehicle = await DeliveryVehicleService.updateVehicleStopState(
		vehicle,
		stopStateName,
	);
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	res.write(JSON.stringify(vehicle));
	res.flushHeaders();
});

deliveryVehicleRoutes.put('/:vehicleId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');

	// request ip address
	const clientIdentifier = (req.headers['x-forwarded-for'] ||
		req.socket.remoteAddress) as string;

	const vehicleId = req.params.vehicleId;
	let vehicle = StateService.getDeliveryVehicleById(
		StateService.getDeliveryVehicleMapByClient(clientIdentifier)!,
	);

	if (!vehicle) {
		console.error('The client is not assigned to any vehicle');
		ServiceUtils.setErrorResponse(
			res,
			"The requested vehicle doesn't exist.",
			404,
		);
		return res.end();
	}

	if (StateService.getId(vehicle.name!) !== vehicleId) {
		console.error('The client attempted to request a non-existent vehicle');
		ServiceUtils.setErrorResponse(
			res,
			"The requested vehicle doesn't exist.",
			404,
		);
		return res.end();
	}

	const updatedVehicle = JSON.parse(req.body);
	vehicle = await DeliveryVehicleService.updateVehicle(updatedVehicle);
	res.write(JSON.stringify(vehicle));
	res.flushHeaders();
});

export { deliveryVehicleRoutes };
