import { createClient } from 'redis';

export const getRedis = async (redisUrl: string) => {
	const client = createClient({ url: redisUrl });
	client.connect();
	return client;
};
