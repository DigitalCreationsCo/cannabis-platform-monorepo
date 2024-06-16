import { Carousel, H2, Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { type Post } from '@/lib/sanity';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	const { t } = useTranslation('common');
	return (
		<section>
			<H2 className="mb-8 text-6xl font-bold leading-tight md:text-7xl">
				{t('more-stories')}
			</H2>
			<div className="flex flex-wrap gap-10 justify-center sm:justify-start">
				{posts.map((post) => (
					<InfoCard key={post._id} data={post} />
				))}
			</div>
		</section>
	);
}

export default Posts;
