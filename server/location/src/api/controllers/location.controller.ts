import {
	type Coordinates,
	type OrganizationWithShopDetails,
} from '@cd/data-access';
import { LocationDA } from '../data-access';
/* =================================
Locationontroller - controller class for location-based actions

members:
getLocalOrganizations
createOrganizationLocationRecord
updateOrganizationLocationRecord
deleteOrganizationLocationRecord
================================= */

export default class LocationController {
	static async getLocalOrganizations(req, res) {
		try {
			console.info(`server-location: get local dispensaries.`);

			const {
				userLocation,
				proximityRadius,
			}: { userLocation: Coordinates; proximityRadius: number } = req.body;

			console.info(
				`server-location: get local dispensaries from ${userLocation} with the radius ${proximityRadius}.`,
			);
			const _geoJson = getCoordinatePairFromCoordinates(userLocation);

			const data = await LocationDA.getLocalOrganizations(
				_geoJson,
				proximityRadius,
			);
			if (!data)
				return res.status(404).json('Local organizations were not found.');
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			res.status(500).json({
				success: 'false',
				message: error.message,
				error: error.message,
			});
		}
	}

	/**
	 * Create a dispensary record from organizations_geolocate collection
	 * @param req
	 * @param res
	 * @returns
	 */
	static async createOrganizationLocationRecord(req, res) {
		try {
			const organization = req.body as OrganizationWithShopDetails;

			console.info(
				'organization to add: ',
				organization.name,
				': ',
				organization.id,
			);
			const data = await LocationDA.createOrganizationMongoRecord(organization);

			if (!data)
				return res.status(404).json('Could not create the dispensary record.');

			console.info(
				'successfully created dispensary location record: ',
				organization.name,
				': ',
				organization.id,
			);

			return res.status(201).json({
				success: 'true',
				payload: { ...data, insertedId: organization.id },
			});
		} catch (error: any) {
			console.info('createOrganizationLocationRecord error: ', error);
			res.status(500).json({
				success: 'false',
				message: error.message,
				error: error.message,
			});
		}
	}

	/**
	 * Create a dispensary record from organizations_geolocate collection
	 * @param req
	 * @param res
	 * @returns
	 */
	static async updateOrganizationLocationRecord(req, res) {
		try {
			const organization = req.body as OrganizationWithShopDetails;
			const data = await LocationDA.updateOrganizationMongoRecord(organization);
			if (!data)
				return res.status(404).json('Could not update the dispensary record.');
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API error: ', error);
			res.status(500).json({
				success: 'false',
				message: error.message,
				error: error.message,
			});
		}
	}

	/**
	 * Delete a dispensary record from organizations_geolocate collection
	 * @param req
	 * @param res
	 * @returns
	 */
	static async deleteOrganizationLocationRecord(req, res) {
		try {
			const organizationId = req.params.id || '';
			const data = await LocationDA.deleteOrganizationMongoRecord(
				organizationId,
			);
			if (!data)
				return res.status(404).json('Could not delete the dispensary record.');
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API error: ', error);
			res.status(500).json({
				success: 'false',
				message: error.message,
				error: error.message,
			});
		}
	}
}
