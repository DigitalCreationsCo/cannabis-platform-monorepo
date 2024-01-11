import { axios, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
// create stripe customer account
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const response = await axios.post(
			urlBuilder.payment.createCustomer(),
			req.body,
		);

		if (response.status == 404) throw new Error('Stripe account is not found.');

		if (response.status === 201) {
			console.info('201 response');
			console.info('response.data: ', response.data);
			return res.status(response.status).json(response.data);
		}
	} catch (error: any) {
		console.error('api/stripe/create-customer: ', error.message);
		throw new Error(error.message);
	}
});

export default handler;
