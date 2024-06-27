/* eslint-disable sonarjs/no-small-switch */
import { findManySessions } from '@cd/data-access';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionTokenCookieName } from '@/lib/nextAuth';
import { getSession } from '@/lib/session';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case 'GET':
				await handleGET(req, res);
				break;
			default:
				res.setHeader('Allow', 'GET');
				res.status(405).json({
					error: { message: `Method ${req.method} Not Allowed` },
				});
		}
	} catch (error: any) {
		const message = error.message || 'Something went wrong';
		const status = error.status || 500;

		res.status(status).json({ error: { message } });
	}
}

// Fetch all sessions for the current user
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res);
	const sessionToken = getCookie(sessionTokenCookieName, { req, res });

	let sessions = await findManySessions({
		where: {
			userId: session?.user.id,
		},
	});

	sessions.map(
		(session: any) =>
			(session.isCurrent = session.sessionToken === sessionToken)
	);

	// Sort sessions by most recent
	sessions = sessions.sort({ expires: -1 });

	res.json({ data: sessions });
};
