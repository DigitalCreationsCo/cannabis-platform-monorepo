import { H2 } from '@gras/ui';
import { useTranslations } from 'next-intl';
import { type Post } from '@/lib/sanity';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	const t = useTranslations('common');
	return (
		<section className="px-4 space-y-4 lg:px-12">
			<H2>{t('more-stories')}</H2>
			<div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
				{posts.map((post) => (
					<InfoCard key={post._id} info={post} />
				))}
			</div>
		</section>
	);
}

export default Posts;
