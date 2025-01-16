/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { prependDialCode, throwIfNotAllowed } from '@gras/core';
import freshsales, { leadSourceIds } from '@gras/core/crm/freshsales';
import twilio from '@gras/core/sms/twilio';
import type { NextApiRequest, NextApiResponse } from 'next';
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

/*
 * THe same functionality can be created using Twilio API (Text 'join' to 42424)
 * So, possibly cancel this feature.
 * Use Segment routing to add contacts from sms subscription to FreshSales crm.
 */
// Invite Customer to daily deals messages
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_customers', 'send');

	const {
		firstName: first_name,
		lastName: last_name,
		phone,
		email,
		city,
		state,
		zipcode,
		birthdate,
		doubleOptInMessage,
	} = req.body as {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		city: string;
		state: string;
		zipcode: string;
		birthdate: string;
		doubleOptInMessage: string;
	};

	const mobile_number = prependDialCode(phone);

	const insertedCustomer = await freshsales.upsertContact({
		first_name,
		last_name,
		mobile_number,
		email,
		city,
		state,
		zipcode,
		custom_field: { birthdate },
		lead_source_id: leadSourceIds.web,
		medium: teamMember.team.name,
		keyword: 'customer',
	});

	await freshsales.addCustomersToSegment(teamMember.team.weedTextSegmentId!, [
		insertedCustomer,
	]);

	recordMetric('dispensary.customer.created');

	await twilio.inviteCustomer(
		teamMember.team.weedTextPhoneNumber!,
		mobile_number,
		doubleOptInMessage
	);
	// recordMetric('dispensary.message.sent');
	// set up stripe metering

	res.status(200).json({ success: true });
};
