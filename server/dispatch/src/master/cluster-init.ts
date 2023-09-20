/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import { isEmpty, TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import type DispatchDA from '../data-access/DispatchDA';
import {
	Client,
	type ClientType,
	type ClusterMessage,
} from '../dispatch.types';
import {
	checkClientsForUser,
	createRoomId,
	getOrderIdFromRoom,
} from '../dispatch.util';
import { connectClientController } from '../redis-client/clients-redis';
import settings from './cluster-settings';

global.lastWorkerId = 0;

class ClusterController {
	workers: Worker[] = [];
	db: typeof DispatchDA = {} as typeof DispatchDA;
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
					async ({ action, payload }: ClusterMessage) => {
						// eslint-disable-next-line sonarjs/no-small-switch
						switch (action) {
							case 'connected-on-worker':
								if (payload.roomId.startsWith('select-driver')) {
									console.info('connected-on-worker: ', payload.roomId);
									await this.db.dequeueOrder(
										getOrderIdFromRoom(payload.roomId),
									);
									console.info(
										`connected-on-worker: dequeued order ${getOrderIdFromRoom(
											payload.roomId,
										)}`,
									);
								} else if (payload.roomId.startsWith('deliver-order')) {
									console.info('connected-on-worker: ', payload.roomId);
									await this.db.markOrderAsDispatched(
										getOrderIdFromRoom(payload.roomId),
									);
									console.info(
										`connected-on-worker: dispatched order ${getOrderIdFromRoom(
											payload.roomId,
										)}`,
									);
								}
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
							queueStatus = (change.fullDocument as OrderWithDispatchDetails)
								.queueStatus;

							if (
								queueStatus[0].status === 'Inqueue' ||
								queueStatus[0].status === 'Failed'
							) {
								if (isEmpty(order.driver)) {
									// assign driver
									this.createSelectDriverRoom(order);
								} else {
									// deliver order
									console.info('deliver order!');
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

	async sendToWorker({ action, payload }: ClusterMessage) {
		this.workers[global.lastWorkerId].send({ action, payload });
	}

	async createSelectDriverRoom(order: OrderWithDispatchDetails['order']) {
		try {
			let radiusFactor = 1;
			// get driver records within delivery range
			let driversWithinDeliveryRange = await this.db.findDriversWithinRange(
				order.organization,
				radiusFactor,
			);
			console.info(
				'# of drivers within delivery range: ',
				driversWithinDeliveryRange.length,
			);
			// if no drivers found, increase radius and try again
			// while (radiusFactor < 5 && driversWithinDeliveryRange.length < 2) {
			while (radiusFactor < 5 && isEmpty(driversWithinDeliveryRange)) {
				radiusFactor *= 1.5;
				driversWithinDeliveryRange = await this.db.findDriversWithinRange(
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
			// match driversWithinDeliveryRange to clients
			// if no match, the driver is smsOnly and we need to create a new client
			const roomId = createRoomId('select-driver', order.id);
			driversWithinDeliveryRange.forEach(async (driver) => {
				// if (!checkClientsForUser(clients, driver.id)) {
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
		try {
			const usersJoining = [
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				{ id: order.driver!.id, phone: order.driver!.user.phone },
				{ id: order.customer.id, phone: order.customer.phone },
				// { id: order.organization.id }, // dashboard websocket client feature
			];
			const clients = await connectClientController.getManyClientsByPhone(
				usersJoining,
			);
			// match clients
			// if no match, the user is smsOnly and we need to create a new client

			const roomId = createRoomId('deliver-order', order.id);
			usersJoining.forEach(async (user) => {
				if (!checkClientsForUser(clients, user.id)) {
					const client = new Client({
						id: user.id,
						phone: user.phone,
						orderId: order.id,
						roomId,
					});
					console.log('client joining ', client, 'room ', roomId);
					await connectClientController.saveClient(client);
					clients.push(client);
				}
			});
			await this.subscribeToRoom(clients, roomId);
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
