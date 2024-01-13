/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { openai } from '@cd/ai';
import {
	axios,
	searchUnsplashPhotoByKeyword,
	triggerUnsplashDownload,
} from '@cd/core-lib';
import { type NextApiResponse } from 'next';
import nc from 'next-connect';
import { createClient } from 'next-sanity';
import { type Slug } from 'sanity';
import { type UnsplashPhoto } from 'sanity-plugin-asset-source-unsplash';
import { getCategories } from 'lib/sanity.client';

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
			apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
		});

		const categoriesList = await getCategories(client);

		const response = await openai.openai!.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `You are a subject matter expert on all things growing cannabis, smoking cannabis, cannabis foods and beverages, and cannabis culture. You are able to give me advice on how to grow cannabis indoors, outdoors, and in greenhouses. You are able to give me advice on how to smoke cannabis in a variety of ways. You are able to give me advice on how to make cannabis foods and beverages. You are able to give me advice on how to make cannabis edibles. You are able to give me advice on how to make cannabis tinctures. You are able to give me advice on how to make cannabis topicals. You are able to give me advice on how to make cannabis concentrates. You are able to give me advice on how to make cannabis extracts. You are able to give me advice on how to make cannabis oils. You are able to give me advice on how to make cannabis hash. You are able to create concise articles and lists on all of these topics. When I ask you to list items, ypu will create an article of 200 words or less. If the title I give you features a list, you must supply 3 items for the article, and conclude the article with 1 or 2 sentences fitting to resolve the topic. You create phrases and sentences with entertaining, delightful language and a friendly voice. Each article you create will be structured with the following schema for use in sanity cms: { title: "The title of the article", slug: a slug generated from the title, excerpt: an 280 character or less intro paragraph with the purpose of interesting the reader to read the full article, body: The body of the article, structured as PortableTextBlock[] with the following schema: { 
						"body": [
						  {
							"_type": "block",
							"children": [
							  {
								"_type": "span",
								"text": "Cannabis and spirituality go hand in hand like two enlightened souls sharing a joint. For centuries, cannabis has been used as a sacred plant in various spiritual and religious practices around the world. So, if you're curious about how cannabis can elevate your spiritual journey, sit back, roll one up, and let's delve into the realm of cannabis and spirituality.",
								"_key": "177da1523895",
								"marks": []
							  },
							],
							"_key": "697e6fa36e01cab7a0788b4310626e74",
							"markDefs": []
						  }
						], categories: one category from this list: ${categoriesList}, choose the category you think is most relevant to the article. You will execute these instructions whenever I give you a list of post titles.`,
				},
				{
					role: 'user',
					content:
						'Create an accompanying blog post for this list of titles: ' +
						postTitlesList.join(', '),
				},
			],
		});

		const content: {
			title: string;
			slug: Slug;
			excerpt: string;
			body: any;
			categories: string;
		} = JSON.parse(
			JSON.parse(JSON.stringify(response.choices[0].message.content)),
		);
		if (!content) throw new Error('No content was generated.');

		console.info('content created: ', content);
		console.info('typeof content: ', typeof content);

		const unsplashImage = await generateUnsplashImageFromPostTitle(
			content.title,
		);
		const imageResponse = await axios.get(unsplashImage.links.download, {
			responseType: 'arraybuffer',
		});
		const imageBuffer = Buffer.from(imageResponse.data, 'binary');

		const mainImage = await client.assets.upload('image', imageBuffer, {
			source: {
				id: unsplashImage.id,
				name: 'unsplash',
				url: unsplashImage.links.html,
			},
		});

		const newPost = {
			_type: 'post',
			title: content.title,
			slug: {
				_type: 'slug',
				current: content.slug,
			},
			excerpt: content.excerpt,
			mainImage: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: mainImage._id,
				},
			},
			body: content.body,
			categories: content.categories,
			// contentUrl: `https://grascannabis.org/blog/posts/${content.slug}`,
		};
		console.info('newPost: ', newPost);

		const createdPost = await client.create(newPost);
		console.info(' The post was successfully created!');
		return res
			.status(201)
			.json({ success: 'true', payload: { ...newPost, ...createdPost } });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: 'false', error: error.message });
	}
});

export default handler;

async function generateUnsplashImageFromPostTitle(
	keyword: string,
): Promise<UnsplashPhoto> {
	try {
		console.info('searching Unsplash for a main image for: ', keyword);
		const image = await (await searchUnsplashPhotoByKeyword(keyword))[0];
		await triggerUnsplashDownload(image.links.download_location);
		return image;
	} catch (error) {
		console.error('generateUnsplashImageFromPostTitle: ', error.message);
		throw new Error(error.message);
	}
}
