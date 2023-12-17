import { createClient } from 'redis';

const redisDispatchSockets = createClient({
	socket: {
		host: process.env.REDIS_DISPATCH_SOCKETS,
		port: Number(process.env.REDIS_DISPATCH_SOCKETS_PORT),
	},
	password: process.env.REDIS_DISPATCH_SOCKETS_PASSWORD,
});
redisDispatchSockets.on('connect', () => {
	console.info('redisDispatchSockets connected');
});
redisDispatchSockets.on('error', (err) => {
	throw new Error(err.message);
});
redisDispatchSockets.connect();

const subscribeDispatchSockets = redisDispatchSockets
	.duplicate()
	.on('error', (err) => {
		throw new Error(err.message);
	});

export { redisDispatchSockets, subscribeDispatchSockets };
