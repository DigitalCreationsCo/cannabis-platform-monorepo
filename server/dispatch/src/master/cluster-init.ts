/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import { isEmpty, TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import type DispatchDA from '../data-access/DispatchDA';
import { type ClientType, type ClusterMessage } from '../dispatch.types';
import {
	checkClientsForUser,
	createRoomId,
	getOrderIdFromRoom,
} from '../dispatch.util';
import { dispatchRoomController } from '../redis-client';
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
					switch (change.operationType) {
						case 'insert':
							order = change.fullDocument as OrderWithDispatchDetails['order'];
							if (isEmpty(order.driver)) {
								this.createSelectDriverRoom(order);
							}
							break;
						case 'update':
							order = change.fullDocument as OrderWithDispatchDetails['order'];
							if (isEmpty(order.driver)) {
								// assign driver
								this.createSelectDriverRoom(order);
								null;
							} else {
								// createDeliverOrderRoom(order)
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

	async sendToWorker(workerId: number, { action, payload }: ClusterMessage) {
		this.workers[workerId].send({ action, payload });
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
			const clients = await connectClientController.getClientsByIds(
				driversWithinDeliveryRange,
			);
			// match driversWithinDeliveryRange to clients
			// if no match, the driver is smsOnly and we need to create a new client
			driversWithinDeliveryRange.forEach((driver) => {
				if (!checkClientsForUser(clients, driver.id)) {
					clients.push({
						id: driver.id,
						phone: driver.phone,
					});
				}
			});
			const roomId = createRoomId('select-driver', order.id);
			await this.subscribeToRoom(
				clients,
				roomId,
				TextContent.dispatch.status.NEW_ORDER,
			);
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom: ', error);
			throw new Error(error.message);
		}
	}

	async subscribeToRoom(
		clients: ClientType[],
		roomId: string,
		message?: string,
	) {
		try {
			clients.forEach(
				async (client) =>
					await dispatchRoomController.addClient(roomId, client),
			);
			if (++global.lastWorkerId >= settings.numCPUs) {
				global.lastWorkerId = 0;
			}
			return this.sendToWorker(global.lastWorkerId, {
				action: 'join-room',
				payload: {
					roomId,
					clients,
					message,
				},
			});
		} catch (error: any) {
			console.error('Dispatch: subscribeToRoom: ', error);
			throw new Error(error.message);
		}
	}

	static async deleteClientFromRoomOnMaster(socketId: string) {
		await connectClientController.deleteClientBySocketId(socketId);
	}
}

export default ClusterController;
