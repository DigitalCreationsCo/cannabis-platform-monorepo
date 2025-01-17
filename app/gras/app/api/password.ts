import {
	findFirstUserOrThrow,
	updateUser,
	deleteManySessions,
} from '@gras/data-access';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env-schema';
import { recordMetric } from '@/lib/metrics';
import { sessionTokenCookieName } from '@/lib/nextAuth';
import { getSession } from '@/lib/session';
import { validateWithSchema, updatePasswordSchema } from '@/lib/zod';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	try {
		switch (method) {
			case 'PUT':
				await handlePUT(req, res);
				break;
			default:
				res.setHeader('Allow', 'PUT');
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

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const session = await getSession(req, res);

	const { currentPassword, newPassword } = validateWithSchema(
		updatePasswordSchema,
		req.body
	);

	const user = await findFirstUserOrThrow({
		client,
		where: { id: session!.user.id },
	});

	if (!(await verifyPassword(currentPassword, user.password as string))) {
		throw new ApiError(400, 'Your current password is incorrect');
	}

	await updateUser({
		client,
		where: { id: session?.user.id },
		data: { password: await hashPassword(newPassword) },
	});

	// Remove all sessions other than the current one
	if (env.nextAuth.sessionStrategy === 'database') {
		const sessionToken = getCookie(sessionTokenCookieName, { req, res });

		await deleteManySessions({
			client,
			where: {
				userId: session?.user.id,
				NOT: {
					sessionToken,
				},
			},
		});
	}

	recordMetric('user.password.updated');

	res.status(200).json({ data: {} });
};
