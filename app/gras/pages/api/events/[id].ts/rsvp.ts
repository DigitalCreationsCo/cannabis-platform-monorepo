import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { addEventAttendee } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

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

// rsvp event - add to attendees
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { id } = req.query as { id: string };

	const { userId, fullName, username } = req.body as {
		userId: string;
		fullName: string;
		username: string;
	};

	const createdRsvp = await addEventAttendee({
		client,
		where: { id },
		attendee: { userId, fullName, username },
	});

	await recordMetric('event.rsvp.created');
	res.status(201).json({ data: { createdRsvp } });
};
