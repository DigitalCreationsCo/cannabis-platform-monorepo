import {
	addEventAttendee,
	updateEventAttendee,
	type Attendee,
} from '@gras/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/db';
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
			case 'PATCH':
				await handlePATCH(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST, PATCH');
				res.status(405).json({
					error: { message: `Method ${method} Not Allowed` },
				});
		}
	} catch (error: any) {
		console.error(error);
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;
		res.status(status).json({ error: { message } });
	}
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	console.info('POST HERE');
	const client = await clientPromise;
	const { id } = req.query as { id: string };
	const attendee = req.body as Attendee;

	console.info('req.body', req.body);
	const createdRsvp = await addEventAttendee({
		client,
		where: { eventId: id },
		attendee,
	});

	console.info('createdRsvp', createdRsvp);

	await recordMetric('event.rsvp.created');
	res.status(201).json({ data: { createdRsvp } });
};

const handlePATCH = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { id } = req.query as { id: string };
	const attendee = req.body as Attendee;

	const createdRsvp = await updateEventAttendee({
		client,
		where: { eventId: id },
		attendee,
	});

	await recordMetric('event.rsvp.updated');
	res.status(201).json({ data: { createdRsvp } });
};
