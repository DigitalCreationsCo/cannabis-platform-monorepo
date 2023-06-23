import { coordinatesIsEmpty, getGeoCoordinatesByAddress, urlBuilder } from '@cd/core-lib';
import { createOrganization, findCategoryListByOrg, findOrganizationById, findOrganizationsByZipcode, findUsersByOrganization, OrganizationCreateType, updateOrganization } from '@cd/data-access';
import { createId } from '@paralleldrive/cuid2';
import axios from 'axios';
/* =================================
Organization Data Access - data class for organization table

members:
createOrganization
getOrganizationById
getOrganizationByZipcode
getCategoryList
getUsersByOrganization
updateProduct

================================= */

export default class OrganizationDA {
    static async createOrganization(organization: OrganizationCreateType) {
        try {

            if (!organization.vendorId)
                organization.vendorId = createId();

            const data =
                await createOrganization(organization);

            console.info(
                `successfully created organization record ${organization.name}: ${data.id} 
                now creating location record...`);

            await axios.post(
                urlBuilder.location.organizationLocationRecord(), {
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
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    }
                })

            console.log(`${organization.name} record create is completed.`)

            return 'Your organization account is created';

        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
    static async updateOrganization(organization: OrganizationCreateType) {
        try {
            let
                coordinates;

            if (coordinatesIsEmpty(organization?.address)) {
                coordinates = await getGeoCoordinatesByAddress(organization.address);

                if (coordinates && coordinates.latitude !== 0)
                    organization.address.coordinates = {
                        ...coordinates,
                        id: createId(),
                    };
            }

            const
                data = await updateOrganization(organization);

            await axios.put(
                urlBuilder.location.organizationLocationRecord(), { ...organization },
                {
                    headers: {
                        Accept: "application/json", "Content-Type": "application/json",
                    }
                })

            console.log(`Dispensary record ${organization.name} is updated.`)

            return 'Your organization account is updated.';

        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    // find organization by organizationId
    static async getOrganizationById(organizationId) {
        try {
            const data = await findOrganizationById(organizationId);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getOrganizationsByZipcode(zipcode: number, limit: number, radius: number) {
        try {
            const data = await findOrganizationsByZipcode(zipcode, limit, radius);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    // find CategoryList by organizationId, default arg is 1 for platform wide CategoryList
    static async getCategoryList(organizationId = '1') {
        try {
            const data = await findCategoryListByOrg(organizationId);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getUsersByOrganization(organizationId) {
        try {
            const data = await findUsersByOrganization(organizationId);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateProduct(product) {
        try {
            return 'TEST: product was updated OK';
            // const data = await updateProduct(product);
            // return data
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
