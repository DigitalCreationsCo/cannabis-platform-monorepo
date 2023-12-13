/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { truncateWordsAndLeaveN } from '@cd/core-lib';
import { FlexBox, H3, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
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
			href={resolveHref('post', info.slug.current) as string}
			className={twMerge([
				'flex flex-col',
				'w-[300px]',
				'h-[360px]',
				'bg-dark',
				'rounded',
				'overflow-hidden',
				className,
			])}
		>
			<FlexBox className="grow relative">
				<Image
					src={urlForImage(info.mainImage!)!.url() || logo.src}
					alt="card-backdrop"
					fill
					className="object-cover object-top"
				/>
			</FlexBox>
			<div className={twMerge('h-36', 'p-2')}>
				<H3 className="text-inverse">{info.title}</H3>
				<Paragraph className="text-inverse">
					{truncateWordsAndLeaveN(info.excerpt as string, 12)}
				</Paragraph>
			</div>
		</Link>
	);
}

export default InfoCard;
