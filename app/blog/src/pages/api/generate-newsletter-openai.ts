/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { openai } from '@cd/ai';
import { type NextApiResponse } from 'next';
import nc from 'next-connect';
import { createClient } from 'next-sanity';
import { BrevoMailer } from 'lib/brevo-mailer';
import { getNonPublishedPosts } from 'lib/sanity.client';
import { type Post } from 'lib/sanity.queries';

// generate newsletter content combination with openai and cms content, by providing a list of article urls to the trained model.
const handler = nc();
handler.post(async (req: any, res: NextApiResponse) => {
	try {
		const NUM_ARTICLES_FOR_NEWSLETTER = 3;

		const {
			subject,
			articleUrlsList,
		}: { subject: string; articleUrlsList: string[] } = req.body;

		if (!articleUrlsList.length)
			throw new Error('Did not provide article urls list.');

		const response = await openai.openai!.chat.completions.create({
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
						footer: the sentence, "The full story is available here", the word here is a hyperlink to the article link,
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
		});

		const aiGeneratedContent = Object.values(
			JSON.parse(response.choices[0].message.content as string),
		) as {
			title: string;
			excerpt: string;
			mainImage: string;
			footer: string;
			link: string;
		}[];
		if (!aiGeneratedContent) throw new Error('No content was generated.');
		console.info('aiGeneratedContent: ', aiGeneratedContent);

		console.info(
			'NUM_ARTICLES_FOR_NEWSLETTER - generatedContent.length ',
			NUM_ARTICLES_FOR_NEWSLETTER - aiGeneratedContent.length,
		);

		const client = createClient({
			dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
			projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
			token: process.env.SANITY_API_EDITOR_TOKEN,
			useCdn: true,
			apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		});

		const blogContent: Post[] = await getNonPublishedPosts(
			client,
			NUM_ARTICLES_FOR_NEWSLETTER - aiGeneratedContent.length,
		);

		const normalizeBlogContent = blogContent.map((post) => ({
			title: post.title as string,
			excerpt: post.excerpt as string,
			mainImage: post.mainImage.url,
			footer: `More info available here.`,
			link: `https://grascannabis.org/blog/posts/${post.slug}`,
		}));

		const newsletterContent: {
			title: string;
			excerpt: string;
			mainImage: string;
			footer: string;
			link: string;
		}[] = [...aiGeneratedContent, ...normalizeBlogContent];

		const mailer = new BrevoMailer();
		await mailer.sendCampaign(subject, newsletterContent);

		return res
			.status(200)
			.json({ success: 'true', payload: [...newsletterContent] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: 'false', error: error.message });
	}
});

export default handler;
