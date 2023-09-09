/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Worker } from 'cluster';
import cluster from 'node:cluster';
import { isEmpty, TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import DispatchDA from '../data-access/DispatchDA';
import { Client, type ClusterMessage } from '../dispatch.types';
import { connectClientController } from '../redis-client/clients-redis';
import settings from './cluster-settings';

class ClusterController {
	workers: Worker[] = [];
	db: typeof DispatchDA = {} as typeof DispatchDA;
	constructor() {
		cluster.setupPrimary({
			execArgv: [],
			exec: settings.workerPath,
		});

		for (let i = 0; i < settings.numCPUs; i++) {
			this.workers[i] = cluster.fork();
			this.workers[i].on('message', function (_msg: ClusterMessage) {
				// eslint-disable-next-line sonarjs/no-small-switch
				switch (_msg.action) {
					default:
						break;
				}
			});
		}

		this.db = DispatchDA;
		this.db.dispatch_orders_changestream?.on('change', async (change) => {
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
					if (!order.driver) {
						// assign driver
						null;
					} else {
						// createDeliverOrderRoom(order)
					}
					break;
				default:
					console.info('unhandled changestream event: ', change.operationType);
			}
		});
	}

	sendClientToWorker(workerId: number, { action, payload }: ClusterMessage) {
		this.workers[workerId].send({ action, payload });
	}

	async createSelectDriverRoom(order: OrderWithDispatchDetails) {
		try {
			let radiusFactor = 1;
			const room = `select-driver:${order.id}`;

			// get driver records within delivery range
			let driversWithinDeliveryRange = await this.db.findDriversWithinRange(
				order.organization,
				radiusFactor,
			);
			while (
				radiusFactor < 5 &&
				(!driversWithinDeliveryRange || driversWithinDeliveryRange.length === 0)
			) {
				radiusFactor *= 1.5;
				driversWithinDeliveryRange = await this.db.findDriversWithinRange(
					order.organization,
					radiusFactor,
				);
			}
			if (
				!driversWithinDeliveryRange ||
				driversWithinDeliveryRange.length === 0
			)
				throw new Error(TextContent.error.DRIVER_NOT_FOUND);

			const clients = driversWithinDeliveryRange.map(async (driver) => {
				const socketId = await connectClientController.getSocketsByDriverIds([
					{ driverId: driver.id },
				])[0];
				return new Client({
					socketId: socketId,
					workerId: 0,
					roomId: room,
					userId: driver.id,
					phone: driver.phone,
				});
			});
			clients.forEach((client) => this.subscribeToRoom(client, order.id));
			// abstract this section VVV and this line above ^^^,
			// and move into one function (findDriverIdsWithinRange),
			// that can call recursively, with greater range each call.
			// then, return the selectDriverSocketIdList

			// call again with greater range, until drivers are found.
			// console.info("MASTER: " + process.pid + " dispatch order to 0 drivers ");
			// possible recursive call here
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom error: ', error);
			throw new Error(error.message);
		}
	}

	subscribeToRoom(client: ClientType, orderId: string) {
		// iterate over all global rooms in master,
		let roomId;
		for (roomId in global.rooms) {
			// if room exists for orderId, (must be added in delivery namespace)
			if (global.io.sockets.adapter.rooms[roomId] === orderId) {
				// join this room
				return this.joinRoom(
					client.socketId,
					global.rooms[roomId].workerId,
					roomId,
					(_client) => {
						global.rooms[roomId].clients[_socketId] = _client;
					},
				);
			}
		}

		roomId = _orderId;
		if (++global.lastWorkerId >= settings.numCPUs) {
			global.lastWorkerId = 0;
		}
		return this.JoinRoom(_socketId, global.lastWorkerId, roomId, (_client) => {
			// create new empty room on master global rooms
			// possibly use status property ? for handling
			global.rooms[roomId] = {
				workerId: global.lastWorkerId,
				clients: {},
			};
			global.rooms[roomId].clients[_client.socketId] = _client;
			console.info(
				'MASTER: create new room ' +
					roomId +
					' on worker ' +
					global.lastWorkerId,
			);
			console.info('global rooms? ', global.rooms);
		});
	}

	joinRoom(
		_socketId,
		_workerId,
		// _namespace,
		_roomId,
		_callback,
	) {
		const client = new Client(
			_socketId,
			_workerId,
			_roomId,
			// _namespace
		);
		global.io.sockets.sockets.get(_socketId).adapter.remoteJoin(
			_socketId,
			_roomId,
			// _namespace,
			function (err) {
				if (err) {
					console.info('Error MASTER: remote join client ' + _socketId);
				} else {
					console.info('MASTER: client ' + _socketId + ' join in ' + _roomId);
					_callback(client);
				}
			},
		);
		return client;
	}
}

export default ClusterController;
