import SEOMetaTags from '@/lib/SEOMetaTags';
import { toPlainText } from '@portabletext/react';
import { type Settings } from '@/lib/sanity';
import * as demo from '@/lib/sanity/demo.data';

export interface IndexPageHeadProps {
	settings: Settings;
}

export default function IndexPageHead({ settings }: IndexPageHeadProps) {
	const {
		title = demo.title,
		description = demo.description,
		ogImage = {},
	} = settings;
	const ogImageTitle = ogImage?.title || demo.ogImageTitle;

	return (
		<SEOMetaTags
			title={title}
			description={toPlainText(description)}
			openGraph={{
				images: [
					{
						url: `${
							process.env.NEXT_PUBLIC_SHOP_APP_URL
						}/api/og?${new URLSearchParams({ title: ogImageTitle })}`,
					},
				],
			}}
		/>
	);
}
