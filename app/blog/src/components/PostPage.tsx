import { Page } from '@cd/ui-lib';
import { notFound } from 'next/navigation';
import MoreStories from 'components/MoreStories';
import PostBody from 'components/PostBody';
import PostHeader from 'components/PostHeader';
import PostPageHead from 'components/PostPageHead';
import PostTitle from 'components/PostTitle';
import SectionSeparator from 'components/SectionSeparator';
import type { Post, Settings } from 'lib/sanity.queries';

export interface PostPageProps {
	preview?: boolean;
	loading?: boolean;
	post: Post;
	morePosts: Post[];
	settings: Settings;
}

const NO_POSTS: Post[] = [];

export default function PostPage(props: PostPageProps) {
	const { preview, morePosts = NO_POSTS, post, settings } = props;

	const slug = post?.slug;

	if (!slug && !preview) {
		notFound();
	}

	return (
		<Page className={'bg-inherit p-8 min-h-[660px]'}>
			<PostPageHead settings={settings} post={post} />

			{preview && !post ? (
				<PostTitle>Loading…</PostTitle>
			) : (
				<>
					<article>
						<PostHeader
							title={post.title}
							mainImage={post.mainImage}
							_createdAt={post._createdAt}
							author={post.author}
							slug={post.slug}
						/>
						<PostBody body={post.body} />
					</article>
					<SectionSeparator />
					{morePosts?.length > 0 && <MoreStories posts={morePosts} />}
				</>
			)}
		</Page>
	);
}
