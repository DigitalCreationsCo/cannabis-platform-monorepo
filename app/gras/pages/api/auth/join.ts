import { ApiError, generateToken } from '@cd/core-lib';
import { createUser, getUser, createVerificationToken } from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/lib/auth';
import { clientPromise } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email/sendVerificationEmail';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { validateRecaptcha } from '@/lib/recaptcha';
import { userJoinSchema, validateWithSchema } from '@/lib/zod';

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

// Signup the user
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { name, password, recaptchaToken } = req.body;
		const client = await clientPromise;

		await validateRecaptcha(recaptchaToken);

		// const invitation = inviteToken
		//   ? await getInvitation({ token: inviteToken })
		//   : null;
		const invitation = null;

		const email: string = req.body.email;

		// When join via invitation
		// if (invitation) {
		//   if (await isInvitationExpired(invitation.expires)) {
		//     throw new ApiError(400, 'Invitation expired. Please request a new one.');
		//   }

		//   if (invitation.sentViaEmail) {
		//     email = invitation.email;
		//   }
		// }

		validateWithSchema(userJoinSchema, {
			name,
			email,
			password,
		});

		// if (!isEmailAllowed(email)) {
		// 	throw new ApiError(
		// 		400,
		// 		`We currently only accept work email addresses for sign-up. Please use your work email to create an account. If you don't have a work email, feel free to contact our support team for assistance.`
		// 	);
		// }

		if (await getUser({ client, where: { email } })) {
			throw new ApiError(400, 'An user with this email already exists.');
		}

		// Check if team name is available
		// if (!invitation) {
		// 	if (!dispensary) {
		// 		throw new ApiError(400, 'A team name is required.');
		// 	}

		// 	const slug = slugify(dispensary);

		// 	validateWithSchema(userJoinSchema, { dispensary, slug });

		// 	const slugCollisions = await isTeamExists({ client, where: { slug } });

		// 	if (slugCollisions > 0) {
		// 		throw new ApiError(400, 'A team with this slug already exists.');
		// 	}
		// }

		const user = await createUser({
			client,
			data: {
				name,
				email,
				password: await hashPassword(password),
				emailVerified: invitation ? new Date() : null,
			},
		});

		// Send account verification email
		if (env.confirmEmail && !user.emailVerified) {
			const verificationToken = await createVerificationToken({
				client,
				token: generateToken(),
				identifier: user.email,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
			});

			await sendVerificationEmail({ user, verificationToken });
		}

		recordMetric('user.signup');

		res.status(201).json({
			data: {
				confirmEmail: env.confirmEmail && !user.emailVerified,
			},
		});
	} catch (error) {
		console.log(error);
		throw new ApiError(500, error.message);
	}
};
