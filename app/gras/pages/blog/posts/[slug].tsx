/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Footer, type LayoutContextProps } from '@cd/ui-lib';
import { GetServerSidePropsContext, type GetStaticProps } from 'next';
import {PostPage,PreviewPostPage} from '@/components/blog';
import { readToken } from '@/lib/sanity/sanity.api';
import {
	getAllPostsSlugs,
	getClient,
	getPostAndMoreStories,
	getSettings,
} from '@/lib/sanity';
import { type Post, type Settings } from '@/lib/sanity';
import { type SharedPageProps } from '../../_app';
import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
		paths: slugs?.map(({ slug }) => `/blog/posts/${slug}`) || [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
	const { draftMode = false, params = {}, locale } = ctx;

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
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
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

	return <PostPage post={post} morePosts={morePosts} settings={settings!} />;
}

// ProjectSlugRoute.getLayoutContext = (): LayoutContextProps => ({
// 	showHeader: false,
// 	showSideNavOnDesktop: false,
// });

ProjectSlugRoute.getLayout = function getLayout(page: ReactElement) {
	return <>{page}
		<Footer />
	</>;
  };
  