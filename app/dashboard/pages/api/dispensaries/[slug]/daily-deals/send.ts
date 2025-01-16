/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { prependDialCode, throwIfNotAllowed } from '@gras/core';
import freshsales from '@gras/core/crm/freshsales';
import twilio from '@gras/core/sms/twilio';
import { updateDispensaryDailyDeal, type DailyDeal } from '@gras/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';

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
			conversions,
			numSent,
			numDelivered,
			lastSentAt,
			isActive,
			jobId,
		} = JSON.parse(req.body) as DailyDeal;

		if (!weedTextSegmentId) {
			throw new Error('WeedText segment ID is required');
		}

		const customers = await freshsales.getSegmentCustomers(weedTextSegmentId);

		const customerPhoneNumbers = customers
			.map((customer) => prependDialCode(customer.mobile_number!))
			.filter(Boolean);

		await twilio.sendAll(customerPhoneNumbers, message);

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
				conversions,
				campaign,
				numSent,
				numDelivered,
				isActive: true,
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
