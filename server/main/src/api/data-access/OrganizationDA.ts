import { findCategoryListByOrg, findSiteSettingBySlug } from '@cd/data-access';

/* =================================
Organization Data Access - data class for organization table

members:
getCategoryList
updateProduct
getSettings(slug, organizationId);
================================= */

export default class OrganizationDA {
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
            await new Promise((res) => res('product was updated OK'));
            // const data = await updateProduct(product);
            // return data
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getSettings(slug, organizationId) {
        try {
            const settings = await findSiteSettingBySlug(slug, organizationId);
            return settings;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
