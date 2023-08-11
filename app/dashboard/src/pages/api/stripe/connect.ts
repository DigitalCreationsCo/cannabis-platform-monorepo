import { axios, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

// connect a Dispensary account to their existing stripe account
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const response = await axios.post(
			urlBuilder.payment.connectStripe(),
			req.body,
		);
		if (response.status === 404) throw new Error(response.data.error);
		if (response.data.success == 'false') throw new Error(response.data.error);
		if (response.status === 302) {
			return res.redirect(response.data.redirect);
		}
<<<<<<< HEAD
		return res.status(response.status).json(response.data);
=======
		return res.status(response.status).json({
			success: 'true',
			payload: response.data.payload,
		});
>>>>>>> 538ee1f09 (chore(dashboard): review Dispensary Stripe account code, api connect, server-payments account routes, account.controller, Stripe Service)
	} catch (error: any) {
		console.error('next api connect stripe account error: ', error.message);
		return res.json({
			success: 'false',
			error: error.message,
		});
	}
});

export default handler;
