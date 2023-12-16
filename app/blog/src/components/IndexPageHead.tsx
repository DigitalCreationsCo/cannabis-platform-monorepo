import { toPlainText } from '@portabletext/react';
import Head from 'next/head';
import BlogMeta from 'components/BlogMeta';
import * as demo from 'lib/demo.data';
import { type Settings } from 'lib/sanity.queries';

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
		<Head>
			<title>{title}</title>
			<BlogMeta />
			<meta
				key="description"
				name="description"
				content={toPlainText(description)}
			/>
			<meta
				property="og:image"
				content={`${
					process.env.NEXT_PUBLIC_BLOG_APP_URL
				}/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
			/>
		</Head>
	);
}
