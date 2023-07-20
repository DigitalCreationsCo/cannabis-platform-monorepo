import {
  checkIsDispensaryOpen,
  formatDispensaryUrl,
  renderAddress
} from '@cd/core-lib';
import { OrganizationWithShopDetails } from '@cd/data-access';
import { Card, FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type DispensaryCardProps = {
  data: OrganizationWithShopDetails;
  loading?: boolean;
  className?: string | string[];
};
function DispensaryCard({
  data: dispensary,
  loading,
  className,
}: DispensaryCardProps) {
  const styles = {
    dispensarycard: [
      'relative',
      'w-[240px] md:min-w-[340px] md:w-[340px] h-[220px] p-4 !rounded',
    ],
    isOpenBadge: [
      'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
    ],
  };

  return (
    <Link
      href={formatDispensaryUrl(dispensary?.vendor.name as string, dispensary?.id)}
      className="z-0 relative shadow-lg rounded"
    >
      <Card
        className={twMerge([
          styles.dispensarycard,
          'rounded hover:scale-101 transition duration-500',
          className,
        ])}
      >
        <ImageBackDrop src={dispensary?.images?.[0]?.location || logo.src}>
          <H2 className="whitespace-normal drop-shadow z-5 p-2 max-w-[248px] tracking-wide absolute top-0 left-0 text-inverse">
            {dispensary?.name}
          </H2>
          <Paragraph className={twMerge(styles.isOpenBadge)}>
            {checkIsDispensaryOpen(dispensary.schedule) ? 'open now' : 'closed'}
          </Paragraph>

          <FlexBox className="z-5 p-2 absolute bottom-0 left-0 items-end flex-row justify-between">
            <Paragraph className="text-inverse drop-shadow font-semibold">
              {renderAddress({
                address: dispensary?.address,
                showCountry: false,
                showZipcode: false,
                lineBreak: true,
              })}
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
          backgroundColor: 'rgba(1,12,2,0.32)',
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

export default DispensaryCard;
