/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import {
	Client,
	createRoomId,
	getOrderIdFromRoom,
	isEmpty,
	TextContent,
	type ClientType,
	type ClusterMessage,
	type ClusterMessagePayload,
	type WorkerToMasterPayload,
} from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import type DispatchDA from '../data-access/DispatchDA';
import { connectClientController } from '../redis-client/clients-redis';
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
								console.info('connected-on-worker: ', payload.roomId);
								break;
							case 'add-driver-to-record':
								console.info('payload: ', payload);
								console.info('add-driver-to-record: ', payload.roomId);
								await this.db?.addDriverToOrderRecord(
									getOrderIdFromRoom(payload.roomId),
									payload.client?.id as string,
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
						console.info('changestream event', change.operationType);
						let order;
						let queueStatus;
						switch (change.operationType) {
							case 'insert':
								order = (change.fullDocument as OrderWithDispatchDetails).order;
								// assign driver to dispatch order
								if (isEmpty(order.driver)) {
									this.createSelectDriverRoom(order);
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
		console.info(`selecting driver for order ${order.id}`);
		try {
			let radiusFactor = 1;
			// get driver records within delivery range
			let driversWithinDeliveryRange = await this.db?.findDriversWithinRange(
				order.organization,
				radiusFactor,
			);
			console.info(
				'# of drivers within delivery range: ',
				driversWithinDeliveryRange?.length,
			);
			// if no drivers found, increase radius and try again
			// while (radiusFactor < 5 && driversWithinDeliveryRange.length < 2) {
			while (radiusFactor < 5 && isEmpty(driversWithinDeliveryRange)) {
				radiusFactor *= 1.5;
				driversWithinDeliveryRange = await this.db?.findDriversWithinRange(
					order.organization,
					radiusFactor,
				);
			}
			if (isEmpty(driversWithinDeliveryRange)) {
				// await a poll to find drivers when they become available
				console.info('no drivers found within delivery range');
				// throw new Error(TextContent.error.DRIVER_NOT_FOUND);
			}
			// dont get clients, rather update clients for every order
			// const clients = await connectClientController.getManyClientsByPhone(
			// 	driversWithinDeliveryRange,
			// );

			const clients: Client[] = [];
			// create client for each driver, update existing clients
			const roomId = createRoomId('select-driver', order.id);
			driversWithinDeliveryRange?.forEach(async (driver) => {
				const client = new Client({
					id: driver.id,
					phone: driver.phone,
					orderId: order.id,
					roomId,
				});
				console.log('client joining ', client, 'room ', roomId);
				connectClientController.saveClient(client);
				clients.push(client);
				console.info('pushed new client');
				// }
			});
			console.info('select-driver clients ', clients);
			await this.subscribeToRoom(
				clients,
				roomId,
				TextContent.dispatch.status.NEW_ORDER,
				order,
			);
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom: ', error);
			throw new Error(error.message);
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
			// const clients = await connectClientController.getManyClientsByPhone(
			// 	usersJoining,
			// );

			// match clients
			// if no match, the user is smsOnly and we need to create a new client
			// usersJoining.forEach(async (user) => {
			// 	if (!checkClientsForUser(clients, user.id)) {
			// 		const client = new Client({
			// 			id: user.id,
			// 			phone: user.phone,
			// 			orderId: order.id,
			// 			roomId,
			// 		});
			// 		console.log('client joining ', client, 'room ', roomId);
			// 		connectClientController.saveClient(client);
			// 		clients.push(client);
			// 		console.info('pushed new client');
			// 	}
			// });

			const clients: Client[] = [];
			usersJoining.forEach(async (user) => {
				// get or create client, and update client in redis cache
				let client = await connectClientController.getOneClientByPhone(
					user.phone,
				);
				if (isEmpty(client))
					client = new Client({
						id: user.id,
						phone: user.phone,
						orderId: order.id,
						roomId,
					});
				console.log('client joining ', client, 'room ', roomId);
				await connectClientController.saveClient({
					...client,
					roomId,
					orderId: order.id,
				});
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
		clients: ClientType[],
		roomId: string,
		message?: string,
		order?: OrderWithDispatchDetails['order'],
	) {
		try {
			console.info('subscribeToRoom clients ', clients);
			// i dont think this block is needed, as the room is created on worker

			// clients.forEach(
			// 	async (client) =>
			// 		await dispatchRoomController.addClient(roomId, client),
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
			console.error('Dispatch: subscribeToRoom: ', error);
			throw new Error(error.message);
		}
	}

	// static async deleteClientFromRoomOnMaster(client: Client) {
	// 	await connectClientController.deleteClient(client);
	// }
}

export default ClusterController;
