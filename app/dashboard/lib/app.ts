import packageInfo from '../package.json';
import env from './env';

const app = {
	version: packageInfo.version,
	name: 'Dispensary Success Services from Gras',
	description:
		'We help your dispensary grow with deliver, marketing, automation and more. ',
	logoUrl: require('../public/logo.png'),
	url: env.appUrl,
	opengraph: {
		image:
			'https://f5d8da031790bc54-image-dispensary.s3.amazonaws.com/gras/Gras-og.png',
		title: 'Dispensary Success Services from Gras',
	},
};

export default app;
