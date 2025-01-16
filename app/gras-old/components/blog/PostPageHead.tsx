/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextSeo } from 'next-seo';
import * as demo from '@/lib/sanity/demo.data';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { type Post, type Settings } from '@/lib/sanity/sanity.queries';
import seoConfig from '@/lib/seo.config';

export interface PostPageHeadProps {
	settings: Settings;
	post: Post;
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
	const title = settings.title ?? demo.title;
	return (
		<NextSeo
			title={post.title ? `${post.title} | ${title}` : title}
			description={post.excerpt}
			additionalLinkTags={[
				...seoConfig.additionalLinkTags,
				{
					rel: 'canonical',
					href: `${process.env.NEXT_PUBLIC_SHOP_APP_URL}/blog/posts/${post.slug}`,
				},
			]}
			additionalMetaTags={[
				{
					name: 'keywords',
					content: []
						.concat(post.categories)
						.concat(post.title.split(' '))
						.concat(post.excerpt.split(' '))
						.join(', '),
				},
			]}
			openGraph={{
				title: post.title ? `${post.title} | ${title}` : title,
				url: post.contentUrl,
				description: post.excerpt,
				article: {
					publishedTime: post._createdAt,
					modifiedTime: post._updatedAt,
					authors: [post.author?.name ?? ''],
					tags: post.categories,
				},
				type: 'article',
				images: [
					post.shareImage
						? {
								url: urlForImage(post.shareImage)
									.width(1200)
									.height(627)
									.fit('crop')
									.url(),
								width: 1200,
								height: 630,
								alt: post.title,
							}
						: {
								url: urlForImage(post.mainImage)!.url(),
								width: 1200,
								height: 630,
								alt: post.title,
							},
				],
			}}
			twitter={seoConfig.twitter}
		/>
	);
}
