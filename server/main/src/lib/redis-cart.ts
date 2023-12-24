import { type RedisClientType, createClient } from 'redis';

let redis: RedisClientType | null = null;

export const initializeRedis = () => {
	console.log('Init Redis Transfer Cart');
	redis = createClient({
		socket: {
			host: process.env.REDIS_TRANSFER_CART,
			port: Number(process.env.REDIS_TRANSFER_CART_PORT),
		},
		password: process.env.REDIS_TRANSFER_CART_PASSWORD,
	});
	redis.on('error', (error: any) => {
		console.error('Redis Error', error);
		throw new Error(error.message);
	});
	redis.on('node error', (error: any) => {
		console.error('Redis Node Error', error);
		throw new Error(error.message);
	});
};

export const setCache = async (key, value) => {
	await redis.set(key, value);
};

export const setCacheEx = async (key, expire, value) => {
	await redis.setEx(key, expire, value);
};

export const getCache = async (key) => {
	return await redis.get(key);
};

export const deleteKey = async (key) => {
	return await redis.del(key);
};
