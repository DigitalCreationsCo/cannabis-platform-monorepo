/* eslint-disable sonarjs/no-duplicate-string */
import { crypto, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';
import redisCheckout from '../../../lib/redis';

const handler = nc();
handler.options((req, res) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		req.headers.origin || 'localhost',
	);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'PUT, POST, GET, DELETE, PATCH, OPTIONS',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
	);
	res.end();
});

// the way is to use this page as proxy to set the cookie on client
// maaaybe use getServerSideProps on quick-delivery page to handle this route, and pass the cookie there to client side. :P

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = req.body.token;

		// check the origin is included in approved list
		res.setHeader(
			'Access-Control-Allow-Origin',
			req.headers.origin || 'localhost',
		);
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'POST');

		if (!token)
			return res
				.status(400)
				.send({ success: 'false', error: 'No token provided' });

		const key = crypto.createMD5Hash(token);
		const expire1Day = 60 * 60 * 24;
		redisCheckout.set(key, token, { EX: expire1Day });
		console.debug(`cached key ${key} successfully.`);

		return res.status(302).json({
			success: 'true',
			redirect: `${urlBuilder.shop}/quick-delivery?cart=${key}`,
		});
	} catch (error: any) {
		console.info('next api checkout-session error: ', error.message);
		throw new Error(error.message);
	}
});

export default handler;
