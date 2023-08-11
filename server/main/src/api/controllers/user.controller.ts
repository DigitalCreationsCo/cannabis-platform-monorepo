import {
	addressObjectIntoArray,
	getGeoCoordinatesFromAddress,
} from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import { UserDA } from '../data-access';

/* =================================
UserController - controller class for user business actions

members:
createUser
updateUser
createDispensaryStaff
updateDispensaryStaff
signin                  not used
signout                 not used 
getUserById
getAddressById
addAddressToUser
removeAddressFromUser
signup                  not used

================================= */

export default class UserController {
	static async createUser(req, res) {
		try {
			const rawUser = req.body;

			// address data comes as an object, but we need it as an array per data schema
			const user: UserCreateType = { ...rawUser, address: [rawUser.address] };

			const coordinates = await getGeoCoordinatesFromAddress(user.address[0]);

			if (coordinates) user.address[0].coordinates = coordinates;

			const data = await UserDA.upsertUser(user);

			console.info('user created: ', data);
			if (!data) return res.status(404).json('User could not be created.');

			return res.status(201).json(data);
		} catch (error: any) {
			if (error.message.includes('This user exists already')) {
				return res.status(400).json({ error });
			} else res.status(500).json({ error });
		}
	}

	static async createDispensaryStaff(req, res) {
		try {
			let { user } = req.body;
			const { role, dispensaryId } = req.body;
			user = addressObjectIntoArray(user);
			const data = await UserDA.createDispensaryStaff(user, role, dispensaryId);
			if (!data)
				return res.status(404).json('Dispensary user could not be created.');
			return res.status(201).json(data);
		} catch (error: any) {
			if (error.message.includes('This user exists already')) {
				console.info('yes, EXIST ALREADY');
				return res.status(400).json(error.message);
			} else res.status(500).json({ error });
		}
	}

	static async updateDispensaryStaff(req, res) {
		try {
			const { user, role, dispensaryId } = req.body;
			const data = await UserDA.updateDispensaryStaff(user, role, dispensaryId);
			if (!data) return res.status(404).json('User could not be created.');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}

	static async updateUser(req, res) {
		try {
			const user = req.body;
			const data = await UserDA.updateUser(user);
			if (!data)
				return res.status(404).json('User record could not be updated.');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}

	static async getUserById(req, res) {
		try {
			const id = req.params.id || '';
			const data = await UserDA.getUserById(id);
			if (!data) return res.status(404).json('User not found');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}

	static async getAddressById(req, res) {
		try {
			const { addressId } = req.params;
			const data = await UserDA.getAddressById(addressId);
			if (!data) return res.status(404).json('Address not found');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}

	static async addAddressToUser(req, res) {
		try {
			const address = req.body;
			const data = await UserDA.addAddressToUser(address);
			if (!data) return res.status(404).json('Address was not created');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}

	static async removeAddressFromUser(req, res) {
		try {
			const { id = '', addressId = '' } = req.params;
			const data = await UserDA.removeAddressFromUser({
				addressId,
				userId: id,
			});
			if (!data) return res.status(404).json('Address not found');
			return res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error });
		}
	}
}

export type SessionResponsePayload = {
	status: boolean;
	message: string;
	session: any;
};
