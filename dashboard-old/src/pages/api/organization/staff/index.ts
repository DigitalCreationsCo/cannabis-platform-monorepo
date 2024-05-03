/* eslint-disable sonarjs/no-duplicate-string */
import { applicationHeaders, axios, urlBuilder } from '@cd/core-lib';
import { type UserCreateType } from '@cd/data-access';
import nc from 'next-connect';
import NextCors from 'nextjs-cors';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import {
	backendConfig,
	createAnonymousJWT,
} from '../../../../config/backendConfig';

Supertokens.init(backendConfig());

// get users from an organization
const handler = nc();
handler.get(async (req: any, res: any) => {
	try {
		const jwt = await createAnonymousJWT({});
		req.headers['authorization'] = `Bearer ${jwt}`;

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

		// res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
		// const { user } = await getSession({ req, res });
		// const { organizationId } = user.memberships[0];
		// req.organizationId = organizationId;
		// if (cache.has(`users/org/${organizationId}`)) {
		//     const users = cache.get(`users/org/${organizationId}`);
		//     return res.status(200).json(users);
		// }
		// const { data } = await axios(urlBuilder.main.usersByOrg(organizationId));
		// cache.set(`users/org/${organizationId}`, data);
		// return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error('GET api/organization/staff: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

// create a user record
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

		const {
			user,
			dispensaryId,
			role,
		}: {
			user: UserCreateType;
			role: 'ADMIN' | 'OWNER';
			dispensaryId: string;
		} = req.body;

		const response = await axios.post(
			urlBuilder.main.staff(),
			{ user, role, dispensaryId },
			{
				headers: { ...applicationHeaders, ...req.headers },
			},
		);

		if (response.data.success === 'false') throw new Error(response.data.error);

		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error('POST api/organization/staff: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

// update a user record
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
		// const {user, dispensaryId, role}: {user: UserCreateType, role: "ADMIN" | "OWNER" | undefined, dispensaryId: string; } = req.body;
		// const response = await axios.put(urlBuilder.main.staff(), { user, role, dispensaryId }, {
		//     headers: {
		//         'Content-Type': 'application/json'
		//     }
		// });
		// return res.status(res.statusCode).json(response.data);
	} catch (error: any) {
		console.error('PUT api/organization/staff: ', error.message);
		return res.json({ success: 'false', error: error.message });
	}
});

export default handler;
