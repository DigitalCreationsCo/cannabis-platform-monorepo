import { throwIfNotAllowed } from '@cd/core-lib';
import { type Event, createEvent, getEventsByTeamSlug } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
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
		console.error('api/events: ', message);
		res.status(status).json({ error: { message } });
	}
}

// Get cannabis events
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_event', 'read');

	const client = await clientPromise;

	const events = await getEventsByTeamSlug({
		client,
		slug: teamMember.team.slug,
	});

	sendAudit({
		action: 'team.events.read',
		crud: 'r',
		user: teamMember.user,
		team: teamMember.team,
	});

	recordMetric('dispensary.event.fetched');
	res.status(200).json({ data: events });
};

// save a new event
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_event', 'create');

	const client = await clientPromise;
	const { ...event } = JSON.parse(req.body) as unknown as Event;

	const eventCreated = await createEvent({ client, data: event });

	sendAudit({
		action: 'team.events.create',
		crud: 'u',
		user: teamMember.user,
		team: teamMember.team,
	});

	recordMetric('dispensary.event.created');

	res.status(201).json({ data: eventCreated });
};
