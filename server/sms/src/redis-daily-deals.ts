import { createClient } from 'redis';

const redisDailyDeals = createClient({
	socket: {
		host: process.env.REDIS_DAILY_DEALS,
		port: Number(process.env.REDIS_DAILY_DEALS_PORT),
	},
	password: process.env.REDIS_DAILY_DEALS_PASSWORD,
});
redisDailyDeals.on('connect', () => {
	console.info('redisDispatchRooms connected');
});
redisDailyDeals.on('error', (err) => {
	throw new Error(err.message);
});
redisDailyDeals.connect();

export { redisDailyDeals };
