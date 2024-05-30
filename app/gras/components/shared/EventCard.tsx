import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { FlexBox, H4, H5, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Event } from '@cd/data-access';

type EventCardProps = {
  event: Event;
  loading?: boolean;
  className?: string | string[];
  showDescription?: boolean;
};

function EventCard({
  loading,
  event,
  className,
  showDescription = true,
}: EventCardProps) {
  if (loading) {
    return (
      <div
        className={twMerge([
          // 'flex flex-col',
          'h-[240px] sm:max-w-[320px]',
          'm-3',
          'rounded',
          // 'bg-dark',
          // 'overflow-hidden',
          // 'border-2 border-transparent',
          'drop-shadow-[-6px_4px_1px_#555]',
          className,
        ])}
      >
        <div className="bg-amber-200/75 animate-pulse h-full"></div>
        {/* <div className={twMerge('max-h-36', 'px-2')}>
          <div className="bg-gray-400 animate-pulse w-full h-4 mb-2" />
          <div className="bg-gray-400 animate-pulse w-full h-4" />
        </div> */}
      </div>
    );
  }

  return (
    <Link
      href={event.url}
      className={twMerge([
        'flex flex-col',
        'h-[240px] sm:max-w-[320px]',
        'm-3',
        'bg-amber-200',
        'rounded',
        'overflow-hidden',
        // 'border border-dark',
        // 'hover:border-inverse-soft',
        // 'text-inverse-soft',
        'drop-shadow-[-6px_4px_1px_#555]',
        className,
      ])}
    >
      <H5 className="px-2 flex-1 tracking-normal text-xl font-semibold drop-shadow-[-1px_1px_0px_#ccc]">
        {truncateWordsAndLeaveN(event.name, 8)}
      </H5>
      {(showDescription && (
        <Paragraph className="flex-1 px-1">
          {event.full_description || ''}
        </Paragraph>
      )) || <></>}
      <div className="h-[180px]">
        <Image
          src={event.image?.url || require('public/hemp.png')}
          alt={event.name}
          width={300}
          height={200}
          className="w-full h-auto aspect-auto object-bottom pb-4"
          sizes="600px"
        />
      </div>
    </Link>
  );
}

export default EventCard;
