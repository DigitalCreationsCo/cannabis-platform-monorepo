import { findCategoryListByOrg, findOrganizationById } from '@cd/data-access';

/* =================================
Organization Data Access - data class for organization table

members:
getOrganizationById
getCategoryList
updateProduct

================================= */

export default class OrganizationDA {
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

    static async updateProduct(product) {
        try {
            return 'product was updated OK';
            // const data = await updateProduct(product);
            // return data
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
