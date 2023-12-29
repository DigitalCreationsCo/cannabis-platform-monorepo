import { Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Avatar from 'components/AuthorAvatar';
import { urlForImage } from 'lib/sanity.image';
import post from 'schemas/post';
import type { Post } from '../lib/sanity.queries';
import CoverImage from './MainImage';
import Date from './PostDate';
import PostTitle from './PostTitle';

export default function PostHeader(
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
	const { title, mainImage, _createdAt, author, excerpt, slug, categories } =
		props;
	return (
		<>
			<PostTitle>{title}</PostTitle>
			<div className="flex flex-row mb-4 items-center gap-2">
				<Paragraph className="post__date text-lg inline">
					<Date dateString={_createdAt} />
				</Paragraph>
				<Paragraph className="inline text-lg">{categories}</Paragraph>
				<div className="inline-block">
					{author && <Avatar name={author.name} picture={author.picture} />}
				</div>
			</div>
			<Paragraph className="leading-tight mb-4 post__excerpt text-inverse drop-shadow text-lg">
				{excerpt}
			</Paragraph>
			<div className="mb-8 sm:mx-0 md:mb-16">
				<CoverImage
					title={title || ''}
					image={mainImage}
					priority
					slug={slug}
				/>
			</div>
		</>
	);
}
