import { replaceRelativePath } from '@cd/core-lib';
import { createImageClient } from 'sanity-next-social-image-generator';
import logo from '../../../public/logo.png';

// const redisUrl = redis://default:*******@redis-14623.c238.us-central1-2.gce.cloud.redislabs.com:xxxxx
const redisUrl = `redis://default:${process.env.REDIS_IMAGE_PREVIEW_PASSWORD}@${process.env.REDIS_IMAGE_PREVIEW}:${process.env.REDIS_IMAGE_PREVIEW_PORT}`;

// Create the client
const client = createImageClient({
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	redisUrl,
	token: process.env.SANITY_API_EDITOR_TOKEN,
});

export default async function generatePreviewImage(req, res) {
	// Generate the image when Sanity's webhook hits your API
	const { imageUrl, text, _id, _type } = req.body;
	try {
		const generated = await client.generateImage({
			id: _id,
			backgroundImageUrl: imageUrl,
			text,

			blur: 3,
			darken: 40,
			backgroundFit: 'cover',
			height: 1200,
			width: 1200,
			fontSize: 100,
			fontName: 'Arial Black',

			logo: new URL(logo.src, process.env.NEXT_PUBLIC_BLOG_APP_URL as string)
				.href,
			logoPosition: 'bottomRight',
		});
		console.info('generated image for', _id, _type, 'generated', generated);
		res.status(200).send('Ok');
	} catch (e) {
		console.error('Error generating image for', _type, _id, e.message);
		res.status(500).send(e);
	}
}
