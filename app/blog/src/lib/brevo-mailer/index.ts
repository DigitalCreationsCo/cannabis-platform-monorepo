import * as brevo from '@getbrevo/brevo';
import { buildNewsletterTemplate } from './newsletter-template';

export class BrevoMailer {
	private apiInstance: brevo.EmailCampaignsApi;

	constructor() {
		this.apiInstance = new brevo.EmailCampaignsApi();
		this.apiInstance.setApiKey(0, process.env.BREVO_API_KEY as string);
	}

	sendCampaign(
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

			this.apiInstance
				.createEmailCampaign(newsLetterEmailCampaign)
				.then((data) => {
					console.info(
						'API called successfully. Returned data: ' + JSON.stringify(data),
					);
				})
				.catch((error) => {
					console.error(error);
					throw new Error(error);
				});
		} catch (error) {
			console.error('brevo.createEmailCampaign: ', error.message);
			throw new Error(error.message);
		}
	}
}
