import app from '@/lib/app';
import { toPlainText } from '@portabletext/react';
import { NextSeo } from 'next-seo';
import { urlForImage, type Post, type Settings } from '@/lib/sanity';
import * as demo from '@/lib/sanity/demo.data';
import seoConfig from '@/lib/seo.config';

export interface IndexPageHeadProps {
	heroPost: Post;
	settings: Settings;
}

export default function IndexPageHead({
	heroPost,
	settings,
}: IndexPageHeadProps) {
	const {
		title = demo.title,
		description = demo.description,
		ogImage = {},
	} = settings;
	// not used
	const ogImageTitle = ogImage?.title || demo.ogImageTitle;

	return (
		<NextSeo
			title={title}
			description={toPlainText(description)}
			openGraph={{
				url: `${app.name}/blog`,
				title: title,
				type: 'website',
				description: `Read ${heroPost.title} at ${app.name}/blog | ${toPlainText(description)}`,
				images: [
					{
						url: urlForImage(heroPost.mainImage)!.url(),
						alt: `Read ${heroPost.title} at ${app.name}/blog`,
						width: 300,
					},
				],
				siteName: `${app.name}/blog`,
			}}
			twitter={seoConfig.twitter}
			additionalLinkTags={seoConfig.additionalLinkTags}
		/>
	);
}
