/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isEmpty } from '@cd/core-lib';
import { Router } from 'express';
import { StateService } from 'lib/fleet';
import ManifestService from 'lib/fleet/ManifestService';
import { ServiceUtils } from 'lib/fleet/utils/ServiceUtils';

const manifestRoutes = Router();
/**
 * Fetches a manifest.
 *
 * GET /manifest/:vehicleId
 */
manifestRoutes.get('/:vehicleId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');

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
	const manifest = StateService.getManifest(vehicleId);
	if (manifest === null) {
		console.error(
			'The client attempted to retrieve the manifest for a non-existent vehicle',
		);
		ServiceUtils.setErrorResponse(
			res,
			"The requested manifest doesn't exist.",
			404,
		);
		return res.end();
	}
	res.write(JSON.stringify(manifest));
	res.flushHeaders();
});

// eslint-disable-next-line sonarjs/cognitive-complexity
manifestRoutes.post('/:vehicleId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');

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

	let vehicle;
	const vehicleId = req.params.vehicleId;
	console.info(`Manifest post with vehicleId ${vehicleId}`);

	// Read the post body to figure out what to update. Right now, we only support assignment, or
	// updating the vehicle status. The post body should just be a json object with keys.
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
	const hasClientIdUpdate = updates['clientId'] !== undefined;
	const hasStopIdListUpdate = updates['remaining_stop_id_list'] !== undefined;
	const hasStopStateUpdate = updates['current_stop_state'] !== undefined;
	const hasOtherUpdate = hasStopIdListUpdate || hasStopStateUpdate;

	if (!(hasClientIdUpdate || hasOtherUpdate)) {
		console.error(
			'The client requested a manifest update but did not supply a valid update.',
		);
		ServiceUtils.setErrorResponse(res, 'The update must be specified.', 400);
		return res.end();
	}

	if (hasClientIdUpdate && hasOtherUpdate) {
		console.error(
			'The client requested an assignment but also requested other mutually exclusive updates.',
		);
		ServiceUtils.setErrorResponse(
			res,
			'The request cannot contain both an assignment and other updates.',
			400,
		);
		return res.end();
	}

	// Assign a client ID to a vehicle. For this request, vehicleId is not strictly necessary, but
	// the request body must have a "client_id" field.
	if (hasClientIdUpdate) {
		const clientId = updates['clientId'];
		if (clientId === '') {
			console.error(
				`The client requested a manifest assignment, but the client ID ${clientId} is invalid`,
			);
			ServiceUtils.setErrorResponse(res, 'The client ID is invalid.', 400);
			return res.end();
		}
		console.info(`ClientId is ${clientId}`);
		try {
			vehicle = ManifestService.assignVehicleToClient(clientId, vehicleId);
		} catch (error: any) {
			console.error(error.message);
			ServiceUtils.setErrorResponse(res, error.message, 400);
			return res.end();
		}
		const manifest = StateService.getManifest(
			StateService.getId(vehicle.name as string),
		);
		res.write(JSON.stringify(manifest));
		res.flushHeaders();
		return;
	}

	// Otherwise, a vehicleId is required.
	vehicle = StateService.getDeliveryVehicleById(vehicleId)!;
	if (vehicle === null) {
		console.error(
			`The client requested a delivery vehicle update, but the vehicle ID ${vehicleId} does not match any vehicle.`,
		);
		ServiceUtils.setErrorResponse(
			res,
			'The vehicle ID matched no vehicles.',
			404,
		);
		return res.end();
	}

	// The following operations can be specified in the same update message, but currently they
	// are not implemented in an atomic manner. If both remaining_stop_id_list and
	// current_stop_state are specified, the remaining_stop_id_list update must go first, and the
	// current_stop_state update will manipulate the state of the first stop AFTER the
	// remaining_stop_id_list update is complete.

	// Update the list of remaining stop IDs. The request body must have the
	// "remaining_stop_id_list" field and its value must be a list of stop IDs.
	if (hasStopIdListUpdate) {
		const stopIdList: string[] = [];
		for (const stopId of updates['remaining_stop_id_list']) {
			stopIdList.push(stopId as string);
		}
		try {
			vehicle = await ManifestService.updateVehicleStopList(
				vehicle,
				stopIdList,
			);
		} catch (error: any) {
			console.error(error.message);
			ServiceUtils.setErrorResponse(res, error.message, 400);
			return res.end();
		}
	}

	// Update the current stop state. The request body must have the "current_stop_state" field
	// and its value must be one of the enum values in VehicleStop.State.
	if (hasStopStateUpdate) {
		const stopStateName = updates['current_stop_state'] as string;
		try {
			vehicle = await ManifestService.updateVehicleStopState(
				vehicle,
				stopStateName,
			);
		} catch (error: any) {
			console.error(error.message);
			ServiceUtils.setErrorResponse(res, error.message, 400);
			return res.end();
		}
	}

	const manifest = StateService.getManifest(vehicleId as string);

	res.write(JSON.stringify(manifest));
	res.flushHeaders();
});

export { manifestRoutes };
