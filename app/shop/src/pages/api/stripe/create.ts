import { axios, urlBuilder } from '@cd/core-lib';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';

Supertokens.init(backendConfig());

// create stripe account, connect to dispensary
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

		const response = await axios.post(
			urlBuilder.payment.createStripe(),
			req.body,
			{
				headers: { ...req.headers },
			},
		);

		if (response.status == 404) throw new Error('Stripe account is not found.');

		if (response.status === 302) {
			console.info('302 redirect response');
			return res.status(response.status).json(response.data);
		}

		if (response.status === 201) {
			console.info('201 response');
			return res.status(response.status).json(response.data);
		}

		if (response.status === 200) {
			console.info('200 response');
			return res.status(response.status).json(response.data);
		}
	} catch (error: any) {
		console.error('api create stripe account: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
