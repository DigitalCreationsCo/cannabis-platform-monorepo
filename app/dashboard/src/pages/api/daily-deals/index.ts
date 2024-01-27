import { axios, urlBuilder } from '@cd/core-lib';
import { type DailyDeal } from '@cd/data-access';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import NodeCache from 'node-cache';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import {
	backendConfig,
	createAnonymousJWT,
} from '../../../config/backendConfig';

Supertokens.init(backendConfig());

const cache = new NodeCache({ stdTTL: 30 });

// get daily deals
const handler = nc();
handler.get(async (req: any, res: any) => {
	try {
		const jwt = await createAnonymousJWT({});
		req.headers['authorization'] = `Bearer ${jwt}`;
		console.info('jwt: ', jwt);

		await NextCors(req, res, {
			methods: ['GET'],
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
		res.setHeader('Cache-Control', 'public, s-maxage=120');
		const organizationId = req.headers['organization-id'] as string;

		// const { id } = req.query;
		// if (cache.has(`organization/${id}`)) {
		// 	const org = cache.get(`organization/${id}`);
		// 	return res.status(200).json({
		// 		success: 'true',
		// 		payload: org,
		// 	});
		// } else {
		const response = await axios(
			urlBuilder.sms.dailyDealsByOrganization(organizationId),
			{
				headers: { ...req.headers },
			},
		);
		console.info('response: ', response.data);
		if (response.data.success == 'false') throw new Error(response.data.error);

		// cache.set(`organization/${id}`, response.data.payload);
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('GET api/daily-deals: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

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

		const DailyDeal: DailyDeal = req.body;

		const response = await axios.post(
			urlBuilder.sms.dailyDeal(),
			DailyDeal,
			{
				headers: {
					'Content-Type': 'application/json',
					...req.headers,
				},
			},
		);
		if (response.data.success == 'false') throw new Error(response.data.error);
		return res.status(response.status).json({
			success: 'true',
			payload: response.data.payload,
		});
	} catch (error: any) {
		console.error('POST api/daily-deals: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
