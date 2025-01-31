import keywords from '@gras/core/src/keywords';
import app from './app';
import { Metadata } from 'next';

const seoConfig: Metadata = {
	title: app.name,
	description: app.description,
	keywords: keywords['cannabis'].join(', '),
	openGraph: app.opengraph,
	twitter: {
		card: 'summary_large_image',
		site: '@gras_cannabis',
		siteId: '@gras_cannabis',
	},
	icons: {
		shortcut: "/favicon.ico",
		icon: [

		{
			rel: 'icon',
			sizes: '16x16',
			url: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '32x32',
			url: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '96x96',
			url: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '192x192',
			url: '/favicon.ico',
		},
		{
			rel: 'icon',
			url: 'https://www.test.ie/favicon.ico',
		}],
		apple: [{
			rel: 'apple-touch-icon',
			sizes: '57x57',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '60x60',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '72x72',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '76x76',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '114x114',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '120x120',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '144x144',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '152x152',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '76x76',
			url: 'https://www.test.ie/touch-icon-ipad.jpg',
		}]
	}
};

export default seoConfig;
