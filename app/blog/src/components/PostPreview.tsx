import Link from 'next/link';
import Avatar from 'components/AuthorAvatar';
import MainImage from 'components/MainImage';
import Date from 'components/PostDate';
import type { Post } from 'lib/sanity.queries';

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
					title={title as string}
					image={mainImage}
					priority={false}
				/>
			</div>
			<h3 className="mb-3 text-3xl leading-snug">
				<Link
					href={`/posts/${slug}`}
					className="hover:underline decoration-primary"
				>
					{title}
				</Link>
			</h3>
			<div className="mb-4 text-lg">
				<Date dateString={_createdAt} />
			</div>
			{excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
			{author && <Avatar name={author.name} picture={author.picture} />}
		</div>
	);
}
