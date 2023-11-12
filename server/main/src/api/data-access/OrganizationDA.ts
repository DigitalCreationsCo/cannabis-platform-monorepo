import {
	applicationHeaders,
	coordinatesIsEmpty,
	getGeoCoordinatesFromAddress,
	setCoordinateRadius,
	urlBuilder,
} from '@cd/core-lib';
import {
	createOrganization,
	deleteOrganizationById,
	findCategoryListByOrg,
	findOrganizationById,
	findOrganizationsByZipcode,
	findUsersByOrganization,
	makeUrlFriendly,
	updateOrganization,
	type OrganizationCreateType,
	type OrganizationUpdateType,
	type Prisma,
} from '@cd/data-access';
import axios from 'axios';
/* =================================
Organization Data Access - data class for organization table

members:
createOrganization
updateOrganization
deleteOrganization
getOrganizationById
getOrganizationByZipcode
getCategoryList
getUsersByOrganization
updateProduct

================================= */

export default class OrganizationDA {
	static async createOrganization(organization: OrganizationCreateType) {
		try {
			const data = await createOrganization(organization);

			console.debug(
				`successfully created organization record: ${organization.name}. id: ${data.id}
				now creating location record...`,
			);

			const response = await axios.post(
				urlBuilder.location.organizationLocationRecord(),
				{
					id: data.id,
					name: organization.name,
					dialCode: organization.dialCode,
					phone: organization.phone,
					address: organization.address,
					vendorId: organization.vendorId,
					subdomain: organization.subdomainId,
				},
				{
					headers: {
						...applicationHeaders,
					},
				},
			);

			// revert the organization record if location db create fails
			if (response.data.success == 'false') {
				await deleteOrganizationById(data.id);
				console.debug(
					'the organization location record was not created. the insert operation is reverted.',
				);
				throw new Error(
					'The command failed. The Dispensary record is not created.',
				);
			}

			console.debug(
				`${data.name} record create is completed. Your id is ${data.id}`,
			);
			return {
				payload: data,
				message: `${data.name} record create is completed. Your id is ${data.id}`,
			};
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
	static async updateOrganization(organization: OrganizationUpdateType) {
		try {
			const previousData: OrganizationUpdateType = (await findOrganizationById(
				organization.id,
				{
					images: false,
					address: { include: { coordinates: true } },
				},
			)) as OrganizationUpdateType;
			organization = { ...previousData, ...organization };

			// set address coordinates
			if (coordinatesIsEmpty(organization?.address)) {
				const coordinates = await getGeoCoordinatesFromAddress(
					organization.address,
				);
				organization.address.coordinates = {
					latitude: Number(coordinates.latitude),
					longitude: Number(coordinates.longitude),
					radius:
						organization.address.coordinates?.radius || setCoordinateRadius(),
				};
			}

			// update subdomainId if applicable
			if (!organization.subdomainId && organization.name) {
				organization.subdomainId = makeUrlFriendly(organization.name);
			}

			const data = await updateOrganization(organization);
			console.debug(
				`successfully updated organization record: ${organization.name}. id: ${data.id}
				now updating location record...`,
			);
			const response = await axios.put(
				urlBuilder.location.organizationLocationRecord(),
				{ ...data },
				{
					headers: {
						...applicationHeaders,
					},
				},
			);
			console.debug('location record updated');
			if (response.data.success == 'false') {
				await updateOrganization(previousData);
				console.debug(
					'the organization location update failed. the update operation is reverted.',
				);
				throw new Error(
					'The command failed. The Dispensary record is not updated.',
				);
			}

			console.info(`Dispensary record ${organization.name} is updated.`);
			return `${data.name} record create is updated. Your id is ${data.id}`;
		} catch (error: any) {
			// possibly handle axios error here, and revert the prisma update op
			throw new Error(error.message);
		}
	}

	static async deleteOrganization(organizationId: string) {
		try {
			const _deleted = await deleteOrganizationById(organizationId);
			console.info('_deleted: ', _deleted);
			await axios.delete(
				urlBuilder.location.getOrganizationRecord(_deleted.id),
			);

			console.info(`Dispensary record ${_deleted.name} is deleted OK.`);
			return `Dispensary record ${_deleted.name} is deleted OK.`;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	// find organization by organizationId
	static async getOrganizationById(organizationId) {
		try {
			return await findOrganizationById(organizationId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	// find organization by organizationId with include args
	static async getOrganizationWithDetails(
		organizationId,
		include: Prisma.OrganizationInclude,
	) {
		try {
			return (await findOrganizationById(organizationId, include)) as any;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getOrganizationsByZipcode(
		zipcode: number,
		limit: number,
		radius: number,
	) {
		try {
			return await findOrganizationsByZipcode(zipcode, limit, radius);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	// find CategoryList by organizationId, default arg is 1 for platform wide CategoryList
	static async getCategoryList(organizationId = '1') {
		try {
			return await findCategoryListByOrg(organizationId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getUsersByOrganization(organizationId) {
		try {
			return await findUsersByOrganization(organizationId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateProduct(product) {
		try {
			console.debug('update product: ', product);
			return 'TEST: product was updated OK';
			// const data = await updateProduct(product);
			// return data
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
