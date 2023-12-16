/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Page, type LayoutContextProps } from '@cd/ui-lib';
import { type GetStaticProps } from 'next';
import Head from 'next/head';
import { default as PostComponent } from 'components/Post';
import PreviewPostPage from 'components/PreviewPostPage';
import { readToken } from '../../lib/sanity.api';
import {
	getAllPostsSlugs,
	getClient,
	getPostAndMoreStories,
	getSettings,
} from '../../lib/sanity.client';
import { urlForImage } from '../../lib/sanity.image';
import { type Post, type Settings } from '../../lib/sanity.queries';
import { type SharedPageProps } from '../_app';

interface PageProps extends SharedPageProps {
	post: Post;
	morePosts: Post[];
	settings?: Settings;
}

interface Query {
	[key: string]: string;
}

export const getStaticPaths = async () => {
	const slugs = await getAllPostsSlugs();
	return {
		paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
	const { draftMode = false, params = {} } = ctx;

	const client = getClient(draftMode ? { token: readToken } : undefined);
	const [settings, { post, morePosts }] = await Promise.all([
		getSettings(client),
		getPostAndMoreStories(client, params.slug),
	]);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post,
			morePosts,
			settings,
			draftMode,
			token: draftMode ? readToken : '',
		},
	};
};

export default function ProjectSlugRoute(props: PageProps) {
	const { settings, post, morePosts, draftMode } = props;

	if (draftMode) {
		return (
			<PreviewPostPage post={post} morePosts={morePosts} settings={settings!} />
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
