/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { axios } from '@cd/core-lib';
import { createClient } from 'next-sanity';
import NodeCache from 'node-cache';
import {
	urlForImage,
	getPostById,
	setPostPublishedToSocialMedia,
} from '@/lib/sanity';
import { createImageClient } from '@/lib/sanity/sanity-next-social-image-generator';
import logo from '../../../public/wordmark.png';

const idempotencyCache = new NodeCache({ stdTTL: 86400 });
const client = createClient({
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	token: process.env.SANITY_API_EDITOR_TOKEN,
	useCdn: true,
});

const redisUrl = `redis://default:${process.env.REDIS_IMAGE_PREVIEW_PASSWORD}@${process.env.REDIS_IMAGE_PREVIEW}:${process.env.REDIS_IMAGE_PREVIEW_PORT}`;

const imageClient = createImageClient({
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	redisUrl,
	token: process.env.SANITY_API_EDITOR_TOKEN,
});

// new posts in sanity data lake will trigger this endpoint, to create a social media shareImage, and share to social media via Make Webhook
export default async function generateSocialMediaPost(req: any, res: any) {
	const { imageUrl, isPublishedToSocialMedia, text, _id, _type } = req.body;

	console.info(
		' /blog/api/generate-social-media-post received a request: ',
		req.body
	);

	const idempotencyKey = req.headers['idempotency-key'];
	console.info('idempotencyKey: ', idempotencyKey);

	if (idempotencyCache.has(idempotencyKey)) {
		console.info('idempotencyKey exists. do nothing.');
		return res.status(200).send({ success: 'true' });
	} else {
		console.info('idempotencyKey does not exist. caching the key.');
		idempotencyCache.set(idempotencyKey, idempotencyKey);
	}

	if (!isPublishedToSocialMedia) {
		try {
			console.info(' generating social media share image.. for', _type, _id);
			console.info(' applying text: ', text);

			const generateShareImage = await imageClient.generateImage({
				id: _id,
				backgroundImageUrl: imageUrl,
				text,

				blur: 4,
				darken: 28,

				height: 2000,
				width: 2000,

				backgroundFit: 'cover',
				fontSize: 130,
				fontName: 'Arial Black',

				logoWidth: 600,
				logo: new URL(logo.src, process.env.NEXT_PUBLIC_BLOG_APP_URL!).href,
				logoPosition: 'bottomRight',
			});

			console.info(
				' generated image for',
				_type,
				_id,
				'generated: ',
				generateShareImage
			);
		} catch (e: any) {
			console.error(
				'Error generating social media image: ',
				_type,
				_id,
				e.message
			);
			return res.status(500).send(e.message);
		}

		try {
			console.info(' sending payload to create social media post');
			// wait 30 seconds for the image to be generated
			await new Promise((resolve) => setTimeout(resolve, 30000));

			const post = await getPostById(client, _id);

			const { title, slug, excerpt, mainImageAsset, shareImage, contentUrl } =
				post;

			// post to automation webhook that will use Buffer API to publish posts
			const result = await axios.post(
				process.env.MAKE_GENERATE_SOCIAL_POST_WEBHOOK!,
				{
					_id,
					_type,
					title,
					slug,
					excerpt,
					mainImage: mainImageAsset.url,
					shareImage: urlForImage(shareImage)!.url(),
					contentUrl,
				}
			);
			console.info(' result from make webhook: ', result.data);

			await setPostPublishedToSocialMedia(client, _id);
			console.info(' successfully created social media post: ' + title);

			return res.status(200).send({ success: 'true' });
		} catch (e: any) {
			console.error(
				'Error generating social media post: ',
				_type,
				_id,
				e.message
			);
			return res.status(500).send(e.message);
		}
	}
	return res.status(200).send({ success: 'true' });
}
