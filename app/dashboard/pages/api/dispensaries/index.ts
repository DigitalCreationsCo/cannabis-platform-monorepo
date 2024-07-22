import { slugify, ApiError, FreshSales } from '@cd/core-lib';
import freshsales from '@cd/core-lib/src/crm/freshsales';
import {
	createDispensary,
	type Dispensary,
	getStaffMemberDispensaries,
	isTeamExists,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { createInvoice } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/user';
import { createTeamSchema, validateWithSchema } from '@/lib/zod';

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

// Get teams
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const user = await getCurrentUser(req, res);
	const teams = await getStaffMemberDispensaries({
		client,
		where: { userId: user.id },
	});

	recordMetric('team.fetched');

	res.status(200).json({ data: teams });
};

// Create a team
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const create = validateWithSchema(
		createTeamSchema,
		req.body
	) as Dispensary & { priceIds: string[] };

	const { priceIds } = create;

	const user = await getCurrentUser(req, res);
	const slug = slugify(create.name);

	if (await isTeamExists({ client, where: { slug } })) {
		throw new ApiError(400, 'A team with the slug already exists.');
	}

	const weedTextPhoneNumber = '';
	let weedTextSegmentId = '';
	// weedTextPhoneNumber = await Twilio.provisionSMSPhoneNumber(slug);
	weedTextSegmentId = await FreshSales.createSegment(slug);

	const team = await createDispensary({
		client,
		userId: user.id,
		data: {
			...create,
			name: create.name,
			slug,
			weedTextSegmentId,
			weedTextPhoneNumber,
		},
	});

	await freshsales.upsertAccount({
		name: team.name,
		address: team.address!.street1,
		city: team.address!.city,
		state: team.address!.state ?? '',
		zipcode: team.address!.zipcode,
		phone: team.phone,
		website: team.ecommerceUrl ?? '',
	});

	switch (true) {
		case team.isSubscribedForDelivery:
			// create an invoice for delivery subscription
			break;
		case team.isSubscribedForPickup:
			// create an invoice for pickup subscription
			break;
		case team.isSubscribedForMessaging:
			// create an invoice for text messaging subscription, email invoice to team members
			await createInvoice(team.name, team.billingId, priceIds);
			break;
	}

	recordMetric('team.created');

	res.status(200).json({ data: team });
};
