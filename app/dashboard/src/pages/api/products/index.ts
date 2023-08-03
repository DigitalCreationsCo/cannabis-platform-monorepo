import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { ExtendRequest } from 'middleware';
// import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { getSession } from '../../../session';

const cache = new NodeCache({ stdTTL: 20 });
const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// get products from an organization
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59',
		);
		const user = (await getSession({ req, res }))?.user;
		const organizationId = user?.memberships?.[0]?.organizationId;
		if (cache.has(`products/org/${organizationId}`)) {
			const products = cache.get(`products/org/${organizationId}`);
			return res.status(200).json(products);
		}
		const { data } = await axios(
			urlBuilder.main.productsByOrgId(organizationId),
		);
		cache.set(`products/org/${organizationId}`, data);
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error('/products GET error: ', error.message);
		return res.json(error);
	}
});

// search products
handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
	try {
		const user = (await getSession({ req, res }))?.user;
		const organizationId = user?.memberships?.[0]?.organizationId;
		req.organizationId = organizationId;
		const { search } = req.body;
		if (search) {
			const { data } = await axios.post(urlBuilder.main.products(), {
				search,
				organizationId,
			});
			return res.status(res.statusCode).json(data);
		}
		return res.status(200).json([]);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

export default handler;
