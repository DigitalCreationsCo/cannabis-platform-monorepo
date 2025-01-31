import packageInfo from '../../package.json';
import {publicUrl} from './env';

const title = 'Find cannabis events at Gras.Live';
const description =
	'Discover the best events, flower, and shops to celebrate cannabis near you. Order online, find your faves and explore.';

const app = {
	version: packageInfo.version,
	name: title,
	description,
	logoUrl: '../public/logo.png',
	url: publicUrl,
	opengraph: {
		siteName: title,
		url: publicUrl,
		title,
		type: 'website',
		description,
		images: [
			{
				url: 'https://f5d8da031790bc54-image-dispensary.s3.amazonaws.com/gras/Gras-og.png',
				alt: title,
				width: 300,
				type: 'image/png',
			},
		],
	},
};

export default app;