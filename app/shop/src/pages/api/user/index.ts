import { urlBuilder, axios } from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';

Supertokens.init(backendConfig());

// create a user record
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

		const user: UserCreateType = req.body;
		const response = await axios.post(urlBuilder.main.user(), user, {
			headers: { ...req.headers },
		});
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('api create user: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

// update a user record
handler.put(async (req: any, res: any) => {
	try {
		await NextCors(req, res, {
			methods: ['PUT'],
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

		const updateUser: UserCreateType = req.body;
		const response = await axios.put(urlBuilder.main.user(), updateUser, {
			headers: { ...req.headers },
		});
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('api update user', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
