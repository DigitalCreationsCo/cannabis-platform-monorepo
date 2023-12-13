import { useLiveQuery } from 'next-sanity/preview';
import { useRouter } from 'next/router';
import { type Post, postBySlugQuery } from '../lib/sanity.queries';
import { default as PostComponent } from './Post';

export default function PreviewPost({ post }: { post: Post }) {
	const params = useRouter().query;
	const [data] = useLiveQuery(post, postBySlugQuery, params);

	return <PostComponent post={data} />;
}
