/* eslint-disable sonarjs/no-duplicate-string */
import { crypto, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { createClient } from 'redis';

export default async function saveToken(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'OPTIONS') {
		res.setHeader(
			'Access-Control-Allow-Origin',
			req.headers.origin || 'localhost',
		);
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader(
			'Access-Control-Allow-Methods',
			'PUT, POST, GET, DELETE, PATCH, OPTIONS',
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
		);
		res.end();
	}

	if (req.method === 'POST') {
		try {
			res.setHeader(
				'Access-Control-Allow-Origin',
				req.headers.origin || 'localhost',
			);
			res.setHeader('Access-Control-Allow-Credentials', 'true');
			res.setHeader('Access-Control-Allow-Methods', 'POST');

			const token = req.body.token;
			if (!token)
				return res
					.status(400)
					.send({ success: 'false', error: 'No token provided' });

			const key = crypto.createMD5Hash(token);
			const expire1Day = 60 * 60 * 24;

			const redis = createClient({
				socket: {
					host: process.env.REDIS_HOST,
					port: Number(process.env.REDIS_PORT),
				},
				password: process.env.REDIS_PASSWORD,
			});
			redis.on('error', (error: any) => {
				console.error('Redis Error', error);
				throw new Error(error.message);
			});
			redis.on('node error', (error: any) => {
				console.error('Redis Node Error', error);
				throw new Error(error.message);
			});

			redis.connect();
			await redis.setEx(key, expire1Day, token);
			redis.disconnect();

			return res.status(302).json({
				success: 'true',
				redirect: `${urlBuilder.shop}/quick-delivery?cart=${key}`,
			});
		} catch (error: any) {
			console.info('api quick-delivery token: ', error.message);
			// throw new Error(error.message);
			return res.status(500).json({
				success: 'false',
				error,
			});
		}
	}
}
