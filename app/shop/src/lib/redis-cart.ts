import { createCluster, type RedisClusterType } from 'redis';

let redisClient: RedisClusterType | null = null;
// [
// 	{ url: 'redis://localhost:6301' },
// 	{ url: 'redis://localhost:6302' },
// 	{ url: 'redis://localhost:6303' },
// 	{ url: 'redis://localhost:6304' },
// 	{ url: 'redis://localhost:6305' },
// 	{ url: 'redis://localhost:6306' },
// ];
try {
	if (!redisClient) {
		// process.env.NODE_ENV === 'development' &&
		// 	source('./scripts/get-redis-cart-nodes.sh', function (err: any) {
		// 		if (err) return console.error(err);
		// 		console.info('REDIS NODES: ', process.env.REDIS_NODES);
		// 	});
		const rootNodes = process?.env?.REDIS_NODES?.split(' ').map(
			(node, index) => ({
				// url: `redis://${node}:630${index + 1}`,
				url: `redis://0.0.0.0:630${index + 1}`,
			}),
		) as any;
		console.info('nodes: ', rootNodes);
		redisClient = createCluster({
			rootNodes: rootNodes,
		});
		redisClient.on('error', (error) => {
			throw new Error(error.message);
		});
		redisClient.connect().then(() => {
			console.info('redis checkout cluster created.');
			console.info('redis client connected: ', redisClient);
		});
	}
} catch (error: any) {
	console.error('redisCheckout: ', error.message);
	throw new Error(error.message);
}

class RedisShopController {
	// redisClient: RedisClusterType;
	// constructor(redisClient: RedisClusterType) {
	// 	if (!redisClient) throw new Error('Redis client is required.');
	// 	this.redisClient = redisClient;
	// }
	async setCartToken(key: string, token: string, expire: number) {
		// console.info('redisClient setCartToken', this.redisClient);
		// console.info('set cart token: ', key, token, expire);
		try {
			// let timeoutId;
			// const timeoutPromise = new Promise((_, reject) => {
			// 	timeoutId = setTimeout(() => {
			// 		reject(new Error('Request timed out'));
			// 	}, 4000);
			// });
			// Promise.race([
			await redisClient?.set(key, token, { EX: expire });
			// 	timeoutPromise,
			// ]).then(() => {
			// 	console.info('redisShopController.setCartToken: ', key, token, expire);
			// });

			// clearTimeout(timeoutId);
		} catch (error) {
			console.error('redisShopController.setCartToken: ', error.message);
			throw new Error(error.message);
		}
	}

	async getCartToken(key: string) {
		try {
			console.info('get cart token: ', key);
			console.info('redis client: ', redisClient);
			return await redisClient?.get(key);
		} catch (error) {
			console.error('redisShopController.getCartToken: ', error.message);
			throw new Error(error.message);
		}
	}

	// async decryptCartToken(tokenCipher: string) {
	// 	return tokenCipher ? crypto.decrypt(tokenCipher) : null;
	// }
}

// const redisShopController = new RedisShopController(redisClient);
const redisShopController = new RedisShopController();
export { redisShopController };
