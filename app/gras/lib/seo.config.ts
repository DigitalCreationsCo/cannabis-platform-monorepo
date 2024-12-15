import keywords from '@cd/core-lib/seo';
import { type NextSeoProps } from 'next-seo';
import app from './app';

const seoConfig: NextSeoProps = {
	title: app.name,
	description: app.description,
	additionalMetaTags: [
		{
			name: 'keywords',
			content: keywords['cannabis'].join(', '),
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1.0',
		},
		{
			name: 'msapplication-TileColor',
			content: '#000000',
		},
		{
			name: 'theme-color',
			content: '#FAF2C8',
		},
		{
			property: 'charSet',
			content: 'utf-8',
		},
	],
	openGraph: app.opengraph,
	twitter: {
		cardType: 'summary_large_image',
		site: '@gras_cannabis',
		handle: '@gras_cannabis',
	},
	additionalLinkTags: [
		{
			rel: 'shortcut icon',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '57x57',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '60x60',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '72x72',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '76x76',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '114x114',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '120x120',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '144x144',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '152x152',
			href: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '16x16',
			href: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '32x32',
			href: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '96x96',
			href: '/favicon.ico',
		},
		{
			rel: 'icon',
			sizes: '192x192',
			href: '/favicon.ico',
		},
		{
			rel: 'icon',
			href: 'https://www.test.ie/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			href: 'https://www.test.ie/touch-icon-ipad.jpg',
			sizes: '76x76',
		},
		// {
		//   rel: 'manifest',
		//   href: '/manifest.json',
		// },
		// {
		//   rel: 'preload',
		//   href: 'https://www.test.ie/font/sample-font.woff2',
		//   as: 'font',
		//   type: 'font/woff2',
		//   crossOrigin: 'anonymous',
		// },
	],
};

export default seoConfig;
