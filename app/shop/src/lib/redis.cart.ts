import { createCluster, type RedisClusterType } from 'redis';

let redisCheckoutClient: RedisClusterType;
try {
	redisCheckoutClient = createCluster({
		rootNodes: [
			{
				url: 'redis://localhost:6301',
			},
			{
				url: 'redis://localhost:6302',
			},
			{
				url: 'redis://localhost:6303',
			},
		],
	}) as RedisClusterType;
	redisCheckoutClient.on('error', (error) => {
		throw new Error(error.message);
	});
	redisCheckoutClient.connect();
	console.info('redis checkout cluster created.');
} catch (error: any) {
	console.error('redisCheckout: ', error.message);
	throw new Error(error.message);
}

class RedisShopController {
	async setCartToken(key: string, token: string, expire: number) {
		try {
			let timeoutId;
			const timeoutPromise = new Promise((_, reject) => {
				timeoutId = setTimeout(() => {
					reject(new Error('Request timed out'));
				}, 4000);
			});
			await Promise.race([
				await redisCheckoutClient.set(key, token, { EX: expire }),
				timeoutPromise,
			]);
			console.info('redisShopController.setCartToken: ', key, token, expire);
			clearTimeout(timeoutId);
		} catch (error) {
			console.error('redisShopController.setCartToken: ', error.message);
			throw new Error(error.message);
		}
	}

	async getCartToken(key: string) {
		try {
			return await redisCheckoutClient.get(key);
			// const tokenCipher =
			// return tokenCipher ? crypto.decrypt(tokenCipher) : null;
		} catch (error) {
			console.error('redisShopController.getCartToken: ', error.message);
			throw new Error(error.message);
		}
	}
}
console.info('redisShopController instance created.');

const redisShopController = new RedisShopController();
export { redisShopController };
