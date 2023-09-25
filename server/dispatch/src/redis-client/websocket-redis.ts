import { createClient } from 'redis';

const websocketConnectClientRedis = createClient({
	url: process.env.SOCKET_PUBLISH_REDIS_URL,
	socket: {
		tls: false,
		timeout: 20000,
	},
});
websocketConnectClientRedis.on('connect', () => {
	console.info('socket publish client: connected');
});
websocketConnectClientRedis.on('error', (err) => {
	console.error('socket publish client: ', err);
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
