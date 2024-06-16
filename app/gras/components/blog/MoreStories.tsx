import { H2, Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import PostPreview from '@/components/blog/PostPreview';
import type { Post } from '@/lib/sanity';

export default function MoreStories({ posts }: { posts: Post[] }) {
	const { t } = useTranslation('common');
	return (
		<section>
			<H2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
				{t('more-stories')}
			</H2>
			<div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
				{posts.map((post) => (
					<PostPreview
						key={post._id}
						title={post.title}
						mainImage={post.mainImage}
						_createdAt={post._createdAt}
						author={post.author}
						slug={post.slug}
						excerpt={post.excerpt}
					/>
				))}
			</div>
		</section>
	);
}
