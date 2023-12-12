import { createImageClient } from 'sanity-next-social-image-generator';
import logo from '../../../public/logo.png';

// const redisUrl = redis://default:*******@redis-14623.c238.us-central1-2.gce.cloud.redislabs.com:xxxxx
const redisUrl = `redis://default:${process.env.REDIS_IMAGE_PREVIEW_PASSWORD}@${process.env.REDIS_IMAGE_PREVIEW}:${process.env.REDIS_IMAGE_PREVIEW_PORT}`;
// Create the client
const client = createImageClient({
	dataset: 'production',
	projectId: process.env.SANITY_PROJECT_ID,
	redisUrl,
	token: process.env.SANITY_READ_WRITE_TOKEN,
});

export default async function generatePreviewImage(req, res) {
	// Generate the image when Sanity's webhook hits your API
	const { imageUrl, text, _id, _type } = req.body;
	try {
		await client.generateImage({
			id: _id,
			backgroundImageUrl: imageUrl,
			text,
			blur: 10,
			darken: 50,
			logo,
			logoPosition: 'bottomRight',
		});
		res.status(200).send('Ok');
	} catch (e) {
		res.status(500).send(e);
	}
}
