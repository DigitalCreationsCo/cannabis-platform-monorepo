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
	>
) {
	const { title, mainImage, _createdAt, excerpt, author, slug, categories } =
		props;
	return (
		<section className="max-w-xl mx-auto">
			<div className="mb-16 md:mb-28 md:grid md:gap-x-16 lg:gap-x-8 px-10 md:px-0">
				<div>
					<H3 className="mt-4 lg:mb-4 !text-4xl md:!text-5xl tracking-normal font-onest font-semibold drop-shadow-lg leading-tight lg:!text-7xl">
						<Link
							href={`/blog/posts/${slug}`}
							className="hover:underline decoration-inverse"
						>
							{title || 'Untitled'}
						</Link>
					</H3>
					<div className="flex flex-row mb-4 items-center gap-2 text-inverse-soft">
						<Paragraph className="post__date inline">
							<Date dateString={_createdAt} />
						</Paragraph>
						<Paragraph className="inline">{categories}</Paragraph>
						<div className="inline-block">
							{author && <Avatar name={author.name} picture={author.picture} />}
						</div>
					</div>
				</div>
				<div className="">
					<MainImage slug={slug} title={title!} image={mainImage} priority />
				</div>
				<div>
					{excerpt && (
						<Paragraph className="text-lg md:text-inverse-soft leading-relaxed">
							{excerpt}
						</Paragraph>
					)}
				</div>
			</div>
		</section>
	);
}
