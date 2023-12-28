import { H3, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import type { Post } from '../lib/sanity.queries';
import AuthorAvatar from './AuthorAvatar';
import MainImage from './MainImage';
import Date from './PostDate';

export default function HeroPost(
	props: Pick<
		Post,
		| 'title'
		| 'mainImage'
		| '_createdAt'
		| 'excerpt'
		| 'author'
		| 'slug'
		| 'categories'
	>,
) {
	const { title, mainImage, _createdAt, excerpt, author, slug, categories } =
		props;
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
			<div className="px-1 mb-20 md:mb-28 md:grid 2xl:grid-cols-2 md:gap-x-16 lg:gap-x-8">
				<div>
					<H3 className="mb-4 text-4xl tracking-normal font-onest font-semibold drop-shadow-lg leading-tight lg:text-6xl">
						<Link
							href={`/posts/${slug}`}
							className="hover:underline decoration-secondary"
						>
							{title || 'Untitled'}
						</Link>
					</H3>
					<div className="mb-4 text-lg md:mb-0">
						<Date dateString={_createdAt} />
						<Paragraph>{categories}</Paragraph>
					</div>
				</div>
				<div>
					{excerpt && (
						<Paragraph className="my-4 text-lg leading-relaxed">
							{excerpt}
						</Paragraph>
					)}
					{author && (
						<AuthorAvatar name={author.name} picture={author.picture} />
					)}
				</div>
			</div>
		</section>
	);
}
