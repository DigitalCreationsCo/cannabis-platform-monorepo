import { useLiveQuery } from '@sanity/preview-kit';
import { postsQuery, type Post } from '../lib/sanity.queries';
import Posts from './Posts';

export default function PreviewPosts({ posts = [] }: { posts: Post[] }) {
	const [data] = useLiveQuery(posts, postsQuery);

	return <Posts posts={data} />;
}
