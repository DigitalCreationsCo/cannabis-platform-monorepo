import { Paragraph } from '@cd/ui-lib';
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

  console.info('PostHeader');
  console.info('mainImage', mainImage);
  console.info('mainImageAsset', mainImageAsset);
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
          creditUser={mainImageAsset.creditLine}
          creditLink={mainImageAsset.source?.url}
        />
      </div>
    </>
  );
}
