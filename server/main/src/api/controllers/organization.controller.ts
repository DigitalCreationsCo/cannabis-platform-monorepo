import { getGeoCoordinatesFromAddress } from '@cd/core-lib';
import {
	type OrganizationCreateType,
	type OrganizationUpdateType,
	type OrganizationWithDashboardDetails,
} from '@cd/data-access';
import { OrganizationDA } from '../data-access';

/* =================================
OrganizationController - controller class for organization management actions

members:
createOrganization
updateOrganization
deleteOrganizationById
getOrganizationById
getOrganizationWithDashboardDetails
getOrganizationByZipcode
getCategoryList
getUsersByOrganization

================================= */

export default class OrganizationController {
	static async createOrganization(req, res) {
		try {
			const organization: OrganizationCreateType = req.body;
			const coordinates = await getGeoCoordinatesFromAddress(
				organization.address,
			);
			organization.address.coordinates = { ...coordinates };
			const data = await OrganizationDA.createOrganization(organization);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Organization could not be created.',
				});
			return res.status(201).json({
				success: 'true',
				message: data.message,
				payload: data.payload,
			});
		} catch (error: any) {
			console.info('API: createOrganization: ', error);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async updateOrganization(req, res) {
		try {
			const organization: OrganizationUpdateType = req.body;

			const data = await OrganizationDA.updateOrganization(organization);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Organization could not be created.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API: updateOrganization: ', error.message);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async deleteOrganizationById(req, res) {
		try {
			const organizationId = req.params.id || '';
			const data = await OrganizationDA.deleteOrganization(organizationId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Organization could not be deleted.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API: deleteOrganization: ', error.message);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async getOrganizationById(req, res) {
		try {
			const organizationId = req.params.id || '';
			const data = await OrganizationDA.getOrganizationById(organizationId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Dispensary not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async getOrganizationWithDashboardDetails(req, res) {
		try {
			const organizationId = req.params.id || '';

			const data: OrganizationWithDashboardDetails =
				await OrganizationDA.getOrganizationWithDetails(organizationId, {
					products: {
						include: {
							categories: true,
							reviews: { include: { user: true } },
							variants: { include: { images: true } },
						},
					},
					orders: { orderBy: { createdAt: 'desc' } },
					address: { include: { coordinates: true } },
					memberships: { include: { user: true } },
					images: true,
					categoryList: true,
					siteSetting: true,
					schedule: true,
					subdomain: true,
					vendor: true,
				});

			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Dispensary not found',
				});

			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async getOrganizationsByZipcode(req, res) {
		try {
			console.info('API: getOrganizationsByZipcode: params ', req.params);
			const {
				zipcode,
				limit = 5,
				radius = 10000,
			}: { zipcode: number; limit: number; radius: number } = req.params;
			if (!zipcode)
				return res
					.status(400)
					.json({ success: 'false', error: 'Zipcode is required' });

			const data = await OrganizationDA.getOrganizationsByZipcode(
				Number(zipcode),
				Number(limit),
				Number(radius),
			);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: `We didn't find dispensaries.`,
				});
			console.info(`Found ${data.length} organizations in zipcode ${zipcode}`);
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API: getOrganizationsByZipcode: ', error);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async getCategoryList(req, res) {
		try {
			const organizationId = req.params.id || '';
			const data = await OrganizationDA.getCategoryList(organizationId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Categories not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API error: ', error);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}

	static async getUsersByOrganization(req, res) {
		try {
			const organizationId = req.params.id || '';
			const data = await OrganizationDA.getUsersByOrganization(organizationId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: `We didn't find this data.`,
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API error: ', error);
			res.status(500).json({
				success: 'false',
				error: error.message,
				message: error.message,
			});
		}
	}
}
