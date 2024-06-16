import { type User } from '@cd/data-access';
import { render } from '@react-email/render';
import { ResetPasswordEmail } from '@/components/emailTemplates';
import app from '../app';
import env from '../env';
import { sendEmail } from './sendEmail';

export const sendPasswordResetEmail = async (user: User, token: string) => {
	const subject = `Reset your ${app.name} password`;
	const url = `${env.appUrl}/auth/reset-password/${token}`;

	const html = render(ResetPasswordEmail({ url, subject, email: user.email }));

	await sendEmail({
		to: user.email,
		subject,
		html,
	});
};
