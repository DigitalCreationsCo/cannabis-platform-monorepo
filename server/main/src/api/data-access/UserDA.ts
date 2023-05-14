import { createAddress, createOrUpdateUser, findAddressById, findUserWithDetailsByEmail, findUserWithDetailsById, removeAddressByIdAndUserId, updateUserPasswordToken, UserCreateType } from '@cd/data-access';
import { createPasswordHash } from '../../util/utility';

/* =================================
User Data Access - data methods for User Controller

members:
signin                  not used
signout                 not used

getUserById
getUserByEmail
getAddressById

addAddressToUser
removeAddressFromUser

updatePasswordToken
createUser
updateUser

================================= */

export default class UserDA {
    // static async signin(userLoginData: UserLoginData) {
    //     try {
    //     const user = await findUserWithDetailsByEmail(userLoginData.email)

	// 	if (user !== null && user.passwordHash === null) {
	// 		throw new Error('Please reset your password');
	// 	}

	// 	// if (user !== null && !(await compare(userLoginData.password, user.hashedPassword ?? ''))) {
    //     //     throw new Error('Invalid password')
    //     // }
	// 		return user;
    //     } catch (error:any) {
    //         console.error(error.message);
    //         throw new Error(error:any);
    //     }
    // }

    // untested
    // static async signout(session: SessionContainer) {
    //     try {
    //         await session.revokeSession()
    //         console.log(`session ${session.getUserId()} is revoked.`)
    //     } catch (error:any) {
    //         console.error(error.message);
    //         throw new Error('Logout failed.');
    //     }
    // }

    static async getUserById(id) {
        try {
            const data = await findUserWithDetailsById(id);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            const data = await findUserWithDetailsByEmail(email);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getAddressById(addressId) {
        try {
            const data = await findAddressById(addressId);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async addAddressToUser(address) {
        try {
            address.coordinateId = '';
            const data = await createAddress(address);
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async removeAddressFromUser({ addressId, userId }) {
        try {
            const data = await removeAddressByIdAndUserId({ addressId, userId });
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updatePasswordToken(email, timeLimitedToken) {
        try {
            const data = await updateUserPasswordToken(email, timeLimitedToken)
            return data;
        } catch (error:any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async createUser(createUserData: UserCreateType) {
        try {
            createUserData = await createPasswordHash(createUserData)
            const user = await createOrUpdateUser(createUserData)

            return user
        } catch (error:any) {
            console.error('UserDA error: ', error.message);
            throw new Error(error.message);
        }
    }

    static async createDispensaryAdmin(createUserData: UserCreateType, dispensaryId: string) {
        try {
            createUserData = await createPasswordHash(createUserData)
            const user = await createOrUpdateUser(createUserData)

            return user
        } catch (error:any) {
            console.error('UserDA error: ', error.message);
            throw new Error(error.message);
        }
    }

    static async updateUser(createUserData: UserCreateType) {
        try {
            console.log('createUser Data: ', createUserData)
            const user = await createOrUpdateUser(createUserData)

            console.log(`updated user ${user.id}`)
            return user
        } catch (error:any) {
            console.error('UserDA error: ', error.message);
            throw new Error(error.message);
        }
    }
}
