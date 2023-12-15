import { Page } from '@cd/ui-lib';
import HeroPost from 'components/HeroPost';
import IndexPageHead from 'components/IndexPageHead';
import MoreStories from 'components/MoreStories';
import type { Post, Settings } from 'lib/sanity.queries';
import Posts from './Posts';

export interface IndexPageProps {
	preview?: boolean;
	loading?: boolean;
	posts: Post[];
	settings: Settings;
}

export default function IndexPage(props: IndexPageProps) {
	const { posts, settings } = props;
	const [heroPost, ...morePosts] = posts || [];

	return (
		<Page className={'bg-inherit p-8 min-h-[660px]'}>
			<IndexPageHead settings={settings} />
			{heroPost && (
				<HeroPost
					title={heroPost.title}
					mainImage={heroPost.mainImage}
					date={heroPost.date}
					author={heroPost.author}
					slug={heroPost.slug}
					excerpt={heroPost.excerpt}
				/>
			)}
			<Posts posts={morePosts} />
			{morePosts.length > 0 && <MoreStories posts={morePosts} />}
		</Page>
	);
}
