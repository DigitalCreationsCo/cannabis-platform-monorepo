import { createAddress, findAddressById, findUserWithDetailsByEmail, findUserWithDetailsById, Membership, removeAddressByIdAndUserId, updateUserPasswordToken } from '@cd/data-access';
import { compare } from 'bcryptjs';
import { SessionContainer } from 'supertokens-node/recipe/session';
/* =================================
User Data Access - data class for User table

members:
signin
signout
getUserById
getUserByEmail
getAddressById
addAddressToUser
removeAddressFromUser
updatePasswordToken

================================= */

type userLoginData = {
    email: string;
    password: string;
}

type AccessTokenPayload = {
    username: string;
    id: string;
    email: string;
     firstName: string; 
     lastName: string; 
     memberships: Membership[]
}

export default class UserDA {
    static async signin(userLoginData: userLoginData) {
        try {
        const user = await findUserWithDetailsByEmail(userLoginData.email)

		if (user !== null && user.hashedPassword === null) {
			throw new Error('Please reset your password');
		}

		if (user !== null && (await compare(userLoginData.password, user.hashedPassword ?? ''))) {
			const payload: AccessTokenPayload = { id: user.id,username: user.username, email: user.email, firstName: user.firstName, lastName: user.lastName, memberships: user.memberships };
            return payload
		}
        } catch (error) {
            console.error(error.message);
            throw new Error('Invalid email or password');
        }
    }

    static async signout(session: SessionContainer) {
        try {
            await session.revokeSession()
            console.log(`session ${session.getUserId()} is revoked.`)
        } catch (error) {
            console.error(error.message);
            throw new Error('Logout failed.');
        }
    }

    static async getUserById(id) {
        try {
            const data = await findUserWithDetailsById(id);
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            const data = await findUserWithDetailsByEmail(email);
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

    static async addAddressToUser(address) {
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

    static async updatePasswordToken(email, timeLimitedToken) {
        try {
            const data = await updateUserPasswordToken(email, timeLimitedToken)
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
