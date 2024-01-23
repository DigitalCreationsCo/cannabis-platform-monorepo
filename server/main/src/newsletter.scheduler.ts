/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { axios } from '@cd/core-lib';
import {
	EmailService,
	type NewsletterContent,
} from '@cd/core-lib/lib/email/EmailService';
import { schedule } from 'node-cron';

export default class NewsletterScheduler {
	static start() {
		this.runScheduleCannabisInsiderNewsLetterCampaignTask();
	}

	static async runScheduleCannabisInsiderNewsLetterCampaignTask() {
		try {
			// run this task every day sunday at 9am
			// schedule('0 9 * * 0', async (now) => {
			// console.info('Running newsletter campaign create task at ' + now);

			await createCannabisInsiderIssue();

			// });
			console.info('Scheduled: newsletter campaign create task.');
		} catch (error) {
			console.error('runScheduleNewsLetterCampaignTask: ', error);
			// send an alert email if this fails
		}
	}
}

async function createCannabisInsiderIssue() {
	try {
		const database_id = 'be0452a62d1e4cf8b1d4167831033c20';
		// fetch newsletter content from notion source
		const response = await axios.post(
			`https://api.notion.com/v1/databases/${database_id}/query`,
			{
				page_size: 2,
				filter: {
					property: 'isPublished',
					checkbox: {
						equals: false,
					},
				},
			},
			{
				headers: {
					Authorization: `Bearer secret_qbcYyxEvAsYXc36KsSFsPMgFKasqUUu23AMCi28vjJK`,
					'Notion-Version': '2021-05-13',
					'Content-Type': 'application/json',
				},
			},
		);

		let articles: { id: string; url: string }[];
		if (response.status === 200) {
			articles = response.data.results.map((page) => {
				return {
					id: page.id,
					url: page.properties.source.rich_text[0].plain_text,
				};
			});
		}

		// create date equal that will always return the next tuesday with the format "January 16"
		const tuesday = new Date();
		tuesday.setDate(tuesday.getDate() + ((2 + 7 - tuesday.getDay()) % 7));
		const date = tuesday.toLocaleString('default', {
			month: 'long',
			day: 'numeric',
		});

		const subject = `${date} Cannabis Insider`;
		const header = `Weekly Cannabis News From Gras`;

		// post request to generate newsletter template
		await axios.post(
			`${process.env.NEXT_PUBLIC_BLOG_APP_URL}/api/generate-newsletter-openai`,
			{
				subject,
				header,
				articleUrlsList: [...articles.map((article) => article['url'])],
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		console.info('Created newsletter campaign.');

		// update notion articles isPublished to `true`
		articles.forEach(async (page) => {
			await axios.patch(
				`https://api.notion.com/v1/pages/${page.id}`,
				{
					properties: {
						isPublished: {
							checkbox: true,
						},
					},
				},
				{
					headers: {
						Authorization: `Bearer secret_qbcYyxEvAsYXc36KsSFsPMgFKasqUUu23AMCi28vjJK`,
						'Notion-Version': '2021-05-13',
						'Content-Type': 'application/json',
					},
				},
			);
		});
		console.info('Updated notion articles isPublished to `true`.');
	} catch (error) {
		throw new Error(error.message);
	}
}

// automate the process of sending out a weekly newsletter from a source of content
// note: automate the social media posts in the same manner from a source of content
