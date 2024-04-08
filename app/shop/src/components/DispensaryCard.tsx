import { checkIsDispensaryOpen, formatDispensaryUrl } from '@cd/core-lib';
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
import { useCallback, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

type DispensaryCardProps = {
	data: OrganizationWithShopDetails;
	loading?: boolean;
	className?: string | string[];
	current: boolean;
};

function DispensaryCard({
	data: dispensary,
	loading,
	className,
	current,
}: DispensaryCardProps) {
	const ImageBackDrop = useCallback(
		({
			src,
			children,
			blurData = undefined,
		}: { src: string; blurData?: string } & PropsWithChildren) => {
			return (
				<div
					className="absolute left-0 top-0 bg-transparent h-full w-full flex"
					style={{
						backgroundColor:
							(hasLogo && applyDispensaryStyles['background-color']) ||
							'#fff2da',
					}}
				>
					<Image
						placeholder={blurData ? 'blur' : 'empty'}
						blurDataURL={blurData}
						className="object-contain p-8"
						src={src}
						alt={dispensary?.name}
						sizes="(max-width: 200px)"
						fill
						quality={25}
						priority
						loader={({ src }) => src}
					/>
					{children}
				</div>
			);
		},
		[],
	);

	const OpenBadge = () => (
		<Paragraph className={twMerge(styles.isOpenBadge)}>
			{checkIsDispensaryOpen(dispensary?.schedule) ? 'open now' : 'closed'}
		</Paragraph>
	);

	const applyDispensaryStyles: Record<string, string> = {
		'primary-color': dispensary?.siteSetting?.primaryColor as string,
		'secondary-color': dispensary?.siteSetting?.secondaryColor as string,
		'tertiary-color': dispensary?.siteSetting?.tertiaryColor as string,
		'text-color': dispensary?.siteSetting?.textColor as string,
		'background-color': dispensary?.siteSetting?.backgroundColor as string,
	};

	const hasLogo = !!dispensary?.images?.[0]?.location;

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

	return (
		<Link
			href={formatDispensaryUrl(dispensary?.subdomainId, dispensary?.id)}
			className="shadow"
		>
			<CardWithData
				data={dispensary}
				className={twMerge([
					styles.dispensaryCard,
					'rounded overflow-hidden',
					'shadow',
					'transition',
					current ? 'border-2 border-primary' : 'border-2 border-transparent',
					className,
				])}
			>
				<ImageBackDrop
					src={dispensary?.images?.[0]?.location || logo.src}
					blurData={dispensary?.images?.[0]?.blurhash || ''}
				>
					<FlexBox className="z-5 left-0 flex-col p-2 px-4">
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
							{dispensary?.address?.street1}
						</Paragraph>
						<OpenBadge />
					</FlexBox>
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
