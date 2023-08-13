import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59',
		);
		const response = await axios(urlBuilder.main.getSession(), {
			headers: {
				Cookie: req.headers.cookie,
			},
		});

		return res.status(response.status).json(response.data);
	} catch (error: any) {
		throw new Error(error.message);
	}
});

export default handler;
