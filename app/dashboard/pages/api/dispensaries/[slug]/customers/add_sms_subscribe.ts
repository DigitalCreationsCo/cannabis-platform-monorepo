import { prependDialCode } from '@cd/core-lib';
import freshsales, { leadSourceIds } from '@cd/core-lib/crm/freshsales';
import type { NextApiRequest, NextApiResponse } from 'next';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';

/*
 * This route is called by Twilio Optin functions
 * @see file:///Users/vibrantceo/cannabis-platform-monorepo/twilio/optin-demo/functions/optin.protected.js
 * @see file:///Users/vibrantceo/cannabis-platform-monorepo/twilio/sms-broadcast/functions/optin.protected.js
 */

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

// add customer to segmentation list
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const authToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;

	if (authToken !== token) {
		throw new Error('Unauthorized');
	}

	const {
		fromNumber,
		segment,
		keyword = 'customer',
	} = req.body as {
		fromNumber: string;
		segment: string;
		keyword: string;
	};

	// refactor to get customer from all contacts view
	// const customer = await await freshsales.getContactByMobileNumber(
	// 	fromNumber,
	// 	segment
	// );

	const customerId = await freshsales.upsertContact({
		lead_source_id: leadSourceIds.phone,
		keyword,
		mobile_number: prependDialCode(fromNumber),
		sms_subscription_status: 1,
	})!;

	await freshsales.addCustomersToSegment(segment, [customerId.toString()]);

	// sendAudit({
	// 	action: 'team.customers.sms_subscribe',
	// 	crud: 'c',
	// 	user: teamMember.user,
	// 	team: teamMember.team,
	// });

	recordMetric('dispensary.customer.sms_unsubscribed');

	res.status(200).json({ data: { customer: { id: customerId } } });
};
