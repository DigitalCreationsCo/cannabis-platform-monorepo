import { Page, type LayoutContextProps } from '@cd/ui-lib';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Post as PostComponent, PreviewPost } from '../../components';
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

const PreviewProvider = dynamic(
	() => import('../../components/PreviewProvider'),
);

export const getStaticPaths = async () => {
	const client = getClient();
	const slugs = await client.fetch(postSlugsQuery);
	return {
		paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
		fallback: 'blocking',
	};
};

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

	if (props.draftMode && props.token) {
		return (
			<PreviewProvider previewToken={props.token} draftMode={props.draftMode}>
				<PreviewPost post={post} />
				<div className="prose prose-lg px-4 prose-blue clear-both py-16 mx-auto">
					<a href="/api/disable-draft">Exit preview</a>
				</div>
			</PreviewProvider>
		);
	}

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

ProjectSlugRoute.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});
