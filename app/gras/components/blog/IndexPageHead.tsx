import app from '@/lib/app';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { toPlainText } from '@portabletext/react';
import { urlForImage, type Post, type Settings } from '@/lib/sanity';
import * as demo from '@/lib/sanity/demo.data';

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
		//
		<SEOMetaTags
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
		/>
	);
}
