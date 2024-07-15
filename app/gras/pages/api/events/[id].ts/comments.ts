import { clientPromise } from '@/lib/db';
import { recordMetric } from '@/lib/metrics';
import { createEventComment, getEvent } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

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

// Get event comments
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { id } = req.query as { id: string };

	const event = await getEvent({ client, where: { id } });
	res.status(200).json({ data: event.comments ?? [] });
};

// post new comment
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { id } = req.query as { id: string };

	const { userId, username, comment } = req.body as {
		userId: string;
		username: string;
		comment: string;
	};

	const createdComment = await createEventComment({
		client,
		where: { id },
		comment: { userId, username, comment },
	});

	await recordMetric('event.comment.created');
	res.status(201).json({ data: { createdComment } });
};
