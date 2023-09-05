import {
	createDriver,
	findDriverWithDetailsByEmail,
	findDriverWithDetailsById,
	findDriverWithDetailsByPhone,
	updateDriver,
	type DriverCreateType,
	type UserCreateType,
} from '@cd/data-access';
import { type Collection, type MongoClient } from 'mongodb';

/* =================================
Driver Data Access - data class for Driver SQL Table and DriverSessions Mongo Collection

members:
useMongoDB

createDriver
updateDriver

getDriverById
getDriverByEmail
updateOnlineStatus

================================= */

let driverSessions: Collection | null = null;

const dispatch_namespace = process.env.DISPATCH_DB_NS;

export default class DriverDA {
	static async useMongoDB(mongoClient: MongoClient) {
		try {
			if (!driverSessions)
				driverSessions = await mongoClient
					.db(dispatch_namespace)
					.collection('driver_sessions');

			return;
		} catch (e: any) {
			console.error(`Unable to establish collection handle in DriverDA: ${e}`);
			throw new Error(
				`Unable to establish collection handle in DriverDA: ${e.message}`,
			);
		}
	}

	static async createDriver(createDriverData: DriverCreateType) {
		try {
			return await createDriver(createDriverData);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateDriver(updateDriverData: UserCreateType) {
		try {
			const driver = await updateDriver(updateDriverData);

			console.info(`updated user ${driver.id}`);

			return driver;
		} catch (error: any) {
			console.error('UserDA error: ', error.message);
			throw new Error(error.message);
		}
	}

	static async getDriverById(id: string) {
		try {
			return await findDriverWithDetailsById(id);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	/**
	 * Find driver record MYSQL by email,
	 * then find driver session record MONGO by email,
	 * then return both records in a single object
	 * @param email
	 * @returns
	 */
	static async getDriverByEmail(email: string) {
		try {
			const driver = await findDriverWithDetailsByEmail(email);

			const driverSession = await driverSessions
				.findOneAndUpdate(
					{ email },
					{
						$set: {
							id: driver.id,
							isOnline: false,
							isActiveDelivery: false,
							currentCoordinates: [],
							currentRoute: [],
						},
					},
					{ upsert: true, returnDocument: 'after' },
				)
				.then(
					(result) => result.ok && result.value,
					(error) => {
						throw new Error(error.message);
					},
				);

			return {
				...driver,
				driverSession,
			};
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getDriverByPhone(phone) {
		try {
			return await findDriverWithDetailsByPhone(phone);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async updateOnlineStatus(id, onlineStatus) {
		try {
			const updateStatus = await driverSessions.updateOne(
				{ id },
				{ $set: { isOnline: onlineStatus } },
				{ upsert: true },
			);

			if (!updateStatus.acknowledged) {
				throw new Error(`Could not update status driver: ${id}`);
			}

			return { success: 'true' };
		} catch (error: any) {
			console.error(`Error update driver status, ${error}`);
			throw new Error(error.message);
		}
	}
}
