import { axios, urlBuilder } from '@cd/core-lib';
import { type AddressCreateType } from '@cd/data-access';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../../config/backendConfig';

Supertokens.init(backendConfig());

// add address to user
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

		const address: AddressCreateType = req.body;
		const response = await axios.post(urlBuilder.main.address(), address, {
			headers: { ...req.headers },
		});
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('api add address: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
