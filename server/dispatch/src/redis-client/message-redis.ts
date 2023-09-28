import { createClient, type RedisClientType } from 'redis';

let publishMessageRedisClient: RedisClientType;
let subscribeMessageRedisClient: RedisClientType;

(async () => {
	publishMessageRedisClient = createClient({
		url: process.env.MESSAGE_QUEUE_REDIS_URL,
		socket: {
			tls: false,
			timeout: 20000,
		},
	});
	publishMessageRedisClient.on('connect', () => {
		console.info('message publish client: connected');
	});
	publishMessageRedisClient.on('error', (err) => {
		console.error('message publish client: ', err);
		throw new Error(err.message);
	});
	await publishMessageRedisClient.connect();
	subscribeMessageRedisClient = publishMessageRedisClient
		.duplicate()
		.on('error', (err) => {
			console.error('Subscriber Redis Client: ', err);
			throw new Error(err.message);
		});
	await subscribeMessageRedisClient.connect();
	subscribeMessageRedisClient.on('message', () => {
		console.info('message received');
	});
})();

class RedisMessageController {
	async newMessageEvent({ event, data }: { event: any; data: any }) {
		console.info('newMessageEvent ', event);
		await publishMessageRedisClient
			?.PUBLISH(event, JSON.stringify(data))
			.catch((err) => console.info('saveMessageEvent: ', err));
	}

	async getMessageEvent(event: string) {
		console.info('getMessageEvent ', event);
		return await subscribeMessageRedisClient?.SUBSCRIBE(event, () => {
			console.info('getMessageEvent: ', event);
		});
	}
}

const messageRedis = new RedisMessageController();
messageRedis.getMessageEvent('new_order');
console.info('subscribed to new_order');
messageRedis.newMessageEvent({ event: 'new_order', data: 'hello world' });
subscribeMessageRedisClient?.subscribe('new_order', () => {
	console.info('getMessageEvent: ', 'new_order');
});
export { messageRedis, publishMessageRedisClient, subscribeMessageRedisClient };
