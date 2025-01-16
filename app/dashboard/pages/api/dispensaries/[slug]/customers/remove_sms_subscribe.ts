import freshsales from '@gras/core/crm/freshsales';
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

// get all customers
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const authToken = req.headers.authorization?.split(' ')[1];
	const token = env.nextAuth.secret;
	if (authToken !== token) {
		throw new Error('Unauthorized');
	}

	const { segment, fromNumber } = req.body as {
		contactId: string;
		segment: string;
		fromNumber: string;
	};

	let { contactId } = req.body;

	console.info('req.body', req.body);

	if (!segment) {
		throw new Error('Segment is required');
	}

	if (!contactId) {
		contactId = await freshsales
			.getContactByMobileNumber(fromNumber, segment)
			.then((contact) => contact!.id);
	}

	await freshsales.removeCustomersFromSegment(segment, [contactId]);

	// sendAudit({
	// 	action: 'team.customers.sms_subscribe',
	// 	crud: 'c',
	// 	user: teamMember.user,
	// 	team: teamMember.team,
	// });

	recordMetric('dispensary.customer.sms_unsubscribed');

	res.status(200).json('success');
};
