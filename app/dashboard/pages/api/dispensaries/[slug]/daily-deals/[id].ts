/* eslint-disable @typescript-eslint/naming-convention */
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { throwIfNotAllowed } from '@cd/core-lib';
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

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');

	// const dailyDeals = await getDispensaryDailyDeals(teamMember.team.slug);

	const dailyDeals: DailyDeal[] = [];

	recordMetric('dispensary.dailyDeal.fetched');

	res.status(200).json({ data: dailyDeals });
};
