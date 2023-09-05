import { createClient } from 'redis';
import { type DriverClient } from '../../dispatch.types';

const redisPublishClientUrl = process.env.DISPATCH_PUBLISH_REDIS_URL;

const publishRedisClient = createClient({ url: redisPublishClientUrl }).on(
	'error',
	(err) => {
		console.error('Publisher Redis Client: ', err);
		throw new Error(err.message);
	},
);
publishRedisClient.connect();

const subscribeRedisClient = publishRedisClient
	.duplicate()
	.on('error', (err) => {
		console.error('Subscriber Redis Client: ', err);
		throw new Error(err.message);
	})
	.connect();

const redisDriverConnectClientUrl = process.env.DISPATCH_CONNECT_REDIS_URL;

const driverConnectClient = createClient({ url: redisDriverConnectClientUrl });
driverConnectClient.on('error', (err) => {
	console.error('Driver Connect Client: ', err);
	throw new Error(err.message);
});
driverConnectClient.connect();

class DriverClientController {
	async saveClient({ driverId, socketId, phone }: DriverClient) {
		await driverConnectClient
			.HSET(driverId, { driverId, socketId, phone })
			.catch((error: any) => {
				console.error('connect client redis: ', error);
			});
	}

	async getSocketsByDriverIds(driverIdList: { driverId: string }[]) {
		const sockets: string[] = [];

		let id;
		for (id of driverIdList) {
			const { driverId } = id;
			driverConnectClient
				.HGETALL(driverId)
				.then((socket) => socket.socketId)
				.then(sockets.push)
				.catch((err) => console.info('getSocketsByDriverIds: ', err));
		}
		return sockets;
	}
}

const connectClientController = new DriverClientController();
export { publishRedisClient, subscribeRedisClient, connectClientController };
