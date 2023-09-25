import { urlBuilder } from '@cd/core-lib';
import { type AddressCreateType } from '@cd/data-access';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// add address to user
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const address: AddressCreateType = req.body;
		console.info('address: ', address);
		const response = await axios.post(urlBuilder.main.address(), address, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.error(error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
