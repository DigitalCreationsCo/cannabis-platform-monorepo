/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Head from 'next/head';
import BlogMeta from 'components/BlogMeta';
import * as demo from 'lib/demo.data';
import { urlForImage } from 'lib/sanity.image';
import { type Post, type Settings } from 'lib/sanity.queries';

export interface PostPageHeadProps {
	settings: Settings;
	post: Post;
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
	const title = settings.title ?? demo.title;
	return (
		<Head>
			<title>{post.title ? `${post.title} | ${title}` : title}</title>
			<BlogMeta />
			{post.mainImage?.assetId && (
				<meta
					property="og:image"
					content={urlForImage(post.mainImage)!
						.width(1200)
						.height(627)
						.fit('crop')
						.url()}
				/>
			)}
		</Head>
	);
}
