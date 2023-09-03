import { urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// create stripe checkout
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const checkoutOrder = req.body;

		const response = await axios.post(
			urlBuilder.payment.checkout(),
			checkoutOrder,
			{ timeout: 10000 },
		);

		console.log('response: ', response.data);
		return res.status(response.status).json(response.data);
	} catch (error: any) {
		console.info('next api checkout-session error: ', error.message);
		throw new Error(error.message);
	}
});

export default handler;
