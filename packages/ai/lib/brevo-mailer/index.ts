/* eslint-disable sonarjs/no-duplicate-string */
import {
	type UserWithDetails,
	type Organization,
	type DriverWithDetails,
} from '@gras/data-access';
import { buildNewsletterTemplate } from './newsletter-template';

const _BryantEmail = 'bryantmejia@grascannabis.org';

export class BrevoMailer {
	brevo: any;
	private emailsApi: typeof this.brevo.TransactionalEmailsApi;
	private campaignsApi: typeof this.brevo.EmailCampaignsApi;

	constructor() {
		import('@getbrevo/brevo').then((brevo) => (this.brevo = brevo.default));
		this.emailsApi = new this.brevo.TransactionalEmailsApi();
		this.emailsApi.setApiKey(0, process.env.BREVO_API_KEY as string);

		this.campaignsApi = new this.brevo.EmailCampaignsApi();
		this.campaignsApi.setApiKey(0, process.env.BREVO_API_KEY as string);
	}

	async sendNewsletterCampaign(
		subject: string,
		header: string,
		content: {
			title: string;
			excerpt: string;
			mainImage: string;
			footer: string;
			link: string;
		}[],
	) {
		try {
			const newsLetterEmailCampaign = new this.brevo.CreateEmailCampaign();

			newsLetterEmailCampaign.name = subject;
			newsLetterEmailCampaign.subject = subject;
			newsLetterEmailCampaign.header = header;
			newsLetterEmailCampaign.previewText = header;
			newsLetterEmailCampaign.sender = {
				name: 'Bryant',
				email: _BryantEmail,
			};

			// newsLetterEmailCampaign.toField = _BryantEmail;

			// newsLetterEmailCampaign.templateId = 15;
			newsLetterEmailCampaign.htmlContent = buildNewsletterTemplate(
				subject,
				header,
				content,
			);

			newsLetterEmailCampaign.recipients = { listIds: [3] };

			// newsLetterEmailCampaign.params = {
			// 	parameter: 'My param value',
			// 	subject: 'common subject',
			// };

			// schedule send for Tuesday 8AM
			const tuesday = new Date();
			tuesday.setDate(tuesday.getDate() + ((2 + 7 - tuesday.getDay()) % 7));
			tuesday.setHours(8);
			tuesday.setMinutes(0);
			tuesday.setSeconds(0);
			newsLetterEmailCampaign.scheduledAt = tuesday.toISOString();

			const newsletter = await this.campaignsApi.createEmailCampaign(
				newsLetterEmailCampaign,
			);

			// send test email to newsletter team
			this.campaignsApi.sendTestEmail(newsletter.body.id, {
				emailTo: [_BryantEmail],
			});
		} catch (error) {
			console.error('brevo.createEmailCampaign: ', error.message);
			throw new Error(error.message);
		}
	}

	async sendNewUserEmail(
		subject: string,
		header: string,
		user: UserWithDetails,
	) {
		try {
			return await this.emailsApi.sendTransacEmail({
				to: [
					{
						email: user.email,
						name: user.firstName,
					},
				],
				sender: {
					name: 'Bryant',
					email: 'bryantmejia@grascannabis.org',
				},
				templateId: 40,
				subject,
				params: { firstName: user.firstName, previewText: header },
			});
		} catch (error) {
			console.error('brevo.sendNewUserEmail: ', error.message);
			throw new Error(error.message);
		}
	}

	async sendNewDispensaryEmail(
		subject: string,
		header: string,
		user: UserWithDetails,
		organization: Organization,
	) {
		try {
			return await this.emailsApi.sendTransacEmail({
				to: [
					{
						email: user.email,
						name: user.firstName,
					},
				],
				sender: {
					name: 'Bryant',
					email: 'bryantmejia@grascannabis.org',
				},
				templateId: 40, // create a different template for dispensaries
				subject,
				params: {
					firstName: user.firstName,
					previewText: header,
					dispensary: organization.name,
				},
			});
		} catch (error) {
			console.error('brevo.sendNewDispensaryEmail: ', error.message);
			throw new Error(error.message);
		}
	}

	async sendNewDeliveryPersonEmail(
		subject: string,
		header: string,
		user: DriverWithDetails,
	) {
		try {
			return await this.emailsApi.sendTransacEmail({
				to: [
					{
						email: user.email,
						name: user.user.firstName,
					},
				],
				sender: {
					name: 'Bryant',
					email: 'bryantmejia@grascannabis.org',
				},
				templateId: 40, // create a different template for Delivery persons
				subject,
				params: { firstName: user.user.firstName, previewText: header },
			});
		} catch (error) {
			console.error('brevo.sendNewDeliveryPersonEmail: ', error.message);
			throw new Error(error.message);
		}
	}
}
