/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Card, FlexBox, H3, Paragraph } from '@cd/ui-lib';
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
	const styles = {
		dispensarycard: [
			// 'relative',
			// 'w-[200px] md:min-w-[264px] md:w-[340px] h-[220px] p-4 !rounded',
		],
		isOpenBadge: [
			// 'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
		],
	};

	return (
		<div
			className={twMerge([
				'w-[300px]',
				'h-[360px]',
				'bg-dark',
				'rounded',
				className,
			])}
		>
			<Link href={resolveHref('post', info.slug.current) as string}>
				<Image
					src={urlForImage(info.mainImage!)!.url() || logo.src}
					alt="card-backdrop"
					loader={({ src }) => src}
					width={300}
					height={360}
				/>
				<FlexBox className={twMerge('p-4')}>
					<H3 className="text-inverse">{info.title}</H3>

					<Paragraph className="text-inverse">{info.excerpt}</Paragraph>
				</FlexBox>
			</Link>
		</div>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string } & PropsWithChildren) => {
	return (
		<div className="absolute left-0 top-0 h-full w-full">
			<Image
				className="h-full w-full rounded object-cover"
				src={src}
				alt="card-backdrop"
				loader={({ src }) => src}
				width={340}
				height={340}
			/>
			<div
				className="rounded"
				style={{
					backgroundColor: 'rgba(1,12,2,0.14)',
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default InfoCard;
