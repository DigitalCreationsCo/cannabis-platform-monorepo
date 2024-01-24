import {
	addAddressToUser,
	createUser,
	deleteUserById,
	findAddressById,
	findDispensaryStaffUserByEmail,
	findDispensaryStaffUserByPhone,
	findUserWithDetailsByEmail,
	findUserWithDetailsById,
	findUserWithDetailsByPhone,
	removeAddressByIdAndUserId,
	updateDispensaryStaffUser,
	updateUser,
	upsertDispensaryStaffUser,
	upsertUser,
	type UserCreateType,
} from '@cd/data-access';

/* =================================
User Data Access - data methods for User Controller

members:
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
getDispensaryStaffUserByEmail
getDispensaryStaffUserByPhone
deleteUser

================================= */

export default class UserDA {
	static async getUserById(id: string) {
		try {
			return await findUserWithDetailsById(id);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getUserByEmail(email: string) {
		try {
			return await findUserWithDetailsByEmail(email);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getUserByPhone(phone: string) {
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

	static async createUser(data: UserCreateType) {
		try {
			return await createUser(data);
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

	static async updateUser(updateUserData: UserCreateType) {
		try {
			console.info('updateUserData: ', updateUserData);
			const user = await updateUser(updateUserData);
			console.info(`updated user ${user.id}`);
			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async deleteUser(id) {
		try {
			return await deleteUserById(id);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async addAddressToUser(userId, address) {
		try {
			return await addAddressToUser(userId, address);
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

	static async createDispensaryStaffUser(
		createUserData: UserCreateType,
		role: string,
		dispensaryId: string,
	) {
		try {
			return await upsertDispensaryStaffUser(createUserData, {
				role,
				dispensaryId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateDispensaryStaffUser(
		createUserData: UserCreateType,
		role: string,
		dispensaryId: string,
	) {
		try {
			return await updateDispensaryStaffUser(createUserData, {
				role,
				dispensaryId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getDispensaryStaffUserByEmail(email: string) {
		try {
			return await findDispensaryStaffUserByEmail(email);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async getDispensaryStaffUserByPhone(phone: string) {
		try {
			return await findDispensaryStaffUserByPhone(phone);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
