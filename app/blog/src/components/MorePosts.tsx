import { type Post } from '../lib/sanity.queries';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	return (
		<section>
			<h2 className="mb-8 text-6xl font-bold leading-tight md:text-7xl">
				More Stories
			</h2>
			<div className="flex flex-wrap gap-12 mb-12">
				{posts.map((post) => (
					<InfoCard key={post._id} data={post} />
				))}
			</div>
		</section>
	);
}

export default Posts;
