import { NextSeo, type NextSeoProps } from 'next-seo';
import app from './app';

const SEOMetaTags = ({
	title,
	description,
	additionalMetaTags = [],
	additionalLinkTags = [],
	additionalKeywords = [],
	openGraph = {},
	twitter = {},
	...props
}: NextSeoProps & { additionalKeywords?: string[] }) => {
	return (
		<NextSeo
			title={title || app.name}
			description={description || app.description}
			additionalMetaTags={[
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0',
				},
				{
					name: 'keywords',
					content: [
						'weed',
						'cannabis',
						'delivery',
						'cannabis friendly events',
						'weed friendly events',
						'legal weed',
						'legal cannabis',
						'buy weed online',
						'cannabis delivery service',
						'cannabis delivery near me',
						'weed delivery',
						'weed delivery near me',
						'cannabis delivery new york',
						'weed delivery new york',
						...additionalKeywords,
					].join(', '),
				},
				{
					name: 'msapplication-TileColor',
					content: '#000000',
				},
				{
					name: 'theme-color',
					content: '#000',
				},
				{
					property: 'charSet',
					content: 'utf-8',
				},
				...additionalMetaTags,
			]}
			openGraph={{
				...app.opengraph,
				...openGraph,
				images: [...(openGraph.images || []), ...app.opengraph.images],
			}}
			twitter={{
				cardType: 'summary_large_image',
				site: '@gras_cannabis',
				handle: '@gras_cannabis',
				...twitter,
			}}
			additionalLinkTags={[
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
				// 	rel: 'manifest',
				// 	href: '/manifest.json',
				// },
				// {
				// 	rel: 'preload',
				// 	href: 'https://www.test.ie/font/sample-font.woff2',
				// 	as: 'font',
				// 	type: 'font/woff2',
				// 	crossOrigin: 'anonymous',
				// },
				...additionalLinkTags,
			]}
			{...props}
		/>
	);
};
export default SEOMetaTags;
