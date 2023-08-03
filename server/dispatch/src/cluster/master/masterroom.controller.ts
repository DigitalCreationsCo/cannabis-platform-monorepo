// import cluster from "cluster";
// import settings from "../../settings";
import { connectClientController } from '../redis';
// import { Client } from '../../types'
import { OrderWithDetails } from '@cd/data-access';
import { Client } from 'types';
import DispatchDA from '../../data-access';
import _ from '../../util';
import ClusterInit from './clusterInit';

global.rooms = {};
global.lastWorkerId = 0;

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
						let order: OrderWithDetails = change.fullDocument;

						switch (change.operationType) {
							case 'insert':
								let driver = order.driver;

								// handle new dispatch order
								if (_.isEmpty(driver))
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
									change.operationType
								);
						}
					}
				);
			});
	}

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

	async createSelectDriverRoom(order: OrderWithDetails) {
		try {
			let { organization, id: orderId } = order,
				_roomname = `select-driver:${orderId}`;

			// console.info(
			//   "data access: ",
			//   await this.dispatchDataAccess.findDriverIdsWithinRange(location)
			// );
			// console.info(
			//   "selected drivers: ",
			//   await this.dispatchDataAccess.findDriverIdsWithinRange(location)
			// );

			let coordinates = organization.address.coordinates;

			const selectedDriverIds =
				await this.dispatchDataAccess?.findDriverIdsWithinRange(coordinates);

			if (!selectedDriverIds) throw new Error('No drivers found within range.');

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

	async joinRoom(roomname: string, socketIdList: string[]) {
		let socketId;

		for (socketId of socketIdList) {
			console.info('socket id to join: ', socketId);
			console.info('room to join: ', roomname);
			console.info('sockets to join room: ', await global.io);

			const socket = await global.io.sockets.sockets.get(socketId);
			// const socket = await global.io.of("/").adapter.sids.get(socketId);

			await socket?.join(roomname);
		}
	}

	static disconnectClientFromRoom(_client: Client) {
		if (!global.rooms[_client.roomId]) return;

		ClusterInit.SendToWorker(
			global.rooms[_client.roomId].workerId,
			'leaveUser',
			_client
		);
		this.deleteClientFromMasterRoom(_client);

		console.info(
			`MASTER: client ${_client.socketId} was successfully disconnected from room ${_client.roomId}.`
		);
	}

	static sendToWorker(_client: Client, _action: RoomAction, _data: any) {
		// is used to send new socketconnections to an existing room
		ClusterInit.SendToWorker(global.rooms[_client.roomId].workerId, _action, [
			_client,
			_data,
		]);
	}

	static deleteClientFromMasterRoom(_client: Client) {
		try {
			if (!global.rooms[_client.roomId])
				throw new Error(`MASTER Error: room ${_client.roomId} does not exist.`);

			delete global.rooms[_client.roomId].clients[_client.socketId];
		} catch (error: any) {
			console.info('deleteClientFromMasterRoom error: ', error);
			throw new Error(error.message);
		}
	}

	async getOrderById(id: string) {
		return await this.dispatchDataAccess?.getDispatchOrderById(id);
	}

	async addDriverToOrder(orderId: string, driverId: string) {
		try {
			await this.dispatchDataAccess?.addDriverToOrderRecord(orderId, driverId);
		} catch (error: any) {
			console.info(error);
			throw new Error(error.message);
		}
	}
}

export default new MasterRoomController();
