import { createClient, type RedisClientType } from 'redis';

const redisSMSQueue: RedisClientType = createClient({
	socket: {
		host: process.env.REDIS_SMS_QUEUE,
		port: Number(process.env.REDIS_SMS_QUEUE_PORT),
	},
	password: process.env.REDIS_SMS_QUEUE_PASSWORD,
});
redisSMSQueue.on('connect', () => {
	console.info('redisSMSQueue connected');
});
redisSMSQueue.on('error', (err) => {
	throw new Error(err.message);
});
redisSMSQueue.connect();

const subscribeSMSQueue = redisSMSQueue.duplicate().on('error', (err) => {
	throw new Error(err.message);
});

// class RedisMessageController {
// 	async newMessageEvent({ event, data }: { event: any; data: any }) {
// 		console.info('newMessageEvent ', event);
// 		await redisSMSQueue
// 			?.PUBLISH(event, JSON.stringify(data))
// 			.catch((err) => console.info('saveMessageEvent: ', err));
// 	}

// 	async getMessageEvent(event: string) {
// 		console.info('getMessageEvent ', event);
// 		return await subscribeMessageRedisClient?.SUBSCRIBE(event, () => {
// 			console.info('getMessageEvent: ', event);
// 		});
// 	}
// }

export { redisSMSQueue, subscribeSMSQueue };
