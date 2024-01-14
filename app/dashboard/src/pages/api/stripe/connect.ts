import { axios, urlBuilder } from '@cd/core-lib';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import {
	backendConfig,
	createAnonymousJWT,
} from '../../../config/backendConfig';

Supertokens.init(backendConfig());

// connect a Dispensary account to their existing stripe account
const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		const jwt = await createAnonymousJWT({});
		req.headers['authorization'] = `Bearer ${jwt}`;

		await NextCors(req, res, {
			methods: ['POST'],
			origin: process.env.NEXT_PUBLIC_DASHBOARD_APP_URL,
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
			urlBuilder.payment.connectStripeDispensaryAccount(),
			req.body,
			{ headers: { ...req.headers } },
		);
		if (response.status === 404) throw new Error(response.data.error);
		if (response.data.success == 'false') throw new Error(response.data.error);
		if (response.status === 302) {
			return res.redirect(response.data.redirect);
		}
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('POST api/stripe/connect: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
