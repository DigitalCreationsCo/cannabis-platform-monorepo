import { EventEmitter } from 'events';
import { type Client, type RoomType } from '../dispatch.types';
import {
	connectClientController,
	dispatchRoomController,
} from '../redis-client';

export default class WorkerRoom extends EventEmitter implements RoomType {
	id;
	clients: Client[];
	isClosed = false;
	constructor(id: string, clients: Client[]) {
		super();
		this.id = id;
		this.clients = [...clients];
	}
	async close() {
		this.removeAllListeners();
		this.clients.forEach(async (client) => {
			await connectClientController.removeRoomFromClient(client);
		});
		this.isClosed = true;
		await dispatchRoomController.deleteRoom(this.id);
	}
}
