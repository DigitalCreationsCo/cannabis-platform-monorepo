// import cluster from "cluster";
// import settings from "../../settings";
// import { Client } from '../../types'
import { isEmpty, TextContent } from '@cd/core-lib';
import { type OrderWithDispatchDetails } from '@cd/data-access';
import DispatchDA from '../../data-access';
import { Client, type DriverClient } from '../../dispatch.types';
import { connectClientController } from '../redis';
import ClusterInit from './clusterInit';

global.rooms = {};
global.lastWorkerId = 0;

/**
 * @class MasterRoomController
 * watch change events dispatch_orders collection
 * handle dispatch events
 * send events to workers
 */
class MasterRoomController {
	dispatchDataAccess: typeof DispatchDA | undefined;

	constructor() {
		return (async () => {
			this.dispatchDataAccess = DispatchDA;
			this.initDispatchDataAccessModule();
			// .then(() =>
			// this.dispatchDataAccess.dispatchOrdersChangeStream);
		})() as unknown as MasterRoomController;
	}

	async initDispatchDataAccessModule() {
		import('../../data-access')
			.then(async ({ default: DispatchDA }) => {
				this.dispatchDataAccess = await DispatchDA;
			})
			.then(() => {
				this.dispatchDataAccess?.dispatchOrdersChangeStream?.on(
					'change',
					async (change: any) => {
						const order: any = change.fullDocument;

						switch (change.operationType) {
							case 'insert':
								console.info(`dispatch: new dispatch order`);
								if (isEmpty(order.driver))
									console.info(
										`dispatch: order ${order.id} needs assigned driver.`,
									);
								// get order
								// select driver for order
								// subscribe drivers to socket room
								// determine the selected driver
								// subscribe the selected driver to order socket room `delivery-<orderId>`
								// console.info("order inserted");
								this.createSelectDriverRoom(order);
								// else get socket id for driver, send to socket room for order.

								break;

							case 'update':
								if (!order.driver)
									console.info('pending Order needs assigned driver.');
								// ClusterInit.SendToWorker(
								//   global.lastWorkerId,
								//   "dispatch:SELECT_DRIVER",
								//   { order }
								// );

								break;

							default:
								console.info(
									'unhandled dispatch change event: ',
									change.operationType,
								);
						}
					},
				);
			});
	}

	/** can be used to subscribe many drivers to a room, for en masse delivery message 100+ drivers at scale
	 */
	// static SubscribeToRoom(
	//   _socketId,
	//   _orderId
	//   //_namespace,
	//   // _roomId
	// ) {
	//   // iterate over all global rooms in master,
	//   let roomId;
	//   for (roomId in global.rooms) {
	//     // if room exists for orderId, (must be added in delivery namespace)
	//     if (global.io.sockets.adapter.rooms[roomId] === _orderId) {
	//       // join this room
	//       return this.JoinRoom(
	//         _socketId,
	//         global.rooms[roomId].workerId,
	//         roomId,
	//         (_client) => {
	//           global.rooms[roomId].clients[_socketId] = _client;
	//         }
	//       );
	//     }
	//   }

	//   roomId = _orderId;
	//   if (++global.lastWorkerId >= settings.numCPUs) {
	//     global.lastWorkerId = 0;
	//   }
	//   return this.JoinRoom(_socketId, global.lastWorkerId, roomId, (_client) => {
	//     // create new empty room on master global rooms
	//     // possibly use status property ? for handling
	//     global.rooms[roomId] = {
	//       workerId: global.lastWorkerId,
	//       clients: {},
	//     };
	//     global.rooms[roomId].clients[_client.socketId] = _client;
	//     console.info(
	//       "MASTER: create new room " +
	//         roomId +
	//         " on worker " +
	//         global.lastWorkerId
	//     );
	//     console.info("global rooms? ", global.rooms);
	//   });
	// }

	// static JoinRoom(
	//   _socketId,
	//   _workerId,
	//   // _namespace,
	//   _roomId,
	//   _callback
	// ) {
	//   const client = new Client(
	//     _socketId,
	//     _workerId,
	//     _roomId
	//     //_namespace
	//   );
	//   global.io.sockets.sockets.get(_socketId).adapter.remoteJoin(
	//     _socketId,
	//     _roomId,
	//     // _namespace,
	//     function (err) {
	//       if (err) {
	//         console.info("Error MASTER: remote join client " + _socketId);
	//       } else {
	//         console.info("MASTER: client " + _socketId + " join in " + _roomId);
	//         _callback(client);
	//       }
	//     }
	//   );
	//   return client;
	// }

	async createSelectDriverRoom(order: OrderWithDispatchDetails) {
		try {
			let radiusFactor = 1;
			const { organization, id: orderId } = order;
			const room = `select-driver:${orderId}`;

			// get driver records within delivery range
			let driversWithinDeliveryRange =
				await this.dispatchDataAccess?.findDriversWithinRange(
					organization,
					radiusFactor,
				);
			while (
				radiusFactor < 5 &&
				(!driversWithinDeliveryRange || driversWithinDeliveryRange.length === 0)
			) {
				radiusFactor *= 1.5;
				driversWithinDeliveryRange =
					await this.dispatchDataAccess?.findDriversWithinRange(
						organization,
						radiusFactor,
					);
			}
			if (
				!driversWithinDeliveryRange ||
				driversWithinDeliveryRange.length === 0
			)
				throw new Error(TextContent.error.DRIVER_NOT_FOUND);

			// create new client for each driver
			driversWithinDeliveryRange.forEach(async (driver) => {
				const socketId = await connectClientController
					.getSocketsByDriverIds([{ driverId: driver.id }])
					.then((sockets) => sockets[0]);
				return new Client({
					socketId: socketId,
					workerId: 0,
					roomId: room,
					userId: driver.id,
					phone: driver.phone,
				});
			});
			const selectDriverSocketIdList =
				await connectClientController.getSocketsByDriverIds(selectedDriverIds);

			// abstract this section VVV and this line above ^^^,
			// and move into one function (findDriverIdsWithinRange),
			// that can call recursively, with greater range each call.
			// then, return the selectDriverSocketIdList

			if (selectDriverSocketIdList.length > 0)
				this.joinRoom(_roomname, selectDriverSocketIdList);
			else {
				// call again with greater range, until drivers are found.
				// console.info("MASTER: " + process.pid + " dispatch order to 0 drivers ");
				// possible recursive call here
			}
		} catch (error: any) {
			console.error('Dispatch: createSelectDriverRoom error: ', error);
			throw new Error(error.message);
		}
	}

	async joinSocketsInRoom(room: string, socketIdList: string[]) {
		let socketId;
		for (socketId of socketIdList) {
			const socket = global.io.sockets.sockets.get(socketId);
			// const socket = await global.io.of("/").adapter.sids.get(socketId);
			socket && socket.join(room);
		}
	}

	static disconnectClientFromRoom(_client: Client) {
		if (!global.rooms[_client.roomId]) return;

		ClusterInit.SendToWorker(
			global.rooms[_client.roomId].workerId,
			'leaveUser',
			_client,
		);
		this.deleteClientFromMasterRoom(_client);

		console.info(
			`MASTER: client ${_client.socketId} was successfully disconnected from room ${_client.roomId}.`,
		);
	}

	static sendToWorker(_client: Client, _action: RoomAction, _data: any) {
		// is used to send new socketconnections to an existing room
		ClusterInit.SendToWorker(global.rooms[_client.roomId].workerId, _action, [
			_client,
			_data,
		]);
	}

	static deleteClientFromMasterRoom(_client: DriverClient) {
		try {
			if (!global.rooms[_client.roomId])
				throw new Error(`MASTER Error: room ${_client.roomId} does not exist.`);

			delete global.rooms[_client.roomId].clients[_client.socketId];
		} catch (error: any) {
			console.info('deleteClientFromMasterRoom error: ', error);
			throw new Error(error.message);
		}
	}

	async getDispatchOrderById(id: string) {
		return await this.dispatchDataAccess?.getDispatchOrderById(id);
	}

	async addDriverToOrder(orderId: string, driverId: string) {
		try {
			await this.dispatchDataAccess?.addDriverToOrderRecord(orderId, driverId);
		} catch (error: any) {
			console.info(`addDriverToOrder: ${error}`);
			throw new Error(error.message);
		}
	}
}

export default new MasterRoomController();
