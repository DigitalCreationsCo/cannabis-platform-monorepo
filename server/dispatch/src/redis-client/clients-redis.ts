import { isEmpty } from '@cd/core-lib';
import { createClient } from 'redis';
import { type ClientType } from '../dispatch.types';

const connectClientRedis = createClient({
	url: process.env.DISPATCH_CONNECT_REDIS_URL,
});
connectClientRedis.on('error', (err) => {
	console.error('connectClientRedis: ', err);
	throw new Error(err.message);
});
connectClientRedis.connect();

class RedisConnectClientController {
	async saveClient(client: ClientType) {
		await connectClientRedis
			.HSET(client.id, { ...client })
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
		console.info('saveClient: ', client);
	}

	async getClientsByIds(idList: { id: string }[]) {
		let clients: ClientType[] = [];
		let id;
		for (id of idList) {
			await connectClientRedis
				.HGETALL(id.id)
				.then((client) => clients.push(client as unknown as ClientType))
				.catch((err) => console.error('getSocketsByDriverIds: ', err));
		}
		clients = clients.filter((client) => !isEmpty(client));
		return clients;
	}

	async deleteClientBySocketId(socketId: string) {
		console.info('deleteClientBySocketId: ', socketId);
	}
}

const connectClientController = new RedisConnectClientController();
export { connectClientController };
