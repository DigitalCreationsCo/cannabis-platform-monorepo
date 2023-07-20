import { formatBlogUrl } from '@cd/core-lib';
import { ArticleWithDetails } from '@cd/data-access';
import { Card, FlexBox, H3, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type InfoCardProps = {
  data: ArticleWithDetails;
  loading?: boolean;
  className?: string | string[];
};

function InfoCard({ data: info, loading, className }: InfoCardProps) {
  const styles = {
    dispensarycard: [
      'relative',
      'w-[200px] md:min-w-[264px] md:w-[340px] h-[220px] p-4 !rounded',
    ],
    isOpenBadge: [
      'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
    ],
  };

  return (
    <Link
      href={formatBlogUrl(info.id)}
      className="z-0 relative shadow-lg rounded"
    >
      <Card
        className={twMerge([
          styles.dispensarycard,
          'rounded hover:scale-101 transition duration-500',
          className,
        ])}
      >
        <ImageBackDrop src={info.image.location || logo.src}>
          <H3 className="whitespace-normal drop-shadow z-5 p-2 tracking-wide absolute top-0 left-0 text-inverse">
            {info.title}
          </H3>

          <FlexBox className="z-5 p-2 absolute bottom-0 left-0 items-end flex-row justify-between">
            <Paragraph className="text-inverse text-lg font-semibold drop-shadow">
              {info.description}
            </Paragraph>
          </FlexBox>
        </ImageBackDrop>
      </Card>
    </Link>
  );
}

const ImageBackDrop = ({
  src,
  children,
}: { src: string } & PropsWithChildren) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <img
        className="rounded object-cover w-full h-full"
        src={src}
        alt="card-backdrop"
      />
      <div
        className="rounded"
        style={{
          backgroundColor: 'rgba(1,12,2,0.22)',
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: '0',
          top: '0',
        }}
      ></div>
      {children}
    </div>
  );
};

export default InfoCard;
