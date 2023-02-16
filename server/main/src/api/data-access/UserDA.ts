import { createAddress, findAddressById, findUserWithDetails, removeAddressByIdAndUserId } from '@cd/data-access';

/* =================================
User Data Access - data class for User table

members:
getUserById
getAddressById
addAddressToUser
removeAddressFromUser

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

    static async createAddress(address) {
        try {
            address.coordinateId = '';
            const data = await createAddress(address);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async removeAddressFromUser({ addressId, userId }) {
        try {
            const data = await removeAddressByIdAndUserId({ addressId, userId });
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
