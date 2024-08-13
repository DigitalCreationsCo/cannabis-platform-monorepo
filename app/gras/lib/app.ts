import packageInfo from '../package.json';
import env from './env';

const url = env.appUrl;
const title = 'Find cannabis friendly events at Gras.Live';
const description =
	'Discover the best events, flower, and shops to celebrate cannabis near you. Order online, find your faves and explore.';

const app = {
	version: packageInfo.version,
	name: title,
	description,
	logoUrl: require('../public/logo.png'),
	url,
	opengraph: {
		siteName: title,
		url,
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
		// locale: "en_US"
	},
};

export default app;
