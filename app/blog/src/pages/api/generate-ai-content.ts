/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { openai } from '@cd/ai';
import { type NextApiResponse } from 'next';
import nc from 'next-connect';
import { createClient } from 'next-sanity';
import { getCategories } from 'lib/sanity.client';
import { type Post } from 'lib/sanity.queries';

// generate cms content with openai, by providing a list of post titles to the trained model.
const handler = nc();
handler.post(async (req: any, res: NextApiResponse) => {
	try {
		const { postTitlesList }: { postTitlesList: string[] } = req.body;

		if (!postTitlesList.length)
			throw new Error('Did not provide data in a list.');

		const client = createClient({
			dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
			projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
			token: process.env.SANITY_API_EDITOR_TOKEN,
			useCdn: true,
		});

		const categoriesList = await getCategories(client);

		const response = await openai.openai!.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `When I ask for help to write something, you will reply with a document that contains at least one joke or playful comment in every paragraph. You are a subject matter expert on all things growing cannabis, smoking cannabis, cannabis foods and beverages, and cannabis culture. You are able to give me advice on how to grow cannabis indoors, outdoors, and in greenhouses. You are able to give me advice on how to smoke cannabis in a variety of ways. You are able to give me advice on how to make cannabis foods and beverages. You are able to give me advice on how to make cannabis edibles. You are able to give me advice on how to make cannabis tinctures. You are able to give me advice on how to make cannabis topicals. You are able to give me advice on how to make cannabis concentrates. You are able to give me advice on how to make cannabis extracts. You are able to give me advice on how to make cannabis oils. You are able to give me advice on how to make cannabis hash. You are able to create concise articles and lists on all of these topics. When I ask you to list items, ypu will create an article of 200 words or less. If the title I give you features a list, you must supply 3 items for the article, and conclude the article with 1 or 2 sentences fitting to resolve the topic. You supply some alternative titles as well. You create phrases and sentences with entertaining, delightful language and a friendly voice. Each article you create is structured with the following schema for use in sanity cms: { _type: "post", title: "The title of the article", slug: a slug generated from the title, excerpt: an intro paragraph to prime the reader, body: The body of the article, structured as PortableTextBlock[], categories: one or more of the categories from this list: ${categoriesList}, choose the categories you think are most relevant to the article. You will execute these instructions when I give you a list of titles.`,
				},
				{
					role: 'user',
					content:
						'Create an accompanying blog post for this list of titles: ' +
						postTitlesList.join(', '),
				},
			],
		});

		console.info(' openai created a blog post');

		const { _type, title, slug, excerpt, body, categories } = response
			.choices[0].message as unknown as Post;

		const newPost = {
			_type,
			title,
			slug,
			excerpt,
			body,
			categories,
		} as Post;

		const createdPost = await client.create(newPost);

		return res.status(200).json({ success: 'true', payload: createdPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: 'false', payload: error.message });
	}
});

export default handler;
