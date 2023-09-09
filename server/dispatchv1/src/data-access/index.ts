import cluster from 'cluster';
import { getGeoJsonPairFromCoordinates } from '@cd/core-lib';
import prisma, {
	findDriverWithDetailsById,
	updateOrder,
	type Coordinates,
	type OrganizationWithAddress,
} from '@cd/data-access';
import {
	MongoClient,
	ObjectId,
	type ChangeStream,
	type Collection,
} from 'mongodb';

const mongoConnectUrl = process.env.MONGODB_CONNECTION_URL || '';

class DispatchDA {
	driverSessionsCollection: Collection | undefined;
	dispatchOrdersCollection: Collection | undefined;
	dispatchOrdersChangeStream: ChangeStream | undefined;

	constructor() {
		this.driverSessionsCollection;
		this.dispatchOrdersCollection;
		this.dispatchOrdersChangeStream;

		if (cluster.isPrimary) {
			return (async () => {
				await this.connectDb();
				await this.createPendingOrdersChangeStream().then(() =>
					console.info(
						' 🚔 [Primary:' +
							process.pid +
							'] is connected to Mongo, and Prismadatabase. 👏',
					),
				);
				return this;
			})() as unknown as DispatchDA;
		}

		if (cluster.isWorker) {
			return (async () => {
				await this.connectDb().then(() =>
					console.info(
						' 🚔 [Worker-' +
							cluster?.worker?.id +
							':' +
							process.pid +
							'] is connected to Mongo, and Prismadatabase. 👏',
					),
				);
				return this;
			})() as unknown as DispatchDA;
		}
	}

	/**
	 * Connect to mongo database and prisma database.
	 * - Mongo is used for geospatial queries and dispatch actions
	 * - Prisma is used for user authentication and ecommerce records
	 */
	async connectDb() {
		try {
			const dispatch_namespace = process.env.DISPATCH_DB_NS;

			await MongoClient.connect(mongoConnectUrl)
				.then(async (client) => {
					this.driverSessionsCollection = client
						.db(dispatch_namespace)
						.collection('driver_sessions');
					this.dispatchOrdersCollection = client
						.db(dispatch_namespace)
						.collection('dispatch_orders');
				})
				.catch((error) => {
					console.error(
						' 🚔 server-dispatch : Error connecting to mongo database: ',
						error.stack,
					);
					process.exit(1);
				});

			prisma
				.$connect()
				.then(async () => {
					console.info(
						' 🚔 server-dispatch : Prisma Database 👏👏 is ready for query.',
					);
				})
				.catch((error) => {
					console.error(
						' 🚔 server-dispatch : Error connecting to prisma database: ',
						error.stack,
					);
					process.exit(1);
				});

			return this;
		} catch (error: any) {
			console.error('🚔 server-dispatch : connectDb error: ', error);
			throw new Error('🚔 server-dispatch : connectDb error: ' + error.message);
		}
	}

	/**
	 * Query mongo collection for dispatch orders
	 * @param id
	 * @returns
	 */
	async getDispatchOrderById(id: string) {
		try {
			return await this.dispatchOrdersCollection?.findOne({
				id: new ObjectId(id),
			});
		} catch (error) {
			console.error(`Error occurred while retrieving order, ${error}`);
		}
	}

	/**
	 * Queries prisma database for the driver object
	 * @param driverId
	 * @returns driver user record
	 */
	async getDriverUserRecordById(driverId: string) {
		try {
			return await findDriverWithDetailsById(driverId);
			// return await this.driversCollection?.findOne(query, projection);
		} catch (error: any) {
			console.error(`Error occurred while retrieving user session, ${error}`);
			throw new Error(`getDriverUserRecordById error: ${error.message}`);
		}
	}

	/**
	 * Queries mongodb collection for the driver session object
	 * @param driverId
	 * @returns driver session object
	 */
	async getDriverSessionById(driverId: string) {
		try {
			const _query = { id: new ObjectId(driverId) },
				_projection = {
					projection: {
						_id: 0,
						email: 0,
						address: 0,
						city: 0,
						state: 0,
						zipcode: 0,
						preferences: 0,
						orderHistory: 0,
					},
				};

			return await this.driverSessionsCollection?.findOne(_query, _projection);
		} catch (error: any) {
			console.error(`Error occurred while retrieving user session, ${error}`);
			throw new Error(`getDriverSessionById error:  ${error.message}`);
		}
	}

	/**
	 * Mongo geonear query to find drivers within range of coordinates
	 * @param coordinates
	 * @returns driversession[]
	 */
	async findDriversWithinRange(
		organization: OrganizationWithAddress,
		radiusFactor = 1,
	): Promise<{ id: string; phone: string }[]> {
		try {
			const geoJsonPoint = getGeoJsonPairFromCoordinates(
				organization.address.coordinates as Coordinates,
			);
			if (!geoJsonPoint) throw new Error('No coordinates are valid.');
			const drivers = (await this.driverSessionsCollection
				?.aggregate([
					{
						$geoNear: {
							near: geoJsonPoint,
							query: { isOnline: true, isActiveDelivery: false },
							maxDistance:
								(organization.address.coordinates?.radius || 5000) *
								radiusFactor, // meters
							distanceField: 'distanceToFirstStop',
							spherical: true,
						},
					},
					{ $limit: 10 },
					{ $project: { _id: 0, id: 1, phone: 1 } },
				])
				.toArray()) as { id: string; phone: string }[];
			return drivers || [];
		} catch (error: any) {
			console.error(error);
			throw new Error(error.message);
		}
	}

	/**
	 * search within ~5 miles, increase the range if no drivers are found
	 * @param coordinates
	 * @returns `{ id: string }[]`
	 */
	async findDriverIdsWithinRange(
		organization: OrganizationWithAddress,
	): Promise<{ id: string }[]> {
		try {
			const geoJsonPoint = getGeoJsonPairFromCoordinates(
				organization.address.coordinates as Coordinates,
			);

			if (!geoJsonPoint) throw new Error('No coordinates are valid.');

			const driverIds = (await this.driverSessionsCollection
				?.aggregate([
					{
						$geoNear: {
							near: geoJsonPoint,
							query: { isOnline: true, isActiveDelivery: false },
							maxDistance: organization.address.coordinates?.radius || 5000, // meters
							distanceField: 'distanceToFirstStop',
							spherical: true,
						},
					},
					{ $limit: 10 },
					{ $project: { _id: 0, id: 1 } },
				])
				.toArray()) as { id: string }[];
			return driverIds || [];
		} catch (error: any) {
			console.error('findDriverIdsWithinRange: ', error);
			throw new Error(error.message);
		}
	}

	async addDriverToOrderRecord(orderId: string, driverId: string) {
		// query prisma to add to order,
		// and to mongo as well for the change stream
		try {
			// add driver to prisma record
			await updateOrder(orderId, { driverId: driverId });

			const driver = await this.getDriverUserRecordById(driverId);

			const query = { orderId: new ObjectId(orderId) };
			const update = { $set: { driver: driver } };
			const updatedOrder = await this.dispatchOrdersCollection?.updateOne(
				query,
				update,
				{ writeConcern: { w: 'majority' } },
			);

			if (updatedOrder?.modifiedCount === 0)
				throw new Error(`Did not update the record: ${orderId}`);

			return { success: 'true' };
		} catch (error: any) {
			console.error(`Error occurred while updating order, ${error}`);
			throw new Error(error.message);
		}
	}

	async createPendingOrdersChangeStream() {
		try {
			const changeStream = await this.dispatchOrdersCollection?.watch([], {
				fullDocument: 'updateLookup',
			});

			console.info(
				` 🚔 [Primary: ${process.pid}] is watching ${this.dispatchOrdersCollection?.namespace} collection for dispatch orders`,
			);

			this.dispatchOrdersChangeStream = changeStream;
		} catch (error: any) {
			console.error(error);
			throw new Error(error.message);
		}
	}
}

export default new DispatchDA();

process.on('SIGINT', async function () {
	await prisma
		.$disconnect()
		.then(process.exit(0))
		.catch(() => process.exit(1));
});
