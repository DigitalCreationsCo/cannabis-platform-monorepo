import { type ClientType } from '../dispatch.types';
import Messager from '../message/Messager';
import WorkerRoom from './WorkerRoom';

class SelectDriverRoom extends WorkerRoom {
	messager: typeof Messager;
	constructor(room: string, client: any) {
		super(room, client);
		this.messager = Messager;
		global.io
			.fetchSockets()
			.then((sockets) =>
				sockets.find((socket) => socket.id === client.socketId)?.join(room),
			);
		console.info(
			`WORKER ${process.pid}: client ${client.id} join room ${room}`,
		);
	}

	sendAll(clients: ClientType[], message: string) {
		this.messager.sendAll(clients, message);
	}

	sendMessage(client: ClientType, message: string) {
		this.messager.sendMessage(client, message);
	}
}

export default SelectDriverRoom;
