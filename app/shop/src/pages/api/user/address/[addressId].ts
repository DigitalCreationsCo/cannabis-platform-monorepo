import { axios, urlBuilder } from '@cd/core-lib';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../../config/backendConfig';

Supertokens.init(backendConfig());

// delete address from user
const handler = nc();
handler.delete(async (req: any, res: any) => {
	try {
		await NextCors(req, res, {
			methods: ['DELETE'],
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

		const { id, addressId } = req.query;
		const response = await axios.delete(
			urlBuilder.main.addressByIdAndUser(addressId, id),
			{
				headers: { ...req.headers },
			},
		);
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('api delete address: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
