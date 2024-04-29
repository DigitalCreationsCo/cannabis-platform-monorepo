import packageInfo from '../package.json';
import env from './env';

const app = {
  version: packageInfo.version,
  name: 'Dispensary Success Services | Gras',
  description: "Serving People and Cannabis",
  logoUrl: require('../public/logo.png'),
  url: env.appUrl,
  opengraph: {
    image: "https://storage.googleapis.com/38d6acd65b23d751-image-dispensary/gras/Gras%20(2).png",
    title: "Grascannabis.org | Serving People and Cannabis"
  }
};

export default app;
