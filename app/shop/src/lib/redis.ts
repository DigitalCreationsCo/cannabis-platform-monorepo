import { createClient } from 'redis';

let redisCheckout: any;
(async () => {
	redisCheckout = createClient({
		url: process.env.SHOP_CHECKOUT_REDIS_URL,
	}).on('error', (error) => {
		throw new Error(error.message);
	});
	await redisCheckout.connect();
})();

export default redisCheckout;
