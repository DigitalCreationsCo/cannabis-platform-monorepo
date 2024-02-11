/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { axios } from '@cd/core-lib';
import {
	EmailService,
	type NewsletterContent,
} from '@cd/core-lib/src/lib/email/EmailService';
import { schedule } from 'node-cron';

export default class NewsletterScheduler {
	static start() {
		this.runScheduleCannabisInsiderNewsLetterCampaignTask();
		this.runGenerateBlogPostsTask();
	}

	static async runScheduleCannabisInsiderNewsLetterCampaignTask() {
		try {
			// run this task every sunday at 9am
			schedule('0 9 * * 0', async (now) => {
				console.info(
					'Running newsletter campaign create task at ' + now.toLocaleString(),
				);
				await createCannabisInsiderIssue();
			});
			console.info('Scheduled: newsletter campaign create task.');
		} catch (error) {
			console.error('runScheduleNewsLetterCampaignTask: ', error.message);
			// send an alert email if this fails
		}
	}

	static async runGenerateBlogPostsTask() {
		try {
			// run this task every day at 9pm
			// schedule('0 9 * * 0', async (now) => {
			// console.info('Running newsletter campaign create task at ' + now.toLocaleString());

			await generateBlogPosts();

			// });
			console.info('Scheduled: blog post create task.');
		} catch (error) {
			console.error('runGenerateBlogPostsTask: ', error.message);
			// send an alert email if this fails
		}
	}
}

async function createCannabisInsiderIssue() {
	try {
		// source: https://www.notion.so/be0452a62d1e4cf8b1d4167831033c20?v=de6c36f371b64d93a60a3cf559daf4cb
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
		console.info(`Fetched ${articles.length} articles from notion.`);
		console.info('articles: ', articles);

		if (articles.length === 0) {
			throw new Error('No articles to publish. Check your notion database.');
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
		const articleUrlsList = articles.map((article) => article['url']);

		console.info(
			`requesting to generate newsletter campaign...
'subject': '${subject}',
'header': '${header}',
'articleUrlsList': ` + articleUrlsList,
		);

		await axios.post(
			`${process.env.NEXT_PUBLIC_BLOG_APP_URL}/blog/api/generate-newsletter-openai`,
			{
				subject,
				header,
				articleUrlsList,
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
						datePublished: {
							date: new Date(),
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
		console.info(
			`Updated ${articles.length} notion articles isPublished to \`true\`.`,
		);
	} catch (error) {
		throw new Error(error.message);
	}
}

async function generateBlogPosts() {
	try {
		// source: https://www.notion.so/4acc605740ae4507acc83ab2ebe1036d?v=610dfcb6b24a44c78662f080de558f20
	} catch (error) {
		throw new Error(error.message);
	}
}

// automate the process of sending out a weekly newsletter from a source of content
// note: automate the social media posts in the same manner from a source of content
