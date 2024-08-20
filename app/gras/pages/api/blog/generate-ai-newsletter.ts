/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { openai } from '@cd/ai';
// import { BrevoMailer } from '@cd/core-lib/lib/brevo-mailer';
import { type NextApiResponse } from 'next';
import nc from 'next-connect';
import { createClient } from 'next-sanity';
import {
	type Post,
	getNonPublishedPosts,
	setPostPublishedInNewsletter,
} from '@/lib/sanity';

// generate newsletter content combination with openai and cms content, by providing a list of article urls to the trained model.
const handler = nc();
handler.post(async (req: any, res: NextApiResponse) => {
	try {
		const NUM_ARTICLES_FOR_NEWSLETTER = 3;

		console.info(
			`generate-newsletter-open-ai:,
'Subject': ${req.body.subject},
'Header': ${req.body.header},
'ArticleUrlsList': ${req.body.articleUrlsList}`
		);

		const {
			subject,
			header,
			articleUrlsList,
		}: { subject: string; header: string; articleUrlsList: string[] } =
			req.body;

		if (articleUrlsList?.length === undefined)
			throw new Error('Did not provide article urls list.');

		let aiGeneratedContent;
		if (articleUrlsList?.length > 0) {
			console.info(' Generating content with open ai...');
			const response = await openai.openai!.chat.completions.create(
				{
					model: 'gpt-3.5-turbo',
					messages: [
						{
							role: 'system',
							content: `You are a subject matter expert on all things growing cannabis, smoking cannabis, cannabis foods and beverages, and cannabis culture. You are able to give me advice on how to grow cannabis indoors, outdoors, and in greenhouses. You are able to give me advice on how to smoke cannabis in a variety of ways. You are able to give me advice on how to make cannabis foods and beverages. You are able to give me advice on how to make cannabis edibles. You are able to give me advice on how to make cannabis tinctures. You are able to give me advice on how to make cannabis topicals. You are able to give me advice on how to make cannabis concentrates. You are able to give me advice on how to make cannabis extracts. You are able to give me advice on how to make cannabis oils. You are able to give me advice on how to make cannabis hash. 
					For each article link I give to you, you will create a summarized version of the article. You are able to rephrase any article link I give to you. When I give you an article link, you will craft a well-written prose explaining the contents of the article, no more than 8 sentences long. Your writing style is friendly, and easy to ready. You use creative visual language in your writing. You create phrases and sentences with entertaining, delightful language and a friendly voice. Conclude the article with 1 or 2 sentences fitting to resolve the topic. 
					Return a response as an array type of objects with the following properties: { 
						title: A creative title, 
						excerpt: the short summary of the article, 
						mainImage: the url of the main image of the article,
						footer: "The full story is available here.",
						link: the given article link
					}. You will execute these instructions whenever I give you a list of article urls.`,
						},
						{
							role: 'user',
							content:
								'Create article summaries for this list of articles: ' +
								articleUrlsList.join(', '),
						},
					],
				},
				{ timeout: 30000 }
			);

			console.info('response from open ai: ', response.choices[0].message);
			aiGeneratedContent = normalizeOpenAIResponse(
				response.choices[0].message.content
			);
		} else {
			aiGeneratedContent = [];
		}

		if (!aiGeneratedContent) throw new Error('No content was generated.');
		console.info('aiGeneratedContent: ', aiGeneratedContent);

		const client = createClient({
			dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
			projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
			token: process.env.SANITY_API_EDITOR_TOKEN,
			useCdn: true,
			apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		});

		const blogPosts: Post[] = await getNonPublishedPosts(
			client,
			NUM_ARTICLES_FOR_NEWSLETTER - aiGeneratedContent.length
		);

		console.info(
			`
${aiGeneratedContent.length} articles generated by openAi.
${blogPosts.length} articles retrieved from CMS.`
		);

		if (aiGeneratedContent.length === 0 && blogPosts.length === 0) {
			throw new Error(`
No content was generated. Check your database and cms datasources.
${aiGeneratedContent.length} articles generated by openAi.
${blogPosts.length} articles retrieved from CMS.`);
			// send alert email to content admin
		} else {
			const normalizedBlogContent = blogPosts.map((post) => {
				console.info('blog post: ', post);
				return {
					_id: post._id,
					title: post.title as string,
					excerpt: post.excerpt as string,
					mainImage: post.mainImage,
					footer: `More info available here.`,
					link: post.contentUrl,
				};
			});

			const newsletterContent: {
				title: string;
				excerpt: string;
				mainImage: string;
				footer: string;
				link: string;
			}[] = [...aiGeneratedContent, ...normalizedBlogContent];
			// const mailer = new BrevoMailer();
			// await mailer
			// 	.sendNewsletterCampaign(subject, header, newsletterContent)
			// 	.then(() => {
			// 		console.info('Successfully created newsletter campaign.');

			// 		normalizedBlogContent.forEach(async (post) => {
			// 			await setPostPublishedInNewsletter(client, post._id);
			// 		});
			// 	});

			return res
				.status(201)
				.json({ success: 'true', payload: [...newsletterContent] });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: 'false', error: error.message });
	}
});

export default handler;
function normalizeOpenAIResponse(response: any): any[] | void {
	function extractArraySignature(inputString: string) {
		let start = 0;
		let end = inputString.length;

		while (
			start < end &&
			inputString[start] !== '[' &&
			inputString[start] !== ']'
		) {
			start++;
		}

		while (
			end > start &&
			inputString[end - 1] !== '[' &&
			inputString[end - 1] !== ']'
		) {
			end--;
		}

		return inputString.substring(start, end);
	}
	try {
		console.info('openai response: ', response);
		console.info('typeof response ', typeof response);

		response = JSON.parse(extractArraySignature(response));
		console.info('typeof parsed response ', typeof response);

		let normalizedResponse = [];
		if (Array.isArray(response)) {
			console.info(' is array');
			normalizedResponse = response;
		} else if (response?.articles) {
			normalizedResponse = response.articles;
		} else {
			console.info(' is object');
			normalizedResponse = Object.values(response);
		}
		console.info('normalizedResponse: ', normalizedResponse);
		return normalizedResponse;
	} catch (error) {
		console.error('Unexpected openai response format:', response);
		throw new Error('Unexpected openai response format');
	}
}
