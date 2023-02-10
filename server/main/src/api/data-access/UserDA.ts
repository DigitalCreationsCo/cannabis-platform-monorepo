import { findUserWithDetails } from '@cd/data-access';

/* =================================
User Data Access - data class for User table

members:
getUserById

================================= */

export default class UserDA {
    // find user by id
    static async getUserById(id) {
        try {
            const data = await findUserWithDetails(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
