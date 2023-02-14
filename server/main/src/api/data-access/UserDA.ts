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

    static async getAddressByIdAndUser({ id, addressId }) {
        try {
            const data = await findAddressById(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async deleteAddressByIdAndUser({ id, addressId }) {
        try {
            const data = await deleteAddressById(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
