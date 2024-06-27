import { Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import Avatar from '@/components/blog/AuthorAvatar';
import MainImage from '@/components/blog/MainImage';
import Date from '@/components/blog/PostDate';
import type { Post } from '@/lib/sanity';

export default function PostPreview({
	title,
	mainImage,
	_createdAt,
	excerpt,
	author,
	slug,
}: Pick<
	Post,
	'title' | 'mainImage' | '_createdAt' | 'excerpt' | 'author' | 'slug'
>) {
	return (
		<div>
			<div className="mb-5">
				<MainImage
					slug={slug}
					title={title!}
					image={mainImage}
					priority={false}
				/>
			</div>
			<h3 className="mb-3 text-3xl leading-snug">
				<Link
					href={`/blog/posts/${slug}`}
					className="hover:underline decoration-primary"
				>
					{title}
				</Link>
			</h3>
			<div className="mb-4 text-lg">
				<Date dateString={_createdAt} />
			</div>
			{excerpt && (
				<Paragraph className="mb-4 text-lg leading-relaxed">
					{excerpt}
				</Paragraph>
			)}
			{author && <Avatar name={author.name} picture={author.picture} />}
		</div>
	);
}
