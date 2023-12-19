import { createClient } from 'redis';

export const getRedis = (redisUrl: string) => createClient({ url: redisUrl });
