import Head from 'next/head';
import { type Post } from '../lib/sanity.queries';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className="flex flex-wrap gap-4">
				{posts.map((post) => (
					<InfoCard key={post._id} data={post} />
				))}
			</div>
		</>
	);
}

export default Posts;
