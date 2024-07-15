import { Page, PlainTopBar } from '@cd/ui-lib';
import HeroPost from '@/components/blog/HeroPost';
import IndexPageHead from '@/components/blog/IndexPageHead';
import type { Post, Settings } from '@/lib/sanity';
import BlogHeader from './BlogHeader';
import MorePosts from './MorePosts';
import { BlogTopBar } from '.';

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
		<Page className="m-0 p-0 md:p-0 lg:p-0 bg-gradient-to-b from-10% from-secondary-light to-secondary">
			<PlainTopBar className="bg-transparent text-light" />
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
