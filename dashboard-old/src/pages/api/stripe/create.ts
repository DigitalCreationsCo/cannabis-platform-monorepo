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

// create stripe account, connect to dispensary
const handler = nc();
handler.post(async (req: any, res: any) => {
	try {
		const jwt = await createAnonymousJWT({});
		req.headers['authorization'] = `Bearer ${jwt}`;

		await NextCors(req, res, {
			methods: ['POST'],
			origin: process.env.NEXT_PUBLIC_DASHBOARD_APP_URL,
			// credentials: true,
			allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
		});

		await superTokensNextWrapper(
			async (next) => {
				const session = await verifySession({ sessionRequired: false })(
					req,
					res,
					next,
				);
				console.info('session: ', session);
				return session;
			},
			req,
			res,
		);

		console.info('check');

		const response = await axios.post(
			urlBuilder.payment.createStripeDispensaryAccount(),
			req.body,
			// { headers: { ...req.headers } },
		);

		console.info('response: ', response.status, response.data);

		if (response.status == 401) throw new Error(response.data.error);

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
		console.error('POST api/stripe/create: ', error.message);
		// throw new Error(error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
