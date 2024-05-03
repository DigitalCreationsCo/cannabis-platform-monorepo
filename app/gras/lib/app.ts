import packageInfo from '../package.json';
import env from './env';

const app = {
  version: packageInfo.version,
  name: 'Gras',
  description:
    'Order the best weed for delivery and pickup near you. Find cannabis stores, Store Hours, and more.',
  logoUrl: require('../public/logo.png'),
  url: env.appUrl,
  opengraph: {
    image:
      'https://f5d8da031790bc54-image-dispensary.s3.amazonaws.com/gras/Gras-og.png',
    title: 'Gras | Serving People and Cannabis',
  },
};

export default app;
