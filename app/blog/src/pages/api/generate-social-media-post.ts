import { createClient } from 'next-sanity';
import { createImageClient } from 'sanity-next-social-image-generator';
import logo from '../../../public/logo.png';
import { type Post } from '../../lib/sanity.queries';

const client = createClient({
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	token: process.env.SANITY_API_EDITOR_TOKEN,
	useCdn: true,
});

// const redisUrl = redis://default:*******@redis-14623.c238.us-central1-2.gce.cloud.redislabs.com:xxxxx
const redisUrl = `redis://default:${process.env.REDIS_IMAGE_PREVIEW_PASSWORD}@${process.env.REDIS_IMAGE_PREVIEW}:${process.env.REDIS_IMAGE_PREVIEW_PORT}`;

const imageClient = createImageClient({
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	redisUrl,
	token: process.env.SANITY_API_EDITOR_TOKEN,
});

// new posts in sanity data lake will trigger this endpoint, to create a social media shareImage, and share to social media via Make Webhook
export default async function generateSocialMediaPost(req: any, res: any) {
	// Generate the image when Sanity's webhook hits your API
	const { imageUrl, text, _id, _type } = req.body;
	try {
		console.info(' generating social media share image.. for', _type, _id);

		const generateShareImage = await imageClient.generateImage({
			id: _id,
			backgroundImageUrl: imageUrl,
			text,

			blur: 3,
			darken: 32,

			height: 1400,
			width: 1400,

			backgroundFit: 'cover',
			fontSize: 90,
			fontName: 'Arial Black',

			logo: new URL(logo.src, process.env.NEXT_PUBLIC_BLOG_APP_URL as string)
				.href,
			logoPosition: 'bottomRight',
		});

		console.info(
			' generated image for',
			_type,
			_id,
			'generated: ',
			generateShareImage,
		);
		res.status(200).send('Ok');

		console.info(' sending post payload to create social media post');

		// wait 30 seconds for the image to be generated
		await new Promise((resolve) => setTimeout(resolve, 30000));

		const post = (await client.getDocument(_id)) as Post;
		console.info(' fetched post from sanity', post);
		const { title, slug, excerpt, mainImage, shareImage } = post;
		console.info('image url: ', shareImage.url);

		const contentUrl = resolveUrl(`/post/${slug}`);

		// post to automation webhook that will use Buffer API to publish posts
		// await axios.post(process.env.MAKE_GENERATE_SOCIAL_POST_WEBHOOK as string, {
		// 	_id,
		// 	_type,
		// 	title,
		// 	slug: slug.current,
		// 	excerpt,
		// 	mainImage: mainImage.url || '',
		// 	shareImage: shareImage.url,
		// 	contentUrl,
		// });
	} catch (e) {
		console.error('Error generating image for', _type, _id, e.message);
		res.status(500).send(e);
	}
}

function resolveUrl(href = '/') {
	return process.env.NODE_ENV === 'production'
		? `${process.env.NEXT_PUBLIC_BLOG_APP_URL}${href}`
		: `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/blog${href}`;
}
