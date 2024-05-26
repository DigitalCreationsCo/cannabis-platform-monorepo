/* eslint-disable @typescript-eslint/naming-convention */
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { axios, throwIfNotAllowed } from '@cd/core-lib';
import { type DailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = req;

	try {
		switch (method) {
			case 'GET':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST');
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

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');

	const token = Buffer.from(
		`${process.env.NEXT_PUBLIC_SLICKTEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SLICKTEXT_PRIVATE_KEY}`,
	).toString('base64');

	await axios.post(
		'https://api.slicktext.com/v1/messages/',
		{
			action: 'SEND',
			// FINISH REQUEST BODY
			// FINISH REQUEST BODY
			// FINISH REQUEST BODY
			// FINISH REQUEST BODY
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		},
	);

	recordMetric('dispensary.dailyDeal.sent');

	res.status(200).json({ success: true });
};
