import { type NextApiRequest, type NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();
handler.options((req, res) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://checkout.releaf-shop.com',
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

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const cartToken = req.body;

		console.log('req.cookies ', req.cookies);

		res.setHeader(
			'Access-Control-Allow-Origin',
			'https://checkout.releaf-shop.com',
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
		// res.setHeader('set-cookie', `gras-cart-token=${cartToken}; path=/;`);
		// console.log('cartToken ', cartToken);
		// cookies().set({ name: 'gras-cart-token', value: cartToken });
		// console.log('cookies: ', cookies);
		// res.setHeader('cookie', `cartToken=${cartToken}; path=/;`);
		return res.status(200).json({
			success: 'true',
		});
		// return res.redirect(302, urlBuilder.shop + '/quick-delivery');
	} catch (error: any) {
		console.info('next api checkout-session error: ', error.message);
		throw new Error(error.message);
	}
});

export default handler;
