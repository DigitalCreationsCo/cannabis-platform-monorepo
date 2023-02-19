import { createOrganization, findCategoryListByOrg, findOrganizationById, findUsersByOrganization, OrganizationCreateType } from '@cd/data-access';

/* =================================
Organization Data Access - data class for organization table

members:
createOrganization
getOrganizationById
getCategoryList
getUsersByOrganization
updateProduct

================================= */

export default class OrganizationDA {
    static async createOrganization(organizationData: OrganizationCreateType) {
        try {
            let { address, ...organization } = organizationData;

            organization.subdomainId = organization.name.toLowerCase();
            
            address.coordinateId = '';
            const data = await createOrganization(organization, address);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    // find organization by organizationId
    static async getOrganizationById(organizationId) {
        try {
            const data = await findOrganizationById(organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    // find CategoryList by organizationId, default arg is 1 for platform wide CategoryList
    static async getCategoryList(organizationId = '1') {
        try {
            const data = await findCategoryListByOrg(organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getUsersByOrganization(organizationId) {
        try {
            const data = await findUsersByOrganization(organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateProduct(product) {
        try {
            return 'TEST: product was updated OK';
            // const data = await updateProduct(product);
            // return data
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
