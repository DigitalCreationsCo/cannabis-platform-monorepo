import { findProductsByText } from '@cd/data-access';

/* =================================
Session Data Access - data class for Session table

members: 
getSession

================================= */

export default class SessionDA {
    static async getSession(search, organizationId = null) {
        try {
            const data = await findProductsByText(search, organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
