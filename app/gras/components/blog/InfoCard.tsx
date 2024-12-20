/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { truncateWordsAndLeaveN } from '@cd/core-lib/utils';
import { FlexBox, H5, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { resolveHref } from '@/lib/sanity/sanity.links';
import { type Post } from '@/lib/sanity/sanity.queries';
import logo from '../../public/logo.png';

interface InfoCardProps {
	data: Post;
	loading?: boolean;
	className?: string | string[];
	showDescription?: boolean;
	priority?: boolean;
}

function InfoCard({
	data: info,
	className,
	showDescription = true,
	priority = false,
}: InfoCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	return (
		<Link
			href={resolveHref('post', info.slug)!}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={twMerge([styles.infoCard, styles.floatingCard, className])}
		>
			<FlexBox className="grow relative">
				<Image
					priority={priority}
					blurDataURL={urlForImage(info.mainImage)?.blur(100).url()}
					src={urlForImage(info.mainImage)?.url() || logo.src}
					alt={info.title!}
					fill
					className="object-cover object-top"
					sizes="330px"
					quality={25}
				/>
			</FlexBox>
			<div className={twMerge('max-h-36', 'px-2')}>
				<H5>{info.title}</H5>
				{(showDescription && (
					<Paragraph className="text-inverse">
						{truncateWordsAndLeaveN(info.excerpt!, 9)}
					</Paragraph>
				)) || <></>}
			</div>
		</Link>
	);
}

export default InfoCard;
