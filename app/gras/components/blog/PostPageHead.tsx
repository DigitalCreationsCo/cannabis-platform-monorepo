/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Head from 'next/head';
import * as demo from '@/lib/sanity/demo.data';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { type Post, type Settings } from '@/lib/sanity/sanity.queries';
import SEOMetaTags from '@/lib/SEOMetaTags';

export interface PostPageHeadProps {
  settings: Settings;
  post: Post;
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title ?? demo.title;
  return (
    <Head>
      <SEOMetaTags
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: `${process.env.NEXT_PUBLIC_BLOG_APP_URL}/posts/${post.slug}`,
          },
        ]}
        additionalKeywords={[...post.categories]}
        openGraph={{
          title: post.title ? `${post.title} | ${title}` : title,
          url: post.contentUrl,
          description: post.excerpt,
          article: {
            publishedTime: post._createdAt,
            modifiedTime: post._updatedAt,
            authors: [post.author.name],
            tags: post.categories,
          },
          images: [
            {
              url: urlForImage(post.shareImage)
                .width(1200)
                .height(627)
                .fit('crop')
                .url(),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }}
      />
      {/* {post.shareImage?.asset?._ref && (
				<meta
					property="og:image"
					content={urlForImage(post.shareImage)!
						.width(1200)
						.height(627)
						.fit('crop')
						.url()}
				/>
			)} */}
    </Head>
  );
}
