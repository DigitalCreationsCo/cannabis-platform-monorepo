import { deleteAddressById, findAddressById, findUserWithDetails } from '@cd/data-access';

/* =================================
User Data Access - data class for User table

members:
getUserById

================================= */

export default class UserDA {
    static async getUserById(id) {
        try {
            const data = await findUserWithDetails(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getAddressById(addressId) {
        try {
            const data = await findAddressById(addressId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async deleteAddressById(addressId) {
        try {
            const data = await deleteAddressById(addressId);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
