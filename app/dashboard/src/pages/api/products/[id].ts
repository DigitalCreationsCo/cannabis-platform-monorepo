import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
// import { authMiddleware, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// handler.use(authMiddleware).use(healthCheckMiddleware);
// get a single product
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59',
		);
		const { id } = req.query;
		const { data } = await axios(urlBuilder.main.productById(id));
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

// handler.use(adminMiddleware);
// handler.use(editorMiddleware);

export default handler;
