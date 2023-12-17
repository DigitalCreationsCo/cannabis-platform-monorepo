import { isEmpty } from '@cd/core-lib';
import { type Client } from '@cd/core-lib/src/types/dispatch.types';
import { createClient } from 'redis';

// what is a 'client' in this case?
// its a object that represents an entity that is connected to the dispatch server to receive events
// contains the following properties:
// socketId?: string;
// id: string;
// phone: string;
// roomId?: string;
// orderId?: string;
// redisClientController is used to save, retrieve, and update clients from redis

const connectClientRedis = createClient({
	url: process.env.REDIS_DISPATCH_CLIENTS,
	socket: {
		tls: false,
		timeout: 20000,
	},
});
connectClientRedis.on('connect', () => {
	console.info('connectClientRedis: connected');
});
connectClientRedis.on('error', (err) => {
	console.error('connectClientRedis: ', err);
	throw new Error(err.message);
});
connectClientRedis.connect();

class RedisredisDispatchClientsController {
	async saveClient(client: Client) {
		console.log('saveClient input ', client);
		await connectClientRedis
			.SET(client.phone, JSON.stringify({ ...client }))
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
		console.info('saveClient: ', client);
	}

	async getManyClientsByPhone(idList: { phone: string }[]) {
		let clients: Client[] = [];
		let id;
		for (id of idList) {
			await connectClientRedis
				.GET(id.phone)
				.then((client) => clients.push(client as unknown as Client))
				.catch((err) => console.error('getSocketsByDriverIds: ', err));
		}
		clients = clients.filter((client) => !isEmpty(client));
		return clients;
	}

	async getOneClientByPhone(phone: string): Promise<Client> {
		return await connectClientRedis
			.GET(phone)
			.then((client) => client && JSON.parse(client))
			.catch((err) => console.error('getClientByPhone: ', err));
	}

	async removeRoomFromClient(client: Client) {
		return connectClientRedis
			.SET(client.phone, JSON.stringify({ ...client, roomId: '', orderId: '' }))
			.catch((err) => console.info('removeRoomFromClient: ', err));
	}

	async deleteClient(client: Client) {
		await connectClientRedis
			.DEL(client.phone)
			.catch((err) => console.info('deleteClient: ', err));
	}
}

const redisDispatchClientsController =
	new RedisredisDispatchClientsController();
export { redisDispatchClientsController };
