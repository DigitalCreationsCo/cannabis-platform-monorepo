import { createClient } from 'redis';

const websocketConnectClientRedis = createClient({
	url: process.env.SOCKET_PUBLISH_REDIS_URL,
}).on('error', (err) => {
	console.error('Publisher Redis Client: ', err);
	throw new Error(err.message);
});
websocketConnectClientRedis.connect();

const subscribeWebsocketConnectClientRedis = websocketConnectClientRedis
	.duplicate()
	.on('error', (err) => {
		console.error('Subscriber Redis Client: ', err);
		throw new Error(err.message);
	});

export { websocketConnectClientRedis, subscribeWebsocketConnectClientRedis };
