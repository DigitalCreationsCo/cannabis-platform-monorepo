/* eslint-disable @typescript-eslint/no-unused-vars */
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { getDispensariesByZipcode, dispensaries } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;
	try {
		switch (method) {
			case 'GET':
				await handleGET(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET');
				res.status(405).json({
					error: { message: `Method ${method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({ error: { message } });
	}
}

// get dispensaries by zipcode
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { zipcode, radius, limit } = req.query as {
		zipcode: string;
		radius: string;
		limit: string;
	};
	const clientToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;

	if (clientToken !== token) {
		throw new Error('Unauthorized');
	}

	const client = await clientPromise;
	const _dispensaries = await getDispensariesByZipcode({
		client,
		zipcode,
		limit,
		radius,
	});
	recordMetric('dispensaries.fetched');

	res.status(200).json({ data: dispensaries });
};
