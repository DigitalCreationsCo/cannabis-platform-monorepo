import packageInfo from '../package.json';
import env from './env';

const url = env.appUrl;
const title = 'Find cannabis-friendly experiences events at gras.live';
const description =
	'Find the best flower, edibles, and dispensaries to celebrate cannabis near you. Order weed for delivery and pickup. View stores, events, and explore.';

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
