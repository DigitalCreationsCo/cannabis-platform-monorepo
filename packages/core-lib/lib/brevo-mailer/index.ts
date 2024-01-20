/* eslint-disable sonarjs/no-duplicate-string */
import {
	type UserWithDetails,
	type Organization,
	type DriverWithDetails,
} from '@cd/data-access';
import * as brevo from '@getbrevo/brevo';
import { buildNewsletterTemplate } from './newsletter-template';

export class BrevoMailer {
	private emailsApi: brevo.TransactionalEmailsApi;
	private campaignsApi: brevo.EmailCampaignsApi;

	constructor() {
		this.emailsApi = new brevo.TransactionalEmailsApi();
		this.emailsApi.setApiKey(0, process.env.BREVO_API_KEY as string);

		this.campaignsApi = new brevo.EmailCampaignsApi();
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
			const newsLetterEmailCampaign = new brevo.CreateEmailCampaign();

			newsLetterEmailCampaign.name = subject;
			newsLetterEmailCampaign.subject = subject;
			newsLetterEmailCampaign.header = header;
			newsLetterEmailCampaign.previewText = header;
			newsLetterEmailCampaign.sender = {
				name: 'Bryant',
				email: 'bryantmejia@grascannabis.org',
			};

			newsLetterEmailCampaign.toField = 'bryantmejia@grascannabis.org';

			newsLetterEmailCampaign.htmlContent = buildNewsletterTemplate(
				subject,
				header,
				content,
			);

			// newsLetterEmailCampaign.templateId = 15;

			// newsLetterEmailCampaign.recipients = { listIds: [3] };

			// newsLetterEmailCampaign.scheduledAt = new Date().toISOString();

			// newsLetterEmailCampaign.params = {
			// 	parameter: 'My param value',
			// 	subject: 'common subject',
			// };

			this.campaignsApi
				.createEmailCampaign(newsLetterEmailCampaign)
				.then((data) => {
					console.info(
						'createEmailCampaign successfully. Returned data: ' +
							JSON.stringify(data),
					);
				})
				.catch((error) => {
					console.error(error);
					throw new Error(error);
				});
		} catch (error) {
			console.error('brevo.sendNewsletterCampaign: ', error.message);
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
