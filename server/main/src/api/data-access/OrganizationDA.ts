import {
	applicationHeaders,
	axios,
	coordinatesIsEmpty,
	getGeoCoordinatesFromAddress,
	urlBuilder,
} from '@cd/core-lib';
import {
	createOrganization,
	deleteOrganizationById,
	findCategoryListByOrg,
	findOrganizationById,
	findOrganizationsByZipcode,
	findUsersByOrganization,
	updateOrganization,
	type OrganizationCreateType,
} from '@cd/data-access';
import { createId } from '@paralleldrive/cuid2';
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

			if (response.data.success == 'false') {
				await deleteOrganizationById(data.id);
				console.debug(
					'the organization location record was not created. the insert operation is reverted.',
				);
				throw new Error('The organization ');
			}

			console.debug(`${data.name} record create is completed.`);
			return `${data.name} record create is completed. Your id is ${data.id}`;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
	static async updateOrganization(organization: OrganizationCreateType) {
		try {
			let coordinates;

			if (coordinatesIsEmpty(organization?.address)) {
				coordinates = await getGeoCoordinatesFromAddress(organization.address);

				if (coordinates && coordinates.latitude !== 0)
					organization.address.coordinates = {
						...coordinates,
						id: createId(),
					};
			}

			const data = await updateOrganization(organization);

			await axios.put(
				urlBuilder.location.organizationLocationRecord(),
				{ ...data },
				{
					headers: {
						...applicationHeaders,
					},
				},
			);

			console.info(`Dispensary record ${organization.name} is updated.`);

			return 'Your organization account is updated.';
		} catch (error: any) {
			throw new Error(error);
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
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	// find organization by organizationId
	static async getOrganizationById(organizationId) {
		try {
			return await findOrganizationById(organizationId);
		} catch (error: any) {
			console.error(error.message);
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
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	// find CategoryList by organizationId, default arg is 1 for platform wide CategoryList
	static async getCategoryList(organizationId = '1') {
		try {
			return await findCategoryListByOrg(organizationId);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getUsersByOrganization(organizationId) {
		try {
			return await findUsersByOrganization(organizationId);
		} catch (error: any) {
			console.error(error.message);
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
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
