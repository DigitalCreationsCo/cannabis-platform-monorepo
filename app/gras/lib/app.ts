import packageInfo from '../package.json';
import env from './env';

const app = {
  version: packageInfo.version,
  name: 'Find the best weed experiences near you. Grascannabis.org',
  description:
    'Gras helps you find the best weed experiences, edibles, and dispensaries to celebrate cannabis near you. Order weed for delivery and pickup. View stores, store hours, and more.',
  logoUrl: require('../public/logo.png'),
  url: env.appUrl,
  opengraph: {
    image:
      'https://f5d8da031790bc54-image-dispensary.s3.amazonaws.com/gras/Gras-og.png',
    title: 'Find the best weed experiences near you. Grascannabis.org',
  },
};

export default app;
