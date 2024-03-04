/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import {
	createRoomId,
	getOrderIdFromRoom,
	isEmpty,
	TextContent,
	Client,
	type ClusterMessage,
	type ClusterMessagePayload,
	type WorkerToMasterPayload,
} from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import type DispatchDA from '../data-access/DispatchDA';
import { redisDispatchClientsController } from '../redis-dispatch/redis-dispatch-clients';
import settings from './cluster-settings';

global.lastWorkerId = 0;

class ClusterController {
	workers: Worker[] = [];
	db: typeof DispatchDA | undefined;
	constructor() {
		if (cluster.isPrimary) {
			cluster.setupPrimary({
				execArgv: [
					'../../node_modules/@babel/node/lib/_babel-node.js',
					'-x',
					'.ts',
					'--',
				],
				exec: 'src/worker/index.ts',
			});

			for (let i = 0; i < settings.numCPUs; i++) {
				this.workers[i] = cluster.fork();
				this.workers[i].on(
					'message',
					async ({
						action,
						payload,
					}: ClusterMessage<WorkerToMasterPayload>) => {
						// eslint-disable-next-line sonarjs/no-small-switch
						switch (action) {
							case 'connected-on-worker':
								console.debug({ ...payload });
								break;
							case 'add-driver-to-record':
								console.info('payload: ', payload);
								console.info('add-driver-to-record: ', payload.roomId);
								await this.db?.addDriverToOrderRecord(
									getOrderIdFromRoom(payload.roomId),
									payload.client?.userId as string,
								);

								await this.db?.dequeueOrder(getOrderIdFromRoom(payload.roomId));
								console.info(
									`connected-on-worker: dequeued order ${getOrderIdFromRoom(
										payload.roomId,
									)}`,
								);
								console.info(
									`connected-on-worker: dispatched order ${getOrderIdFromRoom(
										payload.roomId,
									)}`,
								);
								break;
							case 'pickup-product':
								console.info('pickup-product: ', payload.orderId);
								await this.db?.updateOrderRecord(payload.orderId, {
									isProductPickedUp: true,
									productPickedUpAt: new Date(),
								});
								break;
							case 'deliver-product':
								console.info('deliver-product: ', payload.orderId);
								await this.db?.updateOrderRecord(payload.orderId, {
									isDeliveredOrder: true,
									deliveredAt: new Date(),
								});
								break;
							case 'customer-receive-product':
								console.info('customer-receive-product: ', payload.orderId);
								await this.db?.updateOrderRecord(payload.orderId, {
									isCustomerReceivedOrder: true,
									customerReceivedOrderAt: new Date(),
									orderStatus: 'Delivered',
								});
								this.sendToWorker({
									action: 'order-complete',
									payload: {
										roomId: payload.roomId,
									},
								});
								break;
							case 'order-complete':
								console.info('order-complete: ', payload.orderId);
								await this.db?.updateOrderRecord(payload.orderId, {
									isCompleted: true,
									completedAt: new Date(),
									orderStatus: 'Completed',
								});
								break;
							default:
								console.info('Master Cluster Controller: unhandled action');
								console.info('action, ', action);
								console.info('payload, ', payload);
								break;
						}
					},
				);
			}
			if (!this.db) {
				import('../data-access/DispatchDA').then(async (DispatchDA) => {
					this.db = await DispatchDA.default;
					this.db.dispatch_orders_changestream?.on('change', async (change) => {
						console.info({ event: change.operationType });

						let order;
						let queueStatus;
						switch (change.operationType) {
							case 'insert':
								try {
									order = (change.fullDocument as OrderWithDispatchDetails)
										.order;
									// assign driver to dispatch order
									if (isEmpty(order.driver)) {
										this.createSelectDriverRoom(order);
									}
								} catch (error: any) {
									console.error(error.message);
									// add better error handling here, for dispatch failover
									// throw new Error(error.message);

									// if Invalid Coordinates, update the coordinates for the order.
									// prisma -> mongo update -> leads to 'update' changestream event
								}
								break;

							case 'update':
								order = (change.fullDocument as OrderWithDispatchDetails).order;
								console.info('update order: ', order);
								queueStatus = (change.fullDocument as OrderWithDispatchDetails)
									.queueStatus;
								console.info('queueStatus: ', queueStatus);

								if (
									queueStatus[0].status === 'Inqueue' ||
									queueStatus[0].status === 'Failed' ||
									queueStatus[0].status === 'Dispatching'
								) {
									if (isEmpty(order.driver)) {
										// assign driver
										this.createSelectDriverRoom(order);
									} else {
										// deliver order
										this.createDeliverOrderRoom(order);
									}
								}
								break;
							default:
								console.info(
									'unhandled changestream event: ',
									change.operationType,
								);
						}
					});
				});
			}
		}
	}

	async sendToWorker({
		action,
		payload,
	}: ClusterMessage<ClusterMessagePayload>) {
		this.workers[global.lastWorkerId].send({ action, payload });
	}

	async createSelectDriverRoom(order: OrderWithDispatchDetails['order']) {
		try {
			let radiusFactor = 1;

			console.debug(`Finding a driver for order:${order.id}.`);
			let driversWithinRadius = await this.db?.findDriversWithinRadius(
				order.organization,
				radiusFactor,
			);

			// if no drivers found, increase radius and find again
			while (isEmpty(driversWithinRadius)) {
				if (radiusFactor < 5) {
					radiusFactor *= 1.5;
					console.debug(
						`A driver was not found. Search radius will be ${radiusFactor}`,
					);
					driversWithinRadius = await this.db?.findDriversWithinRadius(
						order.organization,
						radiusFactor,
					);
				} else throw new Error('A driver is not available.');
			}

			// create client for each driver, update existing clients
			const roomId = createRoomId('select-driver', order.id);

			const clients = await updateDriverClients(
				driversWithinRadius!,
				order.id,
				roomId,
			);

			console.debug(`driver clients`, { clients });
			await this.subscribeToRoom(
				clients,
				roomId,
				TextContent.dispatch.status.NEW_ORDER,
				order,
			);
		} catch (error: any) {
			console.error(`createSelectDriverRoom: ${error.message}`);
			// throw new Error(
			// error.message,
			// );
		}
	}

	async createDeliverOrderRoom(order: OrderWithDispatchDetails['order']) {
		console.info(`creating delivery message room for order ${order.id}`);
		try {
			await this.db?.markOrderAsDispatched(order.id);

			// customer is the first element in the array
			// driver is the second element in the array
			const usersJoining = [
				{ id: order.customer.id, phone: order.customer.phone },
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				{ id: order.driver!.id, phone: order.driver!.user.phone },
				// { id: order.organization.id }, // dashboard websocket client feature
			];

			const roomId = createRoomId('deliver-order', order.id);
			// const clients = await redisDispatchClientsController.getManyClientsByPhone(
			// 	usersJoining,
			// );

			// match clients
			// if no match, the user is smsOnly and we need to create a new client
			// usersJoining.forEach(async (user) => {
			// 	if (!checkClientsForUser(clients, user.id)) {
			// 					// 		console.log(
			// 	'client joining ',
			// 	driver.id,
			// 	', ',
			// 	driver.phone,
			// 	' in room ',
			// 	roomId,
			// );
			// 		const client = redisDispatchClientsController.mergeClient({userId: user.id,
			// 			phone: user.phone,
			// 			orderId: order.id,
			// 			roomId,});
			// 		clients.push(client);
			// 		console.info('pushed new client');
			// 	}
			// });

			const clients: Client[] = [];
			usersJoining.forEach(async (user) => {
				// get or create client, and update client in redis cache
				let client = await redisDispatchClientsController.getOneClientByPhone(
					user.phone,
				);

				if (isEmpty(client)) {
					client = new Client({
						userId: user.id,
						phone: user.phone,
						orderId: order.id,
						roomId,
					});

					client = await redisDispatchClientsController.mergeClient({
						...client,
						roomId,
						orderId: order.id,
					});
				} else {
					await redisDispatchClientsController.saveClient(client);
				}

				console.log('client joining ', client, 'room ', roomId);

				clients.push(client);
				console.info('pushed new client');
			});
			// clients[0] is the customer client
			// clients[1] is the driver client
			console.info('deliver-order clients ', clients);
			await this.subscribeToRoom(clients, roomId, '', order);
		} catch (error: any) {
			console.error('Dispatch: createDeliverOrderRoom: ', error);
			throw new Error(error.message);
		}
	}

	async subscribeToRoom(
		clients: Client[],
		roomId: string,
		message?: string,
		order?: OrderWithDispatchDetails['order'],
	) {
		try {
			console.info('subscribeToRoom', {
				clients,
				roomId,
				message,
				orderId: order!['id'],
			});

			// i dont think this block is needed, as the room is created on worker

			// clients.forEach(
			// 	async (client) =>
			// 		await redisDispatchRoomsController.addClient(roomId, client),
			// );
			if (++global.lastWorkerId >= settings.numCPUs) {
				global.lastWorkerId = 0;
			}
			return this.sendToWorker({
				action: 'join-room',
				payload: {
					roomId,
					clients,
					message,
					order,
				},
			});
		} catch (error: any) {
			console.error('subscribeToRoom: ', error.message);
			throw new Error(error.message);
		}
	}

	// static async deleteClientFromRoomOnMaster(client: Client) {
	// 	await redisDispatchClientsController.deleteClient(client);
	// }
}

export default ClusterController;

async function updateDriverClients(
	drivers: any[],
	orderId: string,
	roomId: string,
): Promise<Client[]> {
	return drivers.reduce(async (clients: Client[], driver) => {
		const mergeClient = await redisDispatchClientsController.mergeClient({
			userId: driver.id,
			phone: driver.phone,
			orderId,
			roomId,
		});
		return [...clients, mergeClient];
	}, []);
}
