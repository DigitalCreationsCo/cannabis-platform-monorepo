import { isAccountLocked, sendLockoutEmail } from '@/lib/accountLock';
import { clientPromise } from '@/lib/db';
import { resendLinkRequestSchema, validateWithSchema } from '@/lib/zod';
import { ApiError } from '@gras/core/errors';
import { deleteVerificationToken, getUser } from '@gras/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case 'POST':
				await handlePOST(req, res);
				break;
			default:
				res.setHeader('Allow', 'POST');
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

// Resend unlock account email
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { email, expiredToken } = validateWithSchema(
		resendLinkRequestSchema,
		req.body
	);

	const user = await getUser({ client, where: { email } });

	if (!user) {
		throw new ApiError(400, 'User not found');
	}

	if (!isAccountLocked(user)) {
		throw new ApiError(
			400,
			'Your account is already active. Please try logging in.'
		);
	}

	await deleteVerificationToken({ client, token: expiredToken });
	await sendLockoutEmail(user, true);

	res.status(204).end();
};
