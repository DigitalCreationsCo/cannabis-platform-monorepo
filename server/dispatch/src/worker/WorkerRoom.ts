import { EventEmitter } from 'events';
import { type Client } from '../dispatch.types';

export type RoomType = {
	id: string;
	clients: Client[];
};

export default class WorkerRoom extends EventEmitter {
	id;
	clients: Client[];
	constructor(id: string, client: Client) {
		super();

		this.id = id;
		this.clients = [client];
	}
}
