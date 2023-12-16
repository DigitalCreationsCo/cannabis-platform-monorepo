import { useLiveQuery } from 'next-sanity/preview';
import {
	postsQuery,
	type Settings,
	type Post,
	settingsQuery,
} from 'lib/sanity.queries';
import IndexPage, { type IndexPageProps } from './IndexPage';

export default function PreviewPosts(props: IndexPageProps) {
	const [posts, loadingPosts] = useLiveQuery<Post[]>(props.posts, postsQuery);
	const [settings, loadingSettings] = useLiveQuery<Settings>(
		props.settings,
		settingsQuery,
	);

	return (
		<IndexPage
			preview
			loading={loadingPosts || loadingSettings}
			posts={posts || []}
			settings={settings || {}}
		/>
	);
}
