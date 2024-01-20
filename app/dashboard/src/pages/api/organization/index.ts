import { urlBuilder, axios } from '@cd/core-lib';
import { type OrganizationCreateType } from '@cd/data-access';
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

// create organization, create location record, create stripe account
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

		const organization: OrganizationCreateType = req.body;
		const response = await axios.post(
			urlBuilder.main.organization(),
			organization,
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
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

// update organization prisma record, update mongodb location record
handler.put(async (req: any, res: any) => {
	try {
		const jwt = await createAnonymousJWT({});
		req.headers['authorization'] = `Bearer ${jwt}`;

		await NextCors(req, res, {
			methods: ['PUT'],
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

		const formData: OrganizationCreateType = req.body;
		const response = await axios.put(urlBuilder.main.organization(), formData, {
			headers: {
				'Content-Type': 'application/json',
				...req.headers,
			},
		});
		if (response.data.success == 'false') throw new Error(response.data.error);
		return res.status(response.status).json({
			success: 'true',
			payload: response.data.payload,
		});
	} catch (error: any) {
		console.error(error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
