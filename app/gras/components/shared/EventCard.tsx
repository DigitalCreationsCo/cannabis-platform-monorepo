import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { FlexBox, H4, Paragraph } from '@cd/ui-lib';
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
          'flex flex-col',
          'h-[240px]',
          'm-3',
          'bg-dark',
          'rounded',
          'overflow-hidden',
          'border-2 border-transparent',
          'drop-shadow-[-6px_4px_1px_#555]',
          className,
        ])}
      >
        <FlexBox className="grow relative">
          <div className="bg-gray-400 animate-pulse w-full h-full" />
        </FlexBox>
        <div className={twMerge('max-h-36', 'px-2')}>
          <div className="bg-gray-400 animate-pulse w-full h-4 mb-2" />
          <div className="bg-gray-400 animate-pulse w-full h-4" />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={event.url}
      className={twMerge([
        'flex flex-col',
        'h-[240px]',
        'm-3',
        'bg-dark',
        'rounded',
        'overflow-hidden',
        'border-2 border-transparent',
        // 'hover:border-primary',
        'drop-shadow-[-6px_4px_1px_#555]',
        className,
      ])}
    >
      <FlexBox className="grow relative">
        <Image
          src={event.image.url}
          alt={event.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </FlexBox>
      <div className={twMerge('max-h-36', 'px-2')}>
        <H4 className="text-inverse">{event.name}</H4>
        {(showDescription && (
          <Paragraph className="text-inverse">
            {truncateWordsAndLeaveN(event.full_description || '', 30)}
          </Paragraph>
        )) || <></>}
      </div>
    </Link>
  );
}

export default EventCard;
