import {
	checkIsDispensaryOpen,
	formatDispensaryUrl,
	renderAddress,
} from '@cd/core-lib';
import { type OrganizationWithShopDetails } from '@cd/data-access';
import { Card, FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type DispensaryCardProps = {
	data: OrganizationWithShopDetails;
	loading?: boolean;
	className?: string | string[];
};
function DispensaryCard({ data: dispensary, className }: DispensaryCardProps) {
	const styles = {
		dispensarycard: [
			'relative',
			'w-[240px] md:min-w-[340px] md:w-[340px] h-[220px] p-4 !rounded',
		],
		isOpenBadge: [
			'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
		],
	};

	return (
		<Link
			href={formatDispensaryUrl(dispensary?.subdomainId)}
			className="relative z-0 rounded shadow-lg"
		>
			<Card
				className={twMerge([
					styles.dispensarycard,
					'rounded',
					// 'hover:scale-101 transition duration-500',
					className,
				])}
			>
				<ImageBackDrop src={dispensary?.images?.[0]?.location || logo.src}>
					<H2 className="z-5 text-inverse absolute left-0 top-0 max-w-[248px] whitespace-normal p-2 tracking-wide drop-shadow">
						{dispensary?.name}
					</H2>
					<Paragraph className={twMerge(styles.isOpenBadge)}>
						{checkIsDispensaryOpen(dispensary.schedule) ? 'open now' : 'closed'}
					</Paragraph>

					<FlexBox className="z-5 absolute bottom-0 left-0 flex-row items-end justify-between p-2">
						<Paragraph className="text-inverse font-semibold drop-shadow">
							{renderAddress({
								address: dispensary?.address,
								showCountry: false,
								showZipcode: false,
								lineBreak: true,
							})}
						</Paragraph>
					</FlexBox>
				</ImageBackDrop>
			</Card>
		</Link>
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
				fill
				sizes="(max-width: 250px)"
				quality={25}
				priority
				loader={({ width, src }) => src + `?w=${width}`}
			/>
			<div
				className="rounded"
				style={{
					backgroundColor: 'rgba(1,12,2,0.18)',
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

export default DispensaryCard;
