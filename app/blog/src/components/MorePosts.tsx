import { Carousel } from '@cd/ui-lib';
import { type Post } from '../lib/sanity.queries';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	return (
		<section>
			<h2 className="mb-8 text-6xl font-bold leading-tight md:text-7xl">
				More Stories
			</h2>
			<Carousel
				slidesPerView={2}
				data={posts}
				dataKey="posts"
				Component={InfoCard}
			/>
		</section>
	);
}

export default Posts;
