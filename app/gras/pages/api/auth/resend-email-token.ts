import { clientPromise } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email/sendVerificationEmail';
import { resendEmailToken, validateWithSchema } from '@/lib/zod';
import { ApiError } from '@cd/core-lib/errors';
import { getUser, createVerificationToken } from '@cd/data-access';
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

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await clientPromise;
	const { email } = validateWithSchema(resendEmailToken, req.body);

	const user = await getUser({ client, where: { email } });

	if (!user) {
		throw new ApiError(422, `We can't find a user with that e-mail address`);
	}

	const newVerificationToken = await createVerificationToken({
		client,
		token: req.body.token || '',
		identifier: email,
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours),
	});

	await sendVerificationEmail({
		user,
		verificationToken: newVerificationToken,
	});
	res.json({});
};
