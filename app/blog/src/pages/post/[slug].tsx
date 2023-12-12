/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { showTime } from '@cd/core-lib';
import { PortableText } from '@portabletext/react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import Head from 'next/head';
import Image from 'next/image';

import { readToken } from '../../lib/sanity.api';
import { getClient } from '../../lib/sanity.client';
import { urlForImage } from '../../lib/sanity.image';
import {
	getPost,
	type Post,
	postBySlugQuery,
	postSlugsQuery,
} from '../../lib/sanity.queries';
import type { SharedPageProps } from '../_app';

interface Query {
	[key: string]: string;
}

export const getStaticProps: GetStaticProps<
	SharedPageProps & {
		post: Post;
	},
	Query
> = async ({ draftMode = false, params = {} }) => {
	const client = getClient(draftMode ? { token: readToken } : undefined);
	const post = await getPost(client, params.slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			draftMode,
			token: draftMode ? readToken : '',
			post,
		},
	};
};

export default function ProjectSlugRoute(
	props: InferGetStaticPropsType<typeof getStaticProps>,
) {
	const [post] = useLiveQuery(props.post, postBySlugQuery, {
		slug: props.post.slug.current,
	});

	return (
		<div>
			<Head>
				<meta
					property="og:image"
					content={urlForImage(post?.shareImage)!.url()}
				/>
				<meta
					name="twitter:image"
					content={urlForImage(post?.shareImage)!.url()}
				/>
			</Head>
			<section className="post">
				{post.mainImage ? (
					<Image
						className="post__cover"
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						src={urlForImage(post.mainImage)!.url()}
						height={231}
						width={367}
						alt=""
					/>
				) : (
					<div className="post__cover--none" />
				)}
				<div className="post__container">
					<h1 className="post__title">{post.title}</h1>
					<p className="post__excerpt">{post.excerpt}</p>
					<p className="post__date">{showTime(post._createdAt)}</p>
					<div className="post__content">
						<PortableText value={post.body} />
					</div>
				</div>
			</section>
		</div>
	);
}

export const getStaticPaths = async () => {
	const client = getClient();
	const slugs = await client.fetch(postSlugsQuery);
	return {
		paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
		fallback: 'blocking',
	};
};
