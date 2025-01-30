import { PostPage } from '@/components/blog';
import {
	getPostAndMoreStories,
	getPosts,
	getSettings,
} from '@/lib/sanity';
import { QueryParams } from 'next-sanity';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const posts = await getPosts();
  
	return posts.map((post) => ({
	  slug: post?.slug,
	}));
}

export default async function PostSlugRoute({
	params,
  }: {
	params: Promise<QueryParams>;
  }) {
	const settings = await getSettings();
	const {post, morePosts} = await getPostAndMoreStories(await params)

	if (!post) {
		return notFound();
	}
	return <PostPage post={post} morePosts={morePosts} settings={settings} />;
}