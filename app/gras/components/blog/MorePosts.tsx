import { H2 } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { type Post } from '@/lib/sanity';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	const { t } = useTranslation('common');
	return (
		<section className="px-2 lg:px-12">
			<H2 className="px-4">{t('more-stories')}</H2>
			<div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
				{posts.map((post) => (
					<InfoCard key={post._id} data={post} />
				))}
			</div>
		</section>
	);
}

export default Posts;
