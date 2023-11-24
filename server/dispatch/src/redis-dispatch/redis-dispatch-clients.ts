import { isEmpty } from '@cd/core-lib';
import {
	type Client,
	type ClientType,
} from '@cd/core-lib/src/types/dispatch.types';
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
	async saveClient(client: ClientType) {
		await redisDispatchClients
			.SET(client.phone, JSON.stringify({ ...client }))
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
	}

	async getManyClientsByPhone(idList: { phone: string }[]) {
		let clients: ClientType[] = [];
		let id;
		for (id of idList) {
			await redisDispatchClients
				.GET(id.phone)
				.then((client) => clients.push(client as unknown as ClientType))
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

	async removeRoomFromClient(client: ClientType) {
		return redisDispatchClients
			.SET(client.phone, JSON.stringify({ ...client, roomId: '', orderId: '' }))
			.catch((err) => console.info('removeRoomFromClient: ', err));
	}

	async deleteClient(client: ClientType) {
		await redisDispatchClients
			.DEL(client.phone)
			.catch((err) => console.info('deleteClient: ', err));
	}
}

const redisDispatchClientsController = new RedisDispatchClientsController();
export { redisDispatchClientsController };
