/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { FlexBox, H4, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { urlForImage } from 'lib/sanity.image';
import logo from '../../public/logo.png';
import { resolveHref } from '../lib/sanity.links';
import { type Post } from '../lib/sanity.queries';

type InfoCardProps = {
	data: Post;
	loading?: boolean;
	className?: string | string[];
};

function InfoCard({ data: info, className }: InfoCardProps) {
	return (
		<Link
			href={resolveHref('post', info.slug) as string}
			className={twMerge([
				'flex flex-col',
				'w-[300px]',
				'h-[360px]',
				'bg-dark',
				'rounded',
				'overflow-hidden',
				'border-4 border-transparent',
				'hover:border-yellow',
				className,
			])}
		>
			<FlexBox className="grow relative">
				<Image
					blurDataURL={urlForImage(info.mainImage)?.blur(100).url()}
					src={urlForImage(info.mainImage)?.url() || logo.src}
					alt={info.title as string}
					fill
					className="object-cover object-top"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</FlexBox>
			<div className={twMerge('h-36', 'p-2')}>
				<H4 className="text-inverse tracking-wider">{info.title}</H4>
				<Paragraph className="text-inverse">
					{truncateWordsAndLeaveN(info.excerpt as string, 12)}
				</Paragraph>
			</div>
		</Link>
	);
}

export default InfoCard;
