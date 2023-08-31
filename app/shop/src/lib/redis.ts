import { createClient } from 'redis';

const redisCheckout = createClient({
	url: process.env.SHOP_CHECKOUT_REDIS_URL,
}).on('error', (error) => {
	throw new Error(error.message);
});

redisCheckout.connect();
export default redisCheckout;
