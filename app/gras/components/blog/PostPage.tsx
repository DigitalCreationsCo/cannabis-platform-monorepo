import { Page, PlainTopBar } from '@cd/ui-lib';
import { notFound } from 'next/navigation';
import PostPageHead from '@/components/blog/PostPageHead';
import PostTitle from '@/components/blog/PostTitle';
import SectionSeparator from '@/components/blog/SectionSeparator';
import type { Post, Settings } from '@/lib/sanity';
import BlogHeader from './BlogHeader';
import MorePosts from './MorePosts';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

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
	const { title } = settings;
	const slug = post?.slug;

	if (!slug && !preview) {
		notFound();
	}

	return (
		<Page
			className={
				'm-0 p-0 md:p-0 lg:p-0 lg:px-10 min-h-[660px] bg-gradient-to-b from-10% from-secondary-light to-secondary'
			}
		>
			<PlainTopBar className="bg-transparent text-light" />
			<PostPageHead settings={settings} post={post} />
			<BlogHeader title={title || ''} level={2} />
			{preview && !post ? (
				<PostTitle>{`Loading…`}</PostTitle>
			) : (
				<>
					<article className="w-full lg:max-w-4xl px-4 pt-4 mx-auto">
						<PostHeader
							slug={post.slug}
							_createdAt={post._createdAt}
							title={post.title}
							mainImage={post.mainImage}
							mainImageAsset={post.mainImageAsset}
							author={post.author}
							excerpt={post.excerpt}
							categories={post.categories}
						/>
						<PostBody body={post.body} />
					</article>
					<SectionSeparator />
					{morePosts.length > 0 && (
						<div className="text-inverse">
							<MorePosts posts={morePosts} />
						</div>
					)}
				</>
			)}
		</Page>
	);
}
