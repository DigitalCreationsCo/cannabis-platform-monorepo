/* eslint-disable @typescript-eslint/naming-convention */
import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';
import { CronJobApi, axios, throwIfNotAllowed } from '@cd/core-lib';
import { deleteDispensaryDailyDeal, getDailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { sendEvent } from '@/lib/svix';

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
			case 'DELETE':
				await handleDELETE(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, DELETE');
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
	const client = await clientPromise;
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');

	const { id } = req.query as { id: string };
	const dailyDeal = await getDailyDeal({
		client,
		where: { slug: teamMember.team.slug, id },
	});

	recordMetric('dispensary.dailyDeal.fetched');

	res.status(200).json({ data: dailyDeal });
};

// Delete dailyDeal
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_daily_deals', 'delete');
	const client = await clientPromise;

	const { id } = req.query as { id: string };

	const dailyDealRemoved = await deleteDispensaryDailyDeal({
		client,
		where: { id },
	});

	if (dailyDealRemoved.doesRepeat && dailyDealRemoved.jobId) {
		await CronJobApi.deleteDailyDealJob(dailyDealRemoved.jobId);
	}

	await sendEvent(teamMember.teamId, 'dispensary.dailyDeal.removed', {
		...dailyDealRemoved,
	});

	sendAudit({
		action: 'team.daily_deals.delete',
		crud: 'd',
		user: teamMember,
		team: teamMember.team,
	});

	recordMetric('dispensary.dailyDeal.removed');

	res.status(200).json({ data: {} });
};
