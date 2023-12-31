import * as brevo from '@getbrevo/brevo';

export class BrevoMailer {
	private apiInstance: brevo.EmailCampaignsApi;

	constructor() {
		this.apiInstance = new brevo.EmailCampaignsApi();
		this.apiInstance.setApiKey(0, process.env.BREVO_API_KEY as string);
	}

	sendCampaign(
		subject: string,
		content: {
			title: string;
			excerpt: string;
			mainImage: string;
			footer: string;
			link: string;
		}[],
	) {
		const formattedContent = content.map((item) => {
			console.info('item: ', item);
			return `<div>
                    <h4>${item.title}</h4>
                    <img src="${item.mainImage}" alt="${
				item.title
			}" height="500" width="1000" />
                    <p>${item.excerpt}</p>
                    <p>${
											item.footer?.replace(/\s*here$/, '') ||
											'More info available '
										} <a href="${item.link}">here</a></p>
                </div>
                <br />
                <br />`;
		});
		const newsLetterEmailCampaign = new brevo.CreateEmailCampaign();

		newsLetterEmailCampaign.name = subject;
		newsLetterEmailCampaign.subject = subject;
		newsLetterEmailCampaign.header = `Weekly Cannabis News from Gras`;
		newsLetterEmailCampaign.previewText = `Weekly Cannabis News from Gras`;

		newsLetterEmailCampaign.sender = {
			name: 'Bryant',
			email: 'bryantmejia@grascannabis.org',
		};

		// newsLetterEmailCampaign.templateId = 15;

		// newsLetterEmailCampaign.recipients = { listIds: [3] };
		newsLetterEmailCampaign.toField = 'bryantmejia@grascannabis.org';

		// newsLetterEmailCampaign.scheduledAt = new Date().toISOString();

		newsLetterEmailCampaign.htmlContent = `<html><body><h1>This email is sent using brevo Api.</h1>
        ${formattedContent}</body></html>`;

		// newsLetterEmailCampaign.params = {
		// 	parameter: 'My param value',
		// 	subject: 'common subject',
		// };

		this.apiInstance.createEmailCampaign(newsLetterEmailCampaign).then(
			function (data) {
				console.info(
					'API called successfully. Returned data: ' + JSON.stringify(data),
				);
			},
			function (error) {
				console.error('brevo.createEmailCampaign: ', error);
			},
		);
	}
}
