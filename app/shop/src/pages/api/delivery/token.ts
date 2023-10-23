/* eslint-disable sonarjs/no-duplicate-string */
import { crypto, urlBuilder } from '@cd/core-lib';
import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';
import { redisShopController } from '../../../lib/redis-cart';

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
		// this redis get will not timeout if the client is not connected
		// handle the timeout from the requesting client, before navigating here
		await redisShopController.setCartToken(key, token, expire1Day);
		console.debug(`cached key ${key} successfully.`);

		return res.status(302).json({
			success: 'true',
			redirect: `${urlBuilder.shop}/quick-delivery?cart=${key}`,
		});
	} catch (error: any) {
		console.info('api quick-delivery token: ', error.message);
		// throw new Error(error.message);
		return res.status(500).json({
			success: 'false',
			error,
		});
	}
});

export default handler;
