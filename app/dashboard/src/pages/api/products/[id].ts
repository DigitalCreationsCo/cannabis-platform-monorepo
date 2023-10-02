import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// get a single product
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader('Cache-Control', 'public, s-maxage=60');
		const { id } = req.query;
		const { data } = await axios(urlBuilder.main.productById(id));
		return res.status(res.statusCode).json(data);
	} catch (error: any) {
		console.error(error.message);
		return res.json(error);
	}
});

export default handler;
