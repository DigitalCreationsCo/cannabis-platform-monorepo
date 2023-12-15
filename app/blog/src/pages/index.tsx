import { type LayoutContextProps, Page } from '@cd/ui-lib';
import { type GetStaticProps, NextApiResponse } from 'next';
import PreviewIndexPage from 'components/PreviewIndexPage';
import Posts from '../components/Posts';
import { readToken } from '../lib/sanity.api';
import { getClient, getPosts, getSettings } from '../lib/sanity.client';
import { type Post, type Settings } from '../lib/sanity.queries';
import type { SharedPageProps } from './_app';

interface DirectoryProps extends SharedPageProps {
	posts: Post[];
	settings: Settings;
}

interface Query {
	[key: string]: string;
}

export default function BlogDirectory(props: DirectoryProps) {
	if (props.draftMode && props.token) {
		return <PreviewIndexPage posts={props.posts} settings={props.settings} />;
	}

	return (
		<Page className={'bg-inherit p-8 min-h-[660px]'}>
			<Posts posts={props.posts} />
		</Page>
	);
}

export const getStaticProps: GetStaticProps<DirectoryProps, Query> = async (
	ctx,
) => {
	const { draftMode = false } = ctx;
	const client = getClient(draftMode ? { token: readToken } : undefined);

	const [settings, posts = []] = await Promise.all([
		getSettings(client),
		getPosts(client),
	]);

	return {
		props: {
			posts,
			settings,
			draftMode,
			token: draftMode ? readToken : '',
		},
	};
};

BlogDirectory.getLayoutContext = (): LayoutContextProps => ({
	showSideNav: true,
	showSearch: false,
});
