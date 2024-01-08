import { axios, urlBuilder } from '@cd/core-lib';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../../config/backendConfig';

Supertokens.init(backendConfig());

// get a single user details
const handler = nc();
handler.get(async (req: any, res: any) => {
	try {
		await NextCors(req, res, {
			methods: ['GET'],
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

		res.setHeader('Cache-Control', 'public, s-maxage=60');
		const { id } = req.query;
		const response = await axios(urlBuilder.main.userById(id), {
			headers: { ...req.headers },
		});
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('api get user: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
