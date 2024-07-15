import { Footer } from '@cd/ui-lib';
import { type GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement } from 'react';
import { PostPage, PreviewPostPage } from '@/components/blog';
import {
	getAllPostsSlugs,
	getClient,
	getPostAndMoreStories,
	getSettings,
	type Post,
	type Settings,
} from '@/lib/sanity';
import { readToken } from '@/lib/sanity/sanity.api';
import { type SharedPageProps } from '../../_app';

interface PageProps extends SharedPageProps {
	post: Post;
	morePosts: Post[];
	settings?: Settings;
}

type Query = Record<string, string>;

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
		getPostAndMoreStories(client, params.slug!),
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
	return (
		<>
			{page}
			<Footer />
		</>
	);
};
