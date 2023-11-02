import { formatBlogUrl } from '@cd/core-lib';
import { type ArticleWithDetails } from '@cd/data-access';
import {
	Card,
	CardWithData,
	FlexBox,
	H3,
	Paragraph,
	SkeletonCard,
	styles,
} from '@cd/ui-lib';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type InfoCardProps = {
	data: ArticleWithDetails;
	loading?: boolean;
	className?: string | string[];
};

function InfoCard({ data: info, loading, className }: InfoCardProps) {
	if (loading)
		return <SkeletonCard className={twMerge([styles.infoCard, className])} />;

	if (!info?.id)
		return (
			<Card className={twMerge([styles.infoCard, className])}>
				<Paragraph>No info available.</Paragraph>
			</Card>
		);
	return (
		<Link
			href={formatBlogUrl(info.id)}
			className="relative z-0 rounded shadow-lg"
		>
			<CardWithData
				data={info}
				className={twMerge([styles.infoCard, className])}
			>
				<ImageBackDrop src={info.image.location || logo.src}>
					<H3 className="z-5 text-inverse absolute left-0 top-0 whitespace-normal p-2 tracking-wide drop-shadow">
						{info.title}
					</H3>

					<FlexBox className="z-5 absolute bottom-0 left-0 flex-row items-end justify-between p-2">
						<Paragraph className="text-inverse text-lg font-semibold drop-shadow">
							{info.description}
						</Paragraph>
					</FlexBox>
				</ImageBackDrop>
			</CardWithData>
		</Link>
	);
}

const ImageBackDrop = ({
	src,
	children,
}: { src: string } & PropsWithChildren) => {
	return (
		<div className="absolute left-0 top-0 h-full w-full">
			<img
				className="h-full w-full rounded object-cover"
				src={src}
				alt="card-backdrop"
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
