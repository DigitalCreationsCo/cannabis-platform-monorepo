import { isEmpty } from '@cd/core-lib';
import { type Client } from '@cd/core-lib/src/types/dispatch.types';
import { createClient } from 'redis';

const redisDispatchClients = createClient({
	socket: {
		host: process.env.REDIS_DISPATCH_CLIENTS,
		port: Number(process.env.REDIS_DISPATCH_CLIENTS_PORT),
	},
	password: process.env.REDIS_DISPATCH_CLIENTS_PASSWORD,
});
redisDispatchClients.on('connect', () => {
	console.info('redisDispatchClients connected');
});
redisDispatchClients.on('error', (err) => {
	throw new Error(err.message);
});
redisDispatchClients.connect();

class RedisDispatchClientsController {
	async saveClient(client: Client) {
		await redisDispatchClients
			.SET(client.phone, JSON.stringify({ ...client }))
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
		console.info('saved client to redis: ', client);
	}

	async getManyClientsByPhone(idList: { phone: string }[]) {
		let clients: Client[] = [];
		let id;
		for (id of idList) {
			await redisDispatchClients
				.GET(id.phone)
				.then((client) => clients.push(client as unknown as Client))
				.catch((err) => console.error('getManyClientsByPhone: ', err));
		}
		clients = clients.filter((client) => !isEmpty(client));
		return clients;
	}

	async getOneClientByPhone(phone: string): Promise<Client> {
		return await redisDispatchClients
			.GET(phone)
			.then((client) => client && JSON.parse(client))
			.catch((err) => console.error('getClientByPhone: ', err));
	}

	async removeRoomFromClient(client: Client) {
		return redisDispatchClients
			.SET(client.phone, JSON.stringify({ ...client, roomId: '', orderId: '' }))
			.catch((err) => console.info('removeRoomFromClient: ', err));
	}

	async deleteClient(client: Client) {
		await redisDispatchClients
			.DEL(client.phone)
			.catch((err) => console.info('deleteClient: ', err));
	}
}

const redisDispatchClientsController = new RedisDispatchClientsController();
export { redisDispatchClientsController };
