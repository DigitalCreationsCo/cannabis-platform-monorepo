import {
	createAddress,
	createUser,
	findAddressById,
	findUserWithDetailsByEmail,
	findUserWithDetailsById,
	findUserWithDetailsByPhone,
	removeAddressByIdAndUserId,
	updateDispensaryAdmin,
	updateUser,
	upsertDispensaryAdmin,
	upsertUser,
	type UserCreateType,
} from '@cd/data-access';
// import { createPasswordHash } from '../../util/utility';

/* =================================
User Data Access - data methods for User Controller

members:
signin                  not used
signout                 not used

getUserById
getUserByEmail
getUserByPhone

getAddressById
addAddressToUser
removeAddressFromUser

createUser
upsertUser
createDispensaryStaff
updateDispensaryStaff

================================= */

export default class UserDA {
	static async getUserById(id) {
		try {
			return await findUserWithDetailsById(id);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getUserByEmail(email) {
		try {
			return await findUserWithDetailsByEmail(email);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getUserByPhone(phone) {
		try {
			return await findUserWithDetailsByPhone(phone);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getAddressById(addressId) {
		try {
			return await findAddressById(addressId);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async addAddressToUser(address) {
		try {
			address.coordinateId = '';
			return await createAddress(address);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async removeAddressFromUser({ addressId, userId }) {
		try {
			return await removeAddressByIdAndUserId({
				addressId,
				userId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async createUser(createUserData: UserCreateType) {
		try {
			return await createUser(createUserData);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async upsertUser(upsertUserData: UserCreateType) {
		try {
			return await upsertUser(upsertUserData);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async createDispensaryStaff(
		createUserData: UserCreateType,
		role: string,
		dispensaryId: string,
	) {
		try {
			return await upsertDispensaryAdmin(createUserData, {
				role,
				dispensaryId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateDispensaryStaff(
		createUserData: UserCreateType,
		role: string,
		dispensaryId: string,
	) {
		try {
			return await updateDispensaryAdmin(createUserData, {
				role,
				dispensaryId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateUser(createUserData: UserCreateType) {
		try {
			const user = await updateUser(createUserData);

			console.info(`updated user ${user.id}`);

			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
