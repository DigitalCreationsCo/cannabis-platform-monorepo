import { Paragraph } from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';
import Avatar from '@/components/blog/AuthorAvatar';
import type { Post } from '@/lib/sanity';
import CoverImage from './MainImage';
import Date from './PostDate';
import PostTitle from './PostTitle';

export default function PostHeader(
	props: Pick<
		Post,
		| 'title'
		| 'mainImage'
		| 'mainImageAsset'
		| '_createdAt'
		| 'excerpt'
		| 'author'
		| 'slug'
		| 'categories'
	>
) {
	const {
		title,
		mainImage,
		mainImageAsset,
		_createdAt,
		author,
		excerpt,
		slug,
		categories,
	} = props;

	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="mx-auto">
				<div className="flex flex-row items-center gap-4 text-inverse-soft">
					<Paragraph className="post__date inline">
						<Date dateString={_createdAt} />
					</Paragraph>
					{categories && <Paragraph className="inline">{categories}</Paragraph>}
					{author && (
						<div className="inline-block">
							<Avatar name={author.name} picture={author.picture} />
						</div>
					)}
				</div>
				<Paragraph className="leading-tight my-4 post__excerpt text-lg">
					{excerpt}
				</Paragraph>
				<div
					className={twMerge('sm:mx-0 w-full', 'bg-light', 'md:pt-16 md:px-16')}
				>
					<CoverImage
						title={title || ''}
						image={mainImage}
						priority
						slug={slug}
						creditUser={mainImageAsset.creditLine}
						creditLink={mainImageAsset.source?.url}
					/>
				</div>
			</div>
		</>
	);
}
