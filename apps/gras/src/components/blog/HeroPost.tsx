import { H3, Paragraph } from '@gras/ui';
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
					<H3 className="text-left mt-4 lg:mb-4 !text-4xl md:!text-5xl tracking-normal font-onest font-medium drop-shadow-lg leading-tight lg:!text-7xl">
						<Link
							href={`/blog/posts/${slug}`}
							className="hover:underline decoration-inverse"
						>
							{title || 'Untitled'}
						</Link>
					</H3>
					<div className="flex flex-row mt-3 mb-4 items-center gap-2 text-inverse-soft justify-between ">
						<div className="flex flex-row items-center gap-x-2 text-inverse-soft">
							<Paragraph className="post__date inline">
								<Date dateString={_createdAt} />
							</Paragraph>
							{categories && (
								<Paragraph className="inline">{categories}</Paragraph>
							)}
							{author && (
								<div className="inline-block">
									<Avatar name={author.name} picture={author.picture} />
								</div>
							)}
						</div>
						<div>
							<Link
								href={`/blog/posts/${slug}`}
								className="underline decoration-inverse"
							>
								Read more
							</Link>
						</div>
					</div>
				</div>
				<div>
					<MainImage slug={slug} title={title!} image={mainImage} priority />
				</div>
				{excerpt && (
					<div className="mx-auto mt-4">
						<Paragraph className="md:text-inverse-soft">{excerpt}</Paragraph>
					</div>
				)}
			</div>
		</section>
	);
}
