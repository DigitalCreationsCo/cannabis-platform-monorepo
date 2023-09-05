import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import { type AddressPayload, type DriverCreateType } from '@cd/data-access';
import { DriverDA } from '../data-access';

/* =================================
DriverController - controller class for driver user actions

members:
createDriver
updateDriver
getDriverById
updateStatus

================================= */

export default class DriverController {
	static async createDriver(req, res) {
		try {
			const driverData = req.body as DriverCreateType;

			const coordinates = await getGeoCoordinatesFromAddress(
				driverData.address[0] as AddressPayload,
			);
			if (coordinates) driverData.address[0].coordinates = coordinates;

			const driver = await DriverDA.createDriver(driverData);
			if (!driver)
				return res
					.status(404)
					.json({ success: 'false', error: 'Driver could not be created.' });
			return res.status(201).json({ success: 'true', payload: driver });
		} catch (error: any) {
			console.error('createDriver: ', error);
			if (error.message.includes('This User exists already'))
				return res.status(400).json({ success: 'false', error: error.message });
			return res.status(500).json({ success: 'false', error: error.message });
		}
	}

	static async updateDriver(req, res) {
		try {
			const driver = req.body;
			const data = await DriverDA.updateDriver(driver);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'Driver record could not be updated.',
				});
			return res.status(200).json({ success: 'true', payload: data });
		} catch (error: any) {
			console.error('updateDriver: ', error);
			res.status(500).json({ success: 'false', error: error.message });
		}
	}

	static async getDriverById(req, res) {
		try {
			const id = req.params.id || '',
				data = await DriverDA.getDriverById(id);
			if (!data) return res.status(404).json('Driver not found');
			return res.status(200).json(data);
		} catch (error: any) {
			console.error('getDriverById: ', error);
			res.status(500).json({ error: error.message });
		}
	}

	static async updateStatus(req, res) {
		try {
			const { id, onlineStatus } = req.body;

			const data = await DriverDA.updateOnlineStatus(id, onlineStatus);

			// have a promise.all here, that updates the driver's status in the driverSessions collection

			if (!data.success) {
				if (onlineStatus === true)
					return res.status(404).json('Could not go online. Please try again.');

				if (onlineStatus === false)
					// ignore
					return;
			}

			return res.status(200).json(data);
		} catch (error: any) {
			console.info('API error: ', error);
			res.status(500).json({ error: error.message });
		}
	}
}
