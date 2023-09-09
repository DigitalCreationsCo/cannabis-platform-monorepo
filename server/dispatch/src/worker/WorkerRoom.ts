import { type Client } from '../dispatch.types';

export type RoomType = {
	id: string;
	clients: Client[];
};

export default class WorkerRoom {
	id;
	clients: Client[];
	constructor(id: string, client: Client) {
		this.id = id;
		this.clients = [client];
	}
}
