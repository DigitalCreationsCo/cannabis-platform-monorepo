import { TextContent } from '@cd/core-lib';
import { dispatchEvents } from 'message/message-events';
import { type ClientType } from '../dispatch.types';
import Messager from '../message/Messager';
import WorkerRoom from './WorkerRoom';

class SelectDriverRoom extends WorkerRoom {
	messager: typeof Messager;
	constructor(room: string, clients: ClientType[]) {
		super(room, clients);
		this.messager = Messager;
		clients.forEach((client) =>
			global.io
				.fetchSockets()
				.then((sockets) =>
					sockets.find((socket) => socket.id === client.socketId)?.join(room),
				),
		);
		console.info(
			`WORKER ${process.pid}: ${clients.length} clients join room ${room}`,
		);
		this.on(dispatchEvents.new_order, () => {
			this.sendAll(TextContent.dispatch.status.NEW_ORDER);
		});
	}

	sendAll(message: string) {
		this.messager.sendAll(this.clients, message);
	}

	sendMessage(client: ClientType, message: string) {
		this.messager.sendMessage(client, message);
	}
}

export default SelectDriverRoom;
