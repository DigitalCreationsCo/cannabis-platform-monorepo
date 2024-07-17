import { FreshSales, throwIfNotAllowed } from '@cd/core-lib';
import freshsales from '@cd/core-lib/src/crm/freshsales';
import { type Customer } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import { recordMetric } from '@/lib/metrics';
import { sendAudit } from '@/lib/retraced';

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
			case 'POST':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, POST');
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
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_customers', 'read');

	const customers = await FreshSales.getSegmentCustomers(
		teamMember.team.weedTextSegmentId!
	);

	recordMetric('dispensary.customers.fetched');

	res.status(200).json({ data: customers });
};

// Create customer
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_customers', 'create');

	const {
		first_name,
		last_name,
		mobile_number,
		email,
		address,
		city,
		state,
		country,
		zipcode,
		custom_field: { birthdate },
	} = req.body as Customer;

	const insertedCustomer = await freshsales.upsertContact(
		{
			first_name,
			last_name,
			mobile_number,
			email,
			address: address!,
			city,
			state,
			country: country!,
			zipcode,
			custom_field: { birthdate },
		},
		{
			keyword: teamMember.teamSlug,
		}
	);

	await freshsales.addCustomersToSegment(teamMember.team.weedTextSegmentId!, [
		insertedCustomer,
	]);

	sendAudit({
		action: 'team.customers.create',
		crud: 'c',
		user: teamMember.user,
		team: teamMember.team,
	});

	recordMetric('dispensary.customer.created');

	res.status(200).json({ data: insertedCustomer });
};
