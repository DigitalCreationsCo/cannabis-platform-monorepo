import { hashPassword } from '@/lib/auth';
import { clientPromise } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email/sendVerificationEmail';
import { isEmailAllowed } from '@/lib/email/utils';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { validateRecaptcha } from '@/lib/recaptcha';
import { userJoinSchema, validateWithSchema } from '@/lib/zod';
import { ApiError, generateToken } from '@gras/core';
import {
	// getInvitation,
	// isInvitationExpired,
	createVerificationToken,
	createStaffMember,
	getStaffMember,
	// getDispensary,
} from '@gras/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slackNotify } from '@/lib/slack';

// TODO:
// Add zod schema validation

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

// Signup the staff member
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {
			name,
			password,
			// dispensary,
			// inviteToken,
			recaptchaToken,
		} = req.body as {
			name: string;
			password: string;
			recaptchaToken: string;
		};
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

		if (!isEmailAllowed(email)) {
			throw new ApiError(
				400,
				`We currently only accept work email addresses for sign-up. Please use your work email to create an account. If you don't have a work email, feel free to contact our support team for assistance.`
			);
		}

		if (await getStaffMember({ client, where: { email } })) {
			throw new ApiError(400, 'An user with this email already exists.');
		}

		// Check if team name is available
		if (!invitation) {
			// if (!dispensary) {
			// 	throw new ApiError(400, 'A team name is required.');
			// }
			// const slug = slugify(dispensary);
			// validateWithSchema(userJoinSchema, { dispensary, slug });
			// const slugCollisions = await isTeamExists({ client, where: { slug } });
			// if (slugCollisions > 0) {
			// 	throw new ApiError(400, 'A team with this slug already exists.');
			// }
		}

		const user = await createStaffMember({
			client,
			user: {
				name,
				email,
				password: await hashPassword(password),
				emailVerified: invitation ? new Date() : null,
			},
		});

		// const userDispensary = await createDispensary({
		// 	client,
		// 	data: {
		// 		name: dispensary,
		// 		slug: slugify(dispensary),
		// 	},
		// 	userId: user.id,
		// });

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

		recordMetric('member.signup');

		slackNotify()?.alert({
			text: invitation
				? 'New team member signed up via invitation'
				: 'New team member signed up',
			fields: {
				Name: user.name,
				Email: user.email,
				// Dispensary: userDispensary.name,
			},
		});

		res.status(201).json({
			data: {
				confirmEmail: env.confirmEmail && !user.emailVerified,
			},
		});
	} catch (error) {
		throw new ApiError(500, error.message || 'Something went wrong');
	}
};
