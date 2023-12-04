import {
	addressObjectIntoArray,
	getGeoCoordinatesFromAddress,
	isArray,
	normalizeUserData,
} from '@cd/core-lib';
import { type AddressCreateType } from '@cd/data-access';
import { ShopDA, UserDA } from '../data-access';

/* =================================
UserController - controller class for user business actions

members:
createUser
updateUser
createDispensaryStaff
updateDispensaryStaff
getUserById
getOrdersForUser
getAddressById
addAddressToUser
removeAddressFromUser
deleteUser

================================= */

export default class UserController {
	static async createUser(req, res) {
		try {
			const rawUser = req.body;
			console.info('rawUser: ', rawUser);
			// address data comes as an object, but we need it as an array per data schema
			if (rawUser.address) {
				const coordinates = await getGeoCoordinatesFromAddress(rawUser.address);
				if (coordinates) rawUser.address.coordinates = coordinates;
			}
			const normalizedUser = normalizeUserData(rawUser);
			const data = await UserDA.upsertUser(normalizedUser);
			console.info('createUser data: ', data);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'User could not be created.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.error('createUser: ', error.message);
			if (error.message.includes('Unique value')) {
				res.status(400).json({
					success: 'false',
					error: error.message,
				});
				// eslint-disable-next-line sonarjs/no-duplicated-branches
			} else if (error.message.includes('This user exists already')) {
				res.status(400).json({
					success: 'false',
					error: error.message,
				});
			} else {
				res.status(500).json({
					success: 'false',
					error: error.message,
				});
			}
		}
	}

	static async createDispensaryStaff(req, res) {
		try {
			let { user } = req.body;
			const { role, dispensaryId } = req.body;
			user = addressObjectIntoArray(user);
			const data = await UserDA.createDispensaryStaff(user, role, dispensaryId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'Dispensary user could not be created.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('createDispensaryStaff: ', error.message);
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async updateDispensaryStaff(req, res) {
		try {
			const { user, role, dispensaryId } = req.body;
			const data = await UserDA.updateDispensaryStaff(user, role, dispensaryId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'User could not be created.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('updateDispensaryStaff: ', error.message);
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async updateUser(req, res) {
		try {
			const userData = req.body;
			console.log('update user: ', userData);
			if (!isArray(userData.address)) {
				const coordinates = await getGeoCoordinatesFromAddress(
					userData.address,
				);
				if (coordinates) userData.address.coordinates = coordinates;
			}
			const normalizedUser = normalizeUserData(userData);
			const data = await UserDA.updateUser(normalizedUser);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'User record was not updated.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('updateUser: ', error.message);
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async getUserById(req, res) {
		try {
			const id = req.params.id || '';
			const data = await UserDA.getUserById(id);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'User not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.error('getUserById: ', error.message);
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async getOrdersForUser(req, res) {
		try {
			const id = req.params.id || '';
			const data = await ShopDA.getOrdersByUser(id);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'User not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async getAddressById(req, res) {
		try {
			const { addressId } = req.params;
			const data = await UserDA.getAddressById(addressId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'Address not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async addAddressToUser(req, res) {
		try {
			const address: AddressCreateType = req.body;
			const { userId } = address;
			const coordinates = await getGeoCoordinatesFromAddress(address);
			if (coordinates) address.coordinates = coordinates;
			console.info('addAddressToUser input: ', address);
			const data = await UserDA.addAddressToUser(userId, address);
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'Address was not added',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async removeAddressFromUser(req, res) {
		try {
			const { id = '', addressId = '' } = req.params;
			const data = await UserDA.removeAddressFromUser({
				addressId,
				userId: id,
			});
			if (!data)
				return res.status(404).json({
					success: 'false',
					error: 'Address not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}

	static async deleteUser(req, res) {
		try {
			const id = req.params.id || '';
			const data = await UserDA.deleteUser(id);
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			if (error.message.includes('Record to delete does not exist.'))
				return res.status(404).json({
					success: 'false',
					error: error.message,
				});
			return res.status(500).json({
				success: 'false',
				error: error.message,
			});
		}
	}
}

export type SessionResponsePayload = {
	status: boolean;
	message: string;
	session: any;
};
