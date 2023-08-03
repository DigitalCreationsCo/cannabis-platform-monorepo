import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		console.info('checking for fresh session...');
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=10',
		);
		const { data } = await axios(urlBuilder.main.getSession(), {
			headers: {
				Cookie: req.headers.cookie,
			},
		});
		res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.info('next api session error: ', error.data.message);
		throw new Error(error);
	}
});

export default handler;
