import packageInfo from '../package.json';
import env from './env';

const url = env.appUrl;
const title = 'Find the best weed experiences near you at Grascannabis.org';
const description =
  'Find the best weed experiences, edibles, and dispensaries to celebrate cannabis near you. Order weed for delivery and pickup. View stores, store hours, and more.';

const app = {
  version: packageInfo.version,
  name: title,
  description,
  logoUrl: require('../public/logo.png'),
  url,
  opengraph: {
    site_name: title,
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
