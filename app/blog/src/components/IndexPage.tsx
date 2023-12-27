import { Page } from '@cd/ui-lib';
import HeroPost from 'components/HeroPost';
import IndexPageHead from 'components/IndexPageHead';
import type { Post, Settings } from 'lib/sanity.queries';
import BlogHeader from './BlogHeader';
import MorePosts from './MorePosts';
import MoreStories from './MoreStories';

export interface IndexPageProps {
	preview?: boolean;
	loading?: boolean;
	posts: Post[];
	settings: Settings;
}

export default function IndexPage(props: IndexPageProps) {
	const { posts, settings } = props;
	const [heroPost, ...morePosts] = posts || [];
	const { title = '', description = '' } = settings || {};

	return (
		<Page className={'bg-inherit lg:mx-32 min-h-[660px] border'}>
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
				/>
			)}
			{morePosts.length > 0 && <MorePosts posts={morePosts} />}
			{/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
		</Page>
	);
}
