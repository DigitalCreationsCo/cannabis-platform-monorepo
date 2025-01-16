import { truncateWordsAndLeaveN } from '@gras/core/utils';
import { type Event } from '@gras/data-access';
import { H5, Paragraph, styles } from '@gras/ui';
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
			<div className={twMerge([styles.eventCard, className])}>
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
				'transition',
				styles.eventCard,
				styles.floatingCard,
				className,
			])}
		>
			<div className="relative w-full h-full mx-auto">
				{(showDescription && (
					<Paragraph className="flex-1 px-1">
						{event.full_description ?? ''}
					</Paragraph>
				)) || <></>}
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
					className={twMerge('mx-auto object-cover w-full h-full rounded')}
					sizes="300px"
					quality={25}
				></Image>
			</div>
		</Link>
	);
}

export default EventCard;
