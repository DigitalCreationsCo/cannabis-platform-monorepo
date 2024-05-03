import { render } from '@react-email/components';
import { VerificationEmail } from '@/components/emailTemplates';
import app from '../app';
import env from '../env';
import { sendEmail } from './sendEmail';

export const sendVerificationEmail = async ({
	user,
	verificationToken,
}: {
	user: any;
	verificationToken: any;
}) => {
	const subject = `Confirm your ${app.name} account`;
	const verificationLink = `${
		env.appUrl
	}/auth/verify-email-token?token=${encodeURIComponent(
		verificationToken.token,
	)}`;

	const html = render(VerificationEmail({ subject, verificationLink }));

	await sendEmail({
		to: user.email,
		subject,
		html,
	});
};
