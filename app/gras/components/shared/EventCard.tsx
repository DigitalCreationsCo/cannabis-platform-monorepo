import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { type Event } from '@cd/data-access';
import { H5, Paragraph } from '@cd/ui-lib';
import { is } from 'cheerio/lib/api/traversing';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface EventCardProps {
	event: Event;
	loading?: boolean;
	className?: string | string[];
	showDescription?: boolean;
	priority?: boolean;
	organizerImage?: string;
}

function EventCard({
	loading,
	event,
	className,
	showDescription = false,
	priority = false,
	organizerImage,
}: EventCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	if (loading) {
		return (
			<div
				className={twMerge([
					'h-[240px] sm:max-w-[320px]',
					'mx-3',
					'rounded',
					'drop-shadow-[-6px_4px_1px_#555]',
					className,
				])}
			>
				<div className="bg-amber-200/75 animate-pulse h-full"></div>
			</div>
		);
	}

	if (!event.name) {
		return <></>;
	}

	return (
		<Link
			href={`/events/${event.id}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={twMerge([
				'flex flex-col',
				'h-[240px] sm:max-w-[320px]',
				'mx-1',
				'rounded',
				'overflow-hidden',
				'border border-transparent',
				'hover:bg-gray-300/25',
				className,
			])}
		>
			<H5 className="px-2 content-end text-center flex-1 tracking-wide bottom-0 text-xl text-white font-medium drop-shadow-[1px_2px_1px_#555555]">
				{truncateWordsAndLeaveN(event.name, 8)}
			</H5>
			{(showDescription && (
				<Paragraph className="flex-1 px-1">
					{event.full_description || ''}
				</Paragraph>
			)) || <></>}
			<div
				className={twMerge(
					'h-[180px] p-4',
					isHovered && 'scale-105 -translate-y-1',
					'transition duration-500',
					'border'
				)}
			>
				<div className="relative">
					{(organizerImage && (
						<Image
							className="absolute z-10 bottom-0"
							src={organizerImage}
							alt={event.primary_organizer_slug ?? ''}
							height={100}
							width={100}
						/>
					)) || <></>}
					<Image
						priority={priority}
						src={event.image?.url || require('public/hemp.png')}
						alt={event.name}
						width={300}
						height={200}
						className={twMerge(
							'relative w-full h-auto aspect-auto object-bottom drop-shadow-[-6px_4px_1px_#555] rounded'
						)}
						sizes="300px"
						quality={25}
					></Image>
				</div>
			</div>
		</Link>
	);
}

export default EventCard;
