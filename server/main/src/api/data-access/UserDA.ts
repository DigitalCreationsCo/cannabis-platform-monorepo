import { findUsersByOrg, findUserWithDetails, UserWithDetails } from '@cd/data-access';

/* =================================
User Data Access - data class for user table

members:
getUsersByOrg
getUserDetails

================================= */

export default class UserDA {
    static async getUsersByOrg(organizationId) {
        try {
            const data = await findUsersByOrg(organizationId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getUserDetails(id) {
        try {
            const data: UserWithDetails = await findUserWithDetails(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
