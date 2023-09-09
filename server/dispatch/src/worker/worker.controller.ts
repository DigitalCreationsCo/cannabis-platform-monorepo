// import cluster from "cluster";
// import settings from '../../settings'
// import { connectClientController } from "../redis";

import DispatchDA from '../data-access/DispatchDA';

global.rooms = {};

export default class WorkerRoomController {
	db: typeof DispatchDA = {} as typeof DispatchDA;
	constructor() {
		this.db = DispatchDA;
	}

	sendToMaster(_command, _data) {
		process.send?.({ act: _command, data: _data });
	}

	async joinRoom(room, socketIdList) {
		console.info('socket list: ', socketIdList);
		let socketId;
		console.info('sockets from adapter: ', await global.io.sockets.adapter);
		for (socketId of socketIdList) {
			console.info('socket id to join: ', socketId);
			console.info('room to join: ', room);

			// await global.io.sockets.adapter.remoteJoin(socketId, room);
			await global.io.sockets.adapter.sockets;
		}
	}

	static deleteRoom(_roomId) {}
}
