import packageInfo from '../package.json';
import env from './env';

const app = {
	version: packageInfo.version,
	name: 'Dispensary Success Services | Gras',
	description: 'Serving People and Cannabis',
	logoUrl: require('../public/logo.png'),
	url: env.appUrl,
	opengraph: {
		image:
			'https://f5d8da031790bc54-image-dispensary.s3.amazonaws.com/gras/Gras-og.png',
		title: 'Grascannabis.org | Serving People and Cannabis',
	},
};

export default app;
