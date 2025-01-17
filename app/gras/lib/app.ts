import { LocalePrefix } from "next-intl/routing";
import packageInfo from '../package.json';
import {publicUrl} from './env';

const localePrefix: LocalePrefix = 'always';

const title = 'Find cannabis friendly events at Gras.Live';
const description =
	'Discover the best events, flower, and shops to celebrate cannabis near you. Order online, find your faves and explore.';

const app = {
	version: packageInfo.version,
	name: title,
	description,
	logoUrl: require('../public/logo.png'),
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
	locales: [
		{
		  id: 'en',
		  name: 'English',
		},
		{ id: 'fr', name: 'Français' },
		{ id: 'es', name: 'Español' },
		{ id: 'de', name: 'Deutsch' },
	  ],
	defaultLocale: 'en',
	localePrefix,
};

export default app;
export const allLocales = app.locales.map((locale) => locale.id);