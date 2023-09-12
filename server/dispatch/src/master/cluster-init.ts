/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import { isEmpty } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import type DispatchDA from '../data-access/DispatchDA';
import { type ClusterMessage } from '../dispatch.types';
import { dispatchRoomController } from '../redis-client';
import { connectClientController } from '../redis-client/clients-redis';
import settings from './cluster-settings';

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
					function ({ action, payload }: ClusterMessage) {
						// eslint-disable-next-line sonarjs/no-small-switch
						switch (action) {
							case 'connected-on-worker':
								console.info(
									'Master Cluster Controller: user is connected-on-worker',
								);
								console.info('payload, ', payload);
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
					let order: OrderWithDispatchDetails;
					switch (change.operationType) {
						case 'insert':
							order = change.fullDocument as OrderWithDispatchDetails;
							if (isEmpty(order.driver)) {
								this.createSelectDriverRoom(order);
							}
							break;
						case 'update':
							order = change.fullDocument as OrderWithDispatchDetails;
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

	async createSelectDriverRoom(order: OrderWithDispatchDetails) {
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
				// start a poll to find drivers
				console.info('no drivers found within delivery range');
				// throw new Error(TextContent.error.DRIVER_NOT_FOUND);
			}

			const clients = await connectClientController.getClientsByIds(
				driversWithinDeliveryRange,
			);

			// add clients to room
			const roomId = this.buildRoomId('select-driver', order.id);
			clients.forEach((client) => this.subscribeToRoom(client, roomId));
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom error: ', error);
			throw new Error(error.message);
		}
	}

	async subscribeToRoom(client: ClientType, roomId: string) {
		try {
			await dispatchRoomController.addClient(roomId, client);
			if (++global.lastWorkerId >= settings.numCPUs) {
				global.lastWorkerId = 0;
			}
			return this.sendToWorker(global.lastWorkerId, {
				action: 'join-room',
				payload: { roomId, client },
			});
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom error: ', error);
			throw new Error(error.message);
		}
	}

	static async deleteClientFromRoomOnMaster(socketId: string) {
		await connectClientController.deleteClientBySocketId(socketId);
	}

	sendToWorker(workerId: number, { action, payload }: ClusterMessage) {
		this.workers[workerId].send({ action, payload });
	}

	buildRoomId = (
		namespace: 'select-driver' | 'deliver-order',
		orderId: string,
	) => {
		return `${namespace}:${orderId}`;
	};
}

export default ClusterController;
