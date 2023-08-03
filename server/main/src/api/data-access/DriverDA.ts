import {
	createDriver,
	findDriverWithDetailsByEmail,
	findDriverWithDetailsById,
	findDriverWithDetailsByPhone,
	updateDriver,
	UserCreateType,
} from '@cd/data-access';
import { Collection, MongoClient } from 'mongodb';

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
				`Unable to establish collection handle in DriverDA: ${e.message}`
			);
		}
	}

	static async createDriver(createDriverData: UserCreateType) {
		try {
			// createDriver = await createPasswordHash(createUserData)
			const driver = await createDriver(createDriverData);

			return driver;
		} catch (error: any) {
			console.error('UserDA error: ', error.message);
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
			const data = await findDriverWithDetailsById(id);
			return data;
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
	static async getDriverByEmail<DriverWithDetails>(email: string) {
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
					{ upsert: true, returnDocument: 'after' }
				)
				.then(
					(result) => result.ok && result.value,
					(error) => {
						throw new Error(error.message);
					}
				);

			const data = {
				...driver,
				driverSession,
			};

			return data;
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getDriverByPhone(phone) {
		try {
			const data = await findDriverWithDetailsByPhone(phone);
			return data;
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
				{ upsert: true }
			);

			if (!updateStatus.acknowledged) {
				throw new Error(`Could not update status driver: ${id}`);
			}

			return { success: true };
		} catch (error: any) {
			console.error(`Error update driver status, ${error}`);
			throw new Error(error.message);
		}
	}
}
