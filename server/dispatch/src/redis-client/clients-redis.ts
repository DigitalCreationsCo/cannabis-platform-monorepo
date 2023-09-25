import { isEmpty } from '@cd/core-lib';
import { createClient } from 'redis';
import {
	type Client,
	type ClientType,
} from '../../../../packages/core-lib/src/types/dispatch.types';

const connectClientRedis = createClient({
	url: process.env.DISPATCH_CONNECT_REDIS_URL,
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

class RedisConnectClientController {
	async saveClient(client: ClientType) {
		console.log('saveClient input ', client);
		await connectClientRedis
			.SET(client.phone, JSON.stringify({ ...client }))
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
		console.info('saveClient: ', client);
	}

	async getManyClientsByPhone(idList: { phone: string }[]) {
		let clients: ClientType[] = [];
		let id;
		for (id of idList) {
			await connectClientRedis
				.GET(id.phone)
				.then((client) => clients.push(client as unknown as ClientType))
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

	async removeRoomFromClient(client: ClientType) {
		return connectClientRedis
			.SET(client.phone, JSON.stringify({ ...client, roomId: '', orderId: '' }))
			.catch((err) => console.info('removeRoomFromClient: ', err));
	}

	async deleteClient(client: ClientType) {
		await connectClientRedis
			.DEL(client.phone)
			.catch((err) => console.info('deleteClient: ', err));
	}
}

const connectClientController = new RedisConnectClientController();
export { connectClientController };
