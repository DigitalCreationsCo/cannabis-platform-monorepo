import { getCoordinatePairFromCoordinates } from '@gras/core';
import {
	createDriver,
	deleteDriverById,
	findDriverWithDetailsByEmail,
	findDriverWithDetailsById,
	findDriverWithDetailsByPhone,
	updateDriver,
	updateDriverOnlineStatus,
	type DriverCreateType,
	type DriverSessionWithJoinedData,
	type DriverWithSessionJoin,
	type UserCreateType,
	type UserWithDriverDetails,
} from '@gras/data-access';
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

	static async createDriverAndDriverSession(
		createDriverData: DriverCreateType,
	) {
		try {
			console.info('createDriverAndDriverSession', createDriverData);

			const driver = await createDriver(createDriverData);
			const driverSession = await driverSessions.insertOne({
				id: driver.id,
				email: createDriverData.email,
				phone: createDriverData.phone,
				firstName: createDriverData.firstName,
				lastName: createDriverData.lastName,
				isOnline: false,
				isActiveDelivery: false,
				currentCoordinates: getCoordinatePairFromCoordinates(
					driver.user.address[0].coordinates,
				),
				currentRoute: [],
			});
			return {
				...driver,
				driverSession,
			};
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateDriver(
		updateDriverData: UserCreateType,
	): Promise<UserWithDriverDetails> {
		try {
			const driver = await updateDriver(updateDriverData);
			const driverSession = (await driverSessions
				.findOneAndUpdate(
					{ email: driver.email },
					{
						$set: {
							id: driver.id,
							email: driver.email,
							phone: driver.phone,
							firstName: driver.firstName,
							lastName: driver.lastName,
						},
					},
					{ upsert: true, returnDocument: 'after' },
				)
				.then(
					(result) => result.ok && result.value,
				)) as DriverSessionWithJoinedData;
			console.info(`updated driver ${driver.id}`);
			return { ...driver, driverSession };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	/**
	 * Find driver record by id,
	 * find driver session record by id,
	 * and return both records in a single object
	 * @param id
	 * @returns
	 */
	static async getDriverById(id: string): Promise<DriverWithSessionJoin> {
		try {
			return await Promise.all([
				findDriverWithDetailsById(id),
				driverSessions.findOne({
					id: id,
				}),
			]).then(
				(res) => {
					const driver = res[0];
					const driverSession =
						res[1] as unknown as DriverSessionWithJoinedData;
					return { ...driver, driverSession };
				},
				(err) => {
					throw new Error(err.message);
				},
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	/**
	 * Find driver record by phone,
	 * find driver session record by phone,
	 * and return both records in a single object
	 * @param phone
	 * @returns
	 */
	static async getDriverByPhone(phone: string): Promise<DriverWithSessionJoin> {
		try {
			return await Promise.all([
				findDriverWithDetailsByPhone(phone),
				driverSessions.findOne({ phone }),
			]).then(
				(res) => {
					const driver = res[0];
					const driverSession =
						res[1] as unknown as DriverSessionWithJoinedData;
					return { ...driver, driverSession };
				},
				(err) => {
					throw new Error(err.message);
				},
			);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	/**
	 * Find driver record by email,
	 * find driver session record by email,
	 * and return both records in a single object
	 * @param email
	 * @returns
	 */
	static async getDriverByEmail(email: string): Promise<DriverWithSessionJoin> {
		try {
			const driver = await findDriverWithDetailsByEmail(email);
			const driverSession = (await driverSessions
				.findOneAndUpdate(
					{ email },
					{
						$set: {
							id: driver.id,
							email: driver.email,
							phone: driver.user.phone,
							firstName: driver.user.firstName,
							lastName: driver.user.lastName,
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
				)) as unknown as DriverSessionWithJoinedData;

			return {
				...driver,
				driverSession,
			};
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async deleteDriverAndDriverSession(deleteId: string) {
		try {
			if (!deleteId) throw new Error('No id provided');
			await deleteDriverById(deleteId);
			await driverSessions.deleteOne({ id: deleteId });
			return { success: true };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async updateOnlineStatus(id: string, onlineStatus: boolean) {
		try {
			const updateStatusPrismaPromise = await updateDriverOnlineStatus(
				id,
				onlineStatus,
			);
			const updateStatusMongoPromise = await driverSessions.updateOne(
				{ id },
				{ $set: { isOnline: onlineStatus } },
				{ upsert: true },
			);
			await Promise.all([updateStatusPrismaPromise, updateStatusMongoPromise]);
			return { success: 'true' };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
