/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Page, type LayoutContextProps } from '@cd/ui-lib';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import Head from 'next/head';
import { Post as PostComponent } from '../../components';
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
		<Page className={'bg-inherit'}>
			<Head>
				<meta
					property="og:image"
					content={urlForImage(post?.shareImage)?.url()}
				/>
				<meta
					name="twitter:image"
					content={urlForImage(post?.shareImage)?.url()}
				/>
			</Head>
			<PostComponent post={post} />
		</Page>
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

ProjectSlugRoute.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});
