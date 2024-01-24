import * as brevo from '@getbrevo/brevo';
import { buildNewsletterTemplate } from './newsletter-template';

export class BrevoMailer {
	private apiInstance: brevo.EmailCampaignsApi;

	constructor() {
		this.apiInstance = new brevo.EmailCampaignsApi();
		this.apiInstance.setApiKey(0, process.env.BREVO_API_KEY as string);
	}

	async createScheduledNewsletterCampaign(
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

			// Get the current date
			const currentDate = new Date();
			// Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
			const currentDay = currentDate.getDay();
			// Calculate the difference between the current day and Tuesday
			let daysUntilTuesday = (2 + 7 - currentDay) % 7;
			// If today is Tuesday, add 7 days to get the next Tuesday
			if (daysUntilTuesday === 0) {
				daysUntilTuesday = 7;
			}
			// Create the date of the coming Tuesday
			const comingTuesday = new Date(currentDate);
			comingTuesday.setHours(8, 0, 0, 0);
			comingTuesday.setDate(currentDate.getDate() + daysUntilTuesday);

			newsLetterEmailCampaign.scheduledAt = comingTuesday.toISOString();
			console.info(
				'Campaign scheduled for: ',
				newsLetterEmailCampaign.scheduledAt,
			);

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
