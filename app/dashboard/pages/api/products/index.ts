/* eslint-disable sonarjs/no-small-switch */

import {
	type Price,
	type Service,
	getAllPrices,
	getAllServices,
} from '@cd/data-access';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { getSession } from '@/lib/session';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case 'GET':
				await handleGET(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET');
				res.status(405).json({
					error: { message: `Method ${req.method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({ error: { message } });
	}
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res);
	if (!session?.user?.id) {
		throw Error('Could not get user');
	}
	const client = await clientPromise;

	const [products, prices] = await Promise.all<
		[Promise<Service[]>, Promise<Price[]>]
	>([getAllServices({ client }), getAllPrices({ client })]);

	const productsWithPrices = products.map((product: any) => {
		product.prices = prices.filter((price) => price.serviceId === product.id);
		return product;
	});

	res.json({
		data: {
			products: productsWithPrices,
		},
	});
};
