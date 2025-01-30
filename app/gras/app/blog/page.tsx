import { IndexPage } from '@/components/blog';
import { getPosts, getSettings } from '@/lib/sanity/sanity.client';

export default async function BlogDirectory() {
	const settings = await getSettings();
	const posts = await getPosts()
	return <IndexPage posts={posts} settings={settings} />;
}