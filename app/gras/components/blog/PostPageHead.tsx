/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Head from 'next/head';
import BlogMeta from '@/components/blog/BlogMeta';
import * as demo from '@/lib/sanity/demo.data';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { type Post, type Settings } from '@/lib/sanity/sanity.queries';

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
			{post.shareImage?.asset?._ref && (
				<meta
					property="og:image"
					content={urlForImage(post.shareImage)!
						.width(1200)
						.height(627)
						.fit('crop')
						.url()}
				/>
			)}
			{
				<meta
					name="twitter:image"
					content={urlForImage(post?.shareImage)?.url()}
				/>
			}
		</Head>
	);
}
