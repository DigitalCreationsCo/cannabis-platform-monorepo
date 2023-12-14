import { type LayoutContextProps, Page } from '@cd/ui-lib';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import dynamic from 'next/dynamic';
import { PreviewPosts } from '../components';
import Posts from '../components/Posts';
import { readToken } from '../lib/sanity.api';
import { getClient } from '../lib/sanity.client';
import { getPosts, type Post, postsQuery } from '../lib/sanity.queries';
import type { SharedPageProps } from './_app';

const PreviewProvider = dynamic(() => import('../components/PreviewProvider'));

export const getStaticProps: GetStaticProps<
	SharedPageProps & {
		posts: Post[];
	}
> = async ({ draftMode = false }) => {
	const client = getClient(draftMode ? { token: readToken } : undefined);
	const posts = await getPosts(client);
	return {
		props: {
			draftMode,
			token: draftMode ? readToken : '',
			posts,
		},
	};
};

function BlogDirectory(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery);

	console.info('draftMode', props.draftMode);
	console.info('token', props.token);
	if (props.draftMode && props.token) {
		return (
			<PreviewProvider previewToken={props.token} draftMode={props.draftMode}>
				<PreviewPosts posts={posts} />
				<div className="prose prose-blue p-8">
					<a href="/api/disable-draft">Exit preview</a>
				</div>
			</PreviewProvider>
		);
	}

	return (
		<Page className={'bg-inherit p-8 min-h-[660px]'}>
			<Posts posts={posts} />
		</Page>
	);
}

export default BlogDirectory;

BlogDirectory.getLayoutContext = (): LayoutContextProps => ({
	showSideNav: true,
	showSearch: false,
});
