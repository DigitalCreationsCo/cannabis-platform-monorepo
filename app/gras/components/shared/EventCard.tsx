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
				// 'h-[240px] sm:max-w-[320px]',
				'mx-1',
				'rounded',
				'overflow-hidden',
				'border border-transparent',
				'hover:bg-gray-300/25',
				className,
			])}
		>
			<div
				className={twMerge(
					'h-[180px] p-3',
					isHovered && 'scale-105 -translate-y-1',
					'transition duration-700',
					'relative'
				)}
			>
				{/* {(showDescription && (
						<Paragraph className="flex-1 px-1">
						{event.full_description || ''}
						</Paragraph>
						)) || <></>} */}
				<div className="relative max-w-[300px] h-full mx-auto">
					{(!event.image?.url && (
						<H5 className="w-full pt-2 absolute z-10 text-center tracking-wide text-xl text-white font-medium drop-shadow-[1px_2px_1px_#555555]">
							{truncateWordsAndLeaveN(event.name, 8)}
						</H5>
					)) || <></>}
					{(organizerImage && (
						<Image
							className="absolute z-10 bottom-0 object-cover"
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
						fill
						className={twMerge(
							'mx-auto object-cover w-full h-full rounded',
							isHovered
								? 'drop-shadow-[-3px_5px_3px_#555]'
								: 'drop-shadow-[-4px_4px_1px_#555]',
							'transition duration-200'
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
