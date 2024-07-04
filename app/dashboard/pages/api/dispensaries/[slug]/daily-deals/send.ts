/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { throwIfNotAllowed } from '@cd/core-lib';
import freshsales from '@cd/core-lib/src/crm/freshsales';
import twilio from '@cd/core-lib/src/sms/twilio';
import { updateDispensaryDailyDeal, type DailyDeal } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	try {
		switch (method) {
			case 'POST':
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
	try {
		const teamMember = await throwIfNoDispensaryAccess(req, res);
		throwIfNotAllowed(teamMember, 'team_daily_deals', 'read');
		const client = await clientPromise;

		const {
			id,
			title,
			message,
			startTime,
			endTime,
			doesRepeat,
			schedule,
			timezone,
			teamSlug,
			campaign,
			weedTextSegmentId,
			sendCount,
			conversions,
		} = JSON.parse(req.body) as DailyDeal;

		if (!weedTextSegmentId) {
			throw new Error('WeedText segment ID is required');
		}

		const customers = await freshsales.getSegmentCustomers(weedTextSegmentId);

		const customerPhoneNumbers = customers
			.map((customer) => customer.mobile_number ?? customer.work_number ?? '')
			.filter(Boolean);
		// check the number format to suit twilio

		twilio.sendAll(customerPhoneNumbers, message);

		// const response = await Slicktext.sendToList({
		// 	textword: teamMember.team.slickTextTextwordId!,
		// 	segment: teamMember.team.slickTextSegmentId!,
		// 	message,
		// });

		recordMetric('dispensary.dailyDeal.sent');

		await updateDispensaryDailyDeal({
			client,
			data: {
				id,
				title,
				message,
				startTime,
				endTime,
				doesRepeat,
				schedule,
				timezone,
				teamSlug,
				sendCount,
				conversions,
				campaign,
				isActive: false,
				lastSentAt: Date.now().toString(),
			},
		});

		recordMetric('dispensary.dailyDeal.updated');

		return res.status(200).json({ success: true });
	} catch (error: any) {
		console.error('Error sending daily deal', error);
		return res
			.status(error.response.status)
			.json({ error: { message: 'An error occurred. Try again later.' } });
	}
};
