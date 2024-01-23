import {
	type DriverWithDetails,
	type Organization,
	type UserWithDetails,
} from '@cd/data-access';
import { BrevoMailer } from '@cd/core-lib/lib/brevo-mailer';
import { TextContent } from '../../src';

export class EmailService {
	static async createScheduledNewsletterCampaign({
		subject,
		header,
		content,
	}: NewsletterContent) {
		try {
			const mailer = new BrevoMailer();
			return await mailer.sendNewsletterCampaign(subject, header, content);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async sendNewUserEmail({
		subject = TextContent.account.THANK_YOU_FOR_SIGNING_UP_WEED_TEXT_DEAL,
		header = TextContent.account.THANK_YOU_FOR_SIGNING_UP,
		user,
	}: {
		subject?: string;
		header?: string;
		user: UserWithDetails;
	}) {
		try {
			const mailer = new BrevoMailer();
			return await mailer.sendNewUserEmail(subject, header, user);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// accept a dispensaryid and do lookup here??
	static async sendNewDispensaryEmail({
		subject = TextContent.account.THANK_YOU_FOR_SIGNING_UP_WEED_TEXT_DEAL,
		header = TextContent.account.THANK_YOU_FOR_SIGNING_UP,
		user,
		organization,
	}: {
		subject?: string;
		header?: string;
		user: UserWithDetails;
		organization: Organization;
	}) {
		try {
			const mailer = new BrevoMailer();
			return await mailer.sendNewDispensaryEmail(
				subject,
				header,
				user,
				organization,
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async sendNewDeliveryPersonEmail({
		subject = TextContent.account.THANK_YOU_FOR_SIGNING_UP_WEED_TEXT_DEAL,
		header = TextContent.account.THANK_YOU_FOR_SIGNING_UP,
		user,
	}: {
		subject?: string;
		header?: string;
		user: DriverWithDetails;
	}) {
		try {
			const mailer = new BrevoMailer();
			return await mailer.sendNewDeliveryPersonEmail(subject, header, user);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

export interface NewsletterContent {
	subject: string;
	header: string;
	content: {
		title: string;
		excerpt: string;
		mainImage: string;
		footer: string;
		link: string;
	}[];
}
