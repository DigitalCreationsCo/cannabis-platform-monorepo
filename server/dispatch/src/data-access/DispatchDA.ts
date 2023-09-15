/* eslint-disable @typescript-eslint/naming-convention */
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
	type ChangeStream,
	type Collection,
	type PushOperator,
} from 'mongodb';

class DispatchDA {
	driver_sessions_collection: Collection | undefined;
	dispatch_orders_collection: Collection | undefined;
	dispatch_orders_changestream: ChangeStream | undefined;

	constructor() {
		this.driver_sessions_collection;
		this.dispatch_orders_collection;
		this.dispatch_orders_changestream;
		if (cluster.isPrimary) {
			return (async () => {
				await this.connectDb();
				await this.createPendingOrdersChangeStream().then(() =>
					console.info(
						' 🚚 [Primary:' +
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
						' 🚚 [Worker-' +
							cluster?.worker?.id +
							':' +
							process.pid +
							'] is connected to Mongo, and Prismadatabase. 👏👏',
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

			await MongoClient.connect(process.env.MONGODB_CONNECTION_URL as string)
				.then(async (client) => {
					this.driver_sessions_collection = client
						.db(dispatch_namespace)
						.collection('driver_sessions');
					this.dispatch_orders_collection = client
						.db(dispatch_namespace)
						.collection('dispatch_orders');
				})
				.catch((error) => {
					console.error(
						' 🚚 server-dispatch : Error connecting to mongo database: ',
						error.stack,
					);
					process.exit(1);
				});
			prisma.$connect().catch((error) => {
				console.error(
					' 🚚 server-dispatch : Error connecting to prisma database: ',
					error.stack,
				);
				process.exit(1);
			});

			return this;
		} catch (error: any) {
			console.error('connectDb error: ', error);
			prisma.$disconnect();
			throw new Error(error.message);
		}
	}

	/**
	 * Query mongo collection for dispatch orders
	 * @param id
	 * @returns
	 */
	async getDispatchOrderById(id: string) {
		try {
			return await this.dispatch_orders_collection?.findOne({
				id,
			});
		} catch (error) {
			console.error(`getDispatchOrderById: ${error}`);
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
			console.error(`getDriverUserRecordById: ${error}`);
			throw new Error(error.message);
		}
	}

	/**
	 * Queries mongodb collection for the driver session object
	 * @param driverId
	 * @returns driver session object
	 */
	async getDriverSessionById(driverId: string) {
		try {
			const _query = { id: driverId },
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

			return await this.driver_sessions_collection?.findOne(
				_query,
				_projection,
			);
		} catch (error: any) {
			console.error(`getDriverSessionById: ${error}`);
			throw new Error(error.message);
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
	): Promise<{ id: string; phone: string; dialCode: string }[]> {
		try {
			const geoJsonPoint = getGeoJsonPairFromCoordinates(
				organization.address.coordinates as Coordinates,
			);
			if (!geoJsonPoint) throw new Error('No coordinates are valid.');
			console.info(
				`findDriversWithinRange for the coordinates ${JSON.stringify(
					geoJsonPoint,
				)}
				with radiusFactor ${radiusFactor}
				covering a radius of ${
					(organization.address.coordinates?.radius || 5000) * radiusFactor
				} meters, 
				${
					((organization.address.coordinates?.radius || 5000) * radiusFactor) /
					1000
				} kilometers`,
			);
			const drivers = (await this.driver_sessions_collection
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
					{ $project: { _id: 0, id: 1, phone: 1, dialCode: 1 } },
				])
				.toArray()) as { id: string; phone: string; dialCode: string }[];
			return drivers || [];
		} catch (error: any) {
			console.error('findDriversWithinRange: ', error);
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

			const driverIds = (await this.driver_sessions_collection
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

			const query = { id: orderId };
			const update = { $set: { driver: driver } };
			const updatedOrder = await this.dispatch_orders_collection?.updateOne(
				query,
				update,
				{ writeConcern: { w: 'majority' } },
			);

			if (updatedOrder?.modifiedCount === 0)
				throw new Error(`Did not update the record: ${orderId}`);

			return { success: 'true' };
		} catch (error: any) {
			console.error(`addDriverToOrderRecord: ${error}`);
			throw new Error(error.message);
		}
	}

	async createPendingOrdersChangeStream() {
		try {
			if (!this.dispatch_orders_collection)
				throw new Error('createPendingOrdersChangeStream: No collection');
			const changeStream = await this.dispatch_orders_collection?.watch([], {
				fullDocument: 'updateLookup',
			});
			console.info(
				` 🚚 [Primary: ${process.pid}] is watching changestream from ${this.dispatch_orders_collection?.namespace} collection`,
			);
			this.dispatch_orders_changestream = changeStream;
		} catch (error: any) {
			console.error('createPendingOrdersChangeStream: ', error);
			throw new Error(error.message);
		}
	}

	/**
	 * atomic update op to add 'dispatching' status to dispatch_order, removing it from reads in the order queue
	 * @param orderId
	 */
	async dequeueOrder(orderId: string) {
		try {
			await this.dispatch_orders_collection?.findOneAndUpdate(
				{
					$and: [
						{ 'order.id': orderId },
						{ 'queueStatus.0.status': 'Inqueue' },
						{ 'queueStatus.0.nextReevaluation': null },
					],
				},
				{
					$push: {
						queueStatus: {
							$each: [
								{
									status: 'Dispatching',
									createdAt: new Date(),
									nextReevaluation: null,
								},
							],
							$position: 0,
						},
					},
				} as PushOperator<{
					status: string;
					createdAt: Date;
					nextReevaluation: null;
				}>,
			);
		} catch (error: any) {
			console.error('dequeueOrder: ', error);
			throw new Error(error.message);
		}
	}

	/**
	 * mongodb op to add 'dispatched' status to dispatch_order, removing it from reads in the order queue
	 * @param orderId
	 */
	async markOrderAsDispatched(orderId: string) {
		try {
			await this.dispatch_orders_collection?.findOneAndUpdate(
				{
					query: {
						id: orderId,
					},
				},
				{
					update: {
						$push: {
							queueStatus: {
								$each: [
									{
										status: 'Dispatched',
										createdAt: new Date(),
										nextReevaluation: null,
									},
								],
								$position: 0,
							},
						},
					},
				},
			);
		} catch (error: any) {
			console.error('markOrderAsDispatched: ', error);
			throw new Error(error.message);
		}
	}

	/**
	 * mongodb op to add 'failed' status to dispatch_order, to handle document processing errors
	 * @param orderId
	 */
	async markOrderAsFailed(orderId: string) {
		try {
			await this.dispatch_orders_collection?.findOneAndUpdate(
				{
					query: {
						id: orderId,
					},
				},
				{
					update: {
						$push: {
							queueStatus: {
								$each: [
									{
										status: 'Failed',
										createdAt: new Date(),
										nextReevaluation: new Date(
											new Date().getTime() + 2 * 60000,
										), // new date plus 2 minutes
									},
								],
								$position: 0,
							},
						},
					},
				},
			);
		} catch (error: any) {
			console.error('markOrderAsFailed: ', error);
			throw new Error(error.message);
		}
	}
}

export default new DispatchDA();
