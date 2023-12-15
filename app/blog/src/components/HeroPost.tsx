import Link from 'next/link';
import type { Post } from '../lib/sanity.queries';
import AuthorAvatar from './AuthorAvatar';
import MainImage from './MainImage';
import Date from './PostDate';

export default function HeroPost(
	props: Pick<
		Post,
		'title' | 'mainImage' | 'date' | 'excerpt' | 'author' | 'slug'
	>,
) {
	const { title, mainImage, date, excerpt, author, slug } = props;
	return (
		<section>
			<div className="mb-8 md:mb-16">
				<MainImage
					slug={slug}
					title={title as string}
					image={mainImage}
					priority
				/>
			</div>
			<div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
				<div>
					<h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
						<Link href={`/posts/${slug}`} className="hover:underline">
							{title || 'Untitled'}
						</Link>
					</h3>
					<div className="mb-4 text-lg md:mb-0">
						<Date dateString={date as string} />
					</div>
				</div>
				<div>
					{excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
					{author && (
						<AuthorAvatar name={author.name} picture={author.picture} />
					)}
				</div>
			</div>
		</section>
	);
}
