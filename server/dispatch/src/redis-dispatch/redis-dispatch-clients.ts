import { Client, isEmpty } from '@gras/core';
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
		console.debug(`RedisDispatchClientsController saveClient`, { client });
	}

	async mergeClient(client: Client) {
		const prevClient = await this.getOneClientByPhone(client.phone);

		const mergeClient = Object.entries(client)
			.filter(([key, value]) => value !== undefined)
			.reduce((client: any, [key, value]) => {
				client[key] = value;
				return client;
			}, prevClient);

		await redisDispatchClients
			.SET(client.phone, JSON.stringify({ ...mergeClient }))
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
		console.info('merged client to redis: ', mergeClient);
		return new Client({ ...mergeClient });
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
