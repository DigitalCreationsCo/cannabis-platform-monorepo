import { useLiveQuery } from 'next-sanity/preview';
import PostPage, { type PostPageProps } from '@/components/blog/PostPage';
import {
  type Post,
  postAndMoreStoriesQuery,
  type Settings,
  settingsQuery,
} from '@/lib/sanity';

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview, morePosts }, loadingPost] = useLiveQuery<{
    post: Post;
    morePosts: Post[];
  }>(
    { post: props.post, morePosts: props.morePosts },
    postAndMoreStoriesQuery,
    {
      slug: props.post.slug,
    }
  );
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery
  );

  return (
    <PostPage
      preview
      loading={loadingPost || loadingSettings}
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
  );
}
