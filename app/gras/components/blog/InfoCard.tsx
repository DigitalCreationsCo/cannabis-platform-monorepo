/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { FlexBox, H5, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from '@/lib/sanity/sanity.image';
import { resolveHref } from '@/lib/sanity/sanity.links';
import { type Post } from '@/lib/sanity/sanity.queries';
import logo from '../../public/logo.png';

type InfoCardProps = {
	data: Post;
	loading?: boolean;
	className?: string | string[];
	showDescription?: boolean;
	priority?: boolean;
};

function InfoCard({
	data: info,
	className,
	showDescription = true,
	priority = false,
}: InfoCardProps) {
	return (
		<Link
			href={resolveHref('post', info.slug) as string}
			className={twMerge([
				'flex flex-col',
				'h-[240px]',
				'm-3',
				'bg-cyan-950',
				'rounded',
				'overflow-hidden',
				'border border-transparent',
				'hover:border-inverse-soft',
				'text-inverse-soft',
				'drop-shadow-[-6px_4px_1px_#555]',
				className,
			])}
		>
			<FlexBox className="grow relative">
				<Image
					priority={priority}
					loading="lazy"
					blurDataURL={urlForImage(info.mainImage)?.blur(100).url()}
					src={urlForImage(info.mainImage)?.url() || logo.src}
					alt={info.title as string}
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
						{truncateWordsAndLeaveN(info.excerpt as string, 12)}
					</Paragraph>
				)) || <></>}
			</div>
		</Link>
	);
}

export default InfoCard;
