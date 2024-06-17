import { Page } from '@cd/ui-lib';
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
    <Page className={'bg-inherit pt-8 min-h-[660px]'}>
      <PostPageHead settings={settings} post={post} />

      <BlogHeader title={title || ''} level={2} />
      {preview && !post ? (
        <PostTitle>{`Loading…`}</PostTitle>
      ) : (
        <>
          <article className="w-full mx-auto max-w-7xl">
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
          {morePosts.length > 0 && <MorePosts posts={morePosts} />}
        </>
      )}
    </Page>
  );
}
