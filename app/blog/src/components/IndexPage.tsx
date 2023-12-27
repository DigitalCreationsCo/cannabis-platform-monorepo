import { type LayoutContextProps, Page } from '@cd/ui-lib';
import HeroPost from 'components/HeroPost';
import IndexPageHead from 'components/IndexPageHead';
import type { Post, Settings } from 'lib/sanity.queries';
import BlogHeader from './BlogHeader';
import MorePosts from './MorePosts';

export interface IndexPageProps {
	preview?: boolean;
	loading?: boolean;
	posts: Post[];
	settings: Settings;
}

function IndexPage(props: IndexPageProps) {
	const { posts, settings } = props;
	const [heroPost, ...morePosts] = posts || [];
	const { title = '', description = '' } = settings || {};

	return (
		<Page className={'bg-inherit xl:mx-32 min-h-[660px]'}>
			<IndexPageHead settings={settings} />
			<BlogHeader
				title={title}
				description={description as string[]}
				level={1}
			/>
			{heroPost && (
				<HeroPost
					title={heroPost.title}
					mainImage={heroPost.mainImage}
					_createdAt={heroPost._createdAt}
					author={heroPost.author}
					slug={heroPost.slug}
					excerpt={heroPost.excerpt}
					categories={heroPost.categories}
				/>
			)}
			{morePosts.length > 0 && <MorePosts posts={morePosts} />}
		</Page>
	);
}

export default IndexPage;
