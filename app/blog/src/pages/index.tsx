/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { type LayoutContextProps, Page, Grid, H1, Carousel } from '@cd/ui-lib';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import { readToken } from 'lib/sanity.api';
import { InfoCard } from '../components';
import { getClient } from '../lib/sanity.client';
import { getPosts, type Post, postsQuery } from '../lib/sanity.queries';
import type { SharedPageProps } from './_app';

function BlogDirectory(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery);

	return (
		<Page className={'bg-inherit px-8'}>
			<Grid className="grid-flow-col-dense auto-cols-min auto-rows-min gap-4">
				{posts.length ? (
					posts.map((post) => <InfoCard key={post._id} data={post} />)
				) : (
					<div>Welcome. There no posts here.</div>
				)}
			</Grid>
		</Page>
	);
}

export default BlogDirectory;

BlogDirectory.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

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
