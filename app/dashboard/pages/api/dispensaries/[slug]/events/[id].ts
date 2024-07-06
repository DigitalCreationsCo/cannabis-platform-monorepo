import { throwIfNotAllowed } from '@cd/core-lib';
import {
	type Event,
	deleteEvent,
	getEvent,
	updateEvent,
} from '@cd/data-access';
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
			case 'GET':
				await handleGET(req, res);
				break;
			case 'DELETE':
				await handleDELETE(req, res);
				break;
			case 'PATCH':
				await handlePATCH(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET, DELETE, PATCH');
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

// Get a single event
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_event', 'read');

	const client = await clientPromise;
	const { id } = req.query as { id: string };

	const event = await getEvent({ client, where: { id } });
	recordMetric('dispensary.event.fetched');
	res.status(200).json({ data: event });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_event', 'delete');

	const client = await clientPromise;
	const { id } = req.query as { id: string };
	await deleteEvent({ where: { id }, client });

	recordMetric('dispensary.event.removed');

	res.status(200).json({});
};

// update a single event
const handlePATCH = async (req: NextApiRequest, res: NextApiResponse) => {
	const teamMember = await throwIfNoDispensaryAccess(req, res);
	throwIfNotAllowed(teamMember, 'team_event', 'update');

	const client = await clientPromise;
	const { id } = req.query as { id: string };
	const { ...event } = req.body as unknown as Event;

	const updatedEvent = await updateEvent({
		client,
		where: { id },
		data: { ...event },
	});
	recordMetric('dispensary.event.updated');
	res.status(200).json({ data: updatedEvent });
};
