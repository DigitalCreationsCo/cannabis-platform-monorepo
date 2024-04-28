import { H3, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import Avatar from '@/components/blog/AuthorAvatar';
import type { Post } from '@/lib/sanity';
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
			<div className="px-1 mb-20 md:mb-28 md:grid md:gap-x-16 lg:gap-x-8">
				<div>
					<H3 className="mb-4 text-4xl tracking-normal font-onest font-semibold drop-shadow-lg leading-tight lg:text-6xl">
						<Link
							href={`/blog/posts/${slug}`}
							className="hover:underline decoration-inverse"
						>
							{title || 'Untitled'}
						</Link>
					</H3>
					<div className="flex flex-row mb-4 items-center gap-2">
						<Paragraph className="post__date text-lg inline">
							<Date dateString={_createdAt} />
						</Paragraph>
						<Paragraph className="inline text-lg">{categories}</Paragraph>
						<div className="inline-block">
							{author && <Avatar name={author.name} picture={author.picture} />}
						</div>
					</div>
				</div>
				<div>
					{excerpt && (
						<Paragraph className="my-4 text-lg leading-relaxed">
							{excerpt}
						</Paragraph>
					)}
				</div>
			</div>
		</section>
	);
}
