import { formatDispensaryUrl } from '@cd/core-lib';
import { type OrganizationWithShopDetails } from '@cd/data-access';
import {
	SkeletonCard,
	CardWithData,
	FlexBox,
	H3,
	Paragraph,
	Card,
	styles,
} from '@cd/ui-lib';
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

function DispensaryCard({
	data: dispensary,
	loading,
	className,
}: DispensaryCardProps) {
	if (loading)
		return (
			<SkeletonCard className={twMerge([styles.dispensaryCard, className])} />
		);

	if (!dispensary?.id)
		return (
			<Card className={twMerge([styles.dispensaryCard, className])}>
				<Paragraph>No Dispensary available.</Paragraph>
			</Card>
		);
	const applyDispensaryStyles: Record<string, string> = {
		'primary-color': dispensary?.siteSetting?.primaryColor as string,
		'secondary-color': dispensary?.siteSetting?.secondaryColor as string,
		'tertiary-color': dispensary?.siteSetting?.tertiaryColor as string,
		'text-color': dispensary?.siteSetting?.textColor as string,
		'background-color': dispensary?.siteSetting?.backgroundColor as string,
	};

	const ImageBackDrop = ({
		src,
		children,
	}: { src: string } & PropsWithChildren) => {
		return (
			<div
				className="absolute left-0 top-0 bg-transparent h-full w-full flex"
				style={{
					backgroundColor:
						(hasLogo && applyDispensaryStyles['background-color']) || '#fff2da',
				}}
			>
				<Image
					className="object-contain p-8"
					src={src}
					fill
					alt={dispensary?.name}
					sizes="(max-width: 200px)"
					quality={25}
					priority
					loader={({ width, src }) => src + `?w=${width}`}
				/>
				{children}
			</div>
		);
	};

	const hasLogo = !!dispensary?.images?.[0]?.location;

	return (
		<Link
			href={formatDispensaryUrl(dispensary?.subdomainId)}
			className="relative z-0 shadow-2xl"
		>
			<CardWithData
				data={dispensary}
				className={twMerge([styles.dispensaryCard, className])}
			>
				<ImageBackDrop src={dispensary?.images?.[0]?.location || logo.src}>
					<FlexBox className="z-5 absolute left-0 flex-col p-2 px-4">
						<H3
							style={{ color: applyDispensaryStyles['primary-color'] }}
							className="z-5 font-semibold left-0 top-0 max-w-[248px] whitespace-normal tracking-wide drop-shadow"
						>
							{dispensary?.name}
						</H3>
						<Paragraph
							style={{ color: applyDispensaryStyles['secondary-color'] }}
							className="drop-shadow tracking-wider"
						>
							{dispensary?.address?.city}
						</Paragraph>
					</FlexBox>
					{/* <Paragraph className={twMerge(styles.isOpenBadge)}>
						{checkIsDispensaryOpen(dispensary?.schedule) ? 'open now' : 'closed'}
					</Paragraph> */}
					<FlexBox className="z-5 absolute bottom-0 left-0 flex-col p-2 px-4">
						<Paragraph className="text-inverse text-xl font-semibold drop-shadow">
							{(dispensary?.isSubscribedForDelivery && 'Accepting Delivery') ||
								(dispensary?.isSubscribedForPickup && 'Order for Pickup')}
						</Paragraph>
					</FlexBox>
				</ImageBackDrop>
			</CardWithData>
		</Link>
	);
}

export default DispensaryCard;
