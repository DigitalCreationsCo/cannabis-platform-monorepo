import { createClient } from 'redis';
import { type ClientType } from '../dispatch.types';

const connectClientRedis = createClient({
	url: process.env.DISPATCH_CONNECT_REDIS_URL,
});
connectClientRedis.on('error', (err) => {
	console.error('Driver Connect Client: ', err);
	throw new Error(err.message);
});
connectClientRedis.connect();

class RedisConnectClientController {
	async saveClient(client: ClientType) {
		await connectClientRedis
			.HSET(client.userId, { ...client })
			.catch((error: any) => {
				console.error('saveClient: ', error);
			});
	}
	async getClientsByIds(idList: { id: string }[]) {
		const sockets: string[] = [];
		let id;
		for (id of driverIdList) {
			const { driverId } = id;
			await connectClientRedis
				.HGETALL(driverId)
				.then((socket) => socket.id)
				.then(sockets.push)
				.catch((err) => console.error('getSocketsByDriverIds: ', err));
		}
		return sockets;
	}
}

const connectClientController = new RedisConnectClientController();
export { connectClientController };
