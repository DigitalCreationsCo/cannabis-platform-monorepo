import { crypto, urlBuilder } from '@cd/core-lib';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import { createClient } from 'redis';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';

Supertokens.init(backendConfig());

// get cart token from redis and redirect to quick-delivery page
const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		await NextCors(req, res, {
			methods: ['POST'],
			origin: process.env.NEXT_PUBLIC_SHOP_APP_URL,
			credentials: true,
			allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
		});

		await superTokensNextWrapper(
			async (next) => {
				return await verifySession()(req, res, next);
			},
			req,
			res,
		);

		const token = req.body.token;
		if (!token)
			return res
				.status(400)
				.send({ success: 'false', error: 'No token provided' });

		const key = crypto.createMD5Hash(token);
		const expire1Day = 60 * 60 * 24;

		const redis = createClient({
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
		redis.connect();

		await redis.setEx(key, expire1Day, token);
		redis.disconnect();

		return res.status(302).json({
			success: 'true',
			redirect: `${urlBuilder.shop}/quick-delivery?cart=${key}`,
		});
	} catch (error: any) {
		console.info('api quick-delivery: ', error.message);
		return res.status(500).json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
