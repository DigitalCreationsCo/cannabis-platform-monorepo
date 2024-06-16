/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
	checkIsDispensaryOpen,
	// formatDispensaryUrl,
	getNextScheduleDay,
	integerToTime,
	// showTime,
} from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import {
	ArrowRightStartOnRectangleIcon,
	BuildingLibraryIcon,
	BuildingOfficeIcon,
	BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import {
	useCallback,
	type PropsWithChildren,
	useState,
	type CSSProperties,
} from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../../public/assets/images/logo.png';
import { styles } from '../../styleClassNames';
import FlexBox from '../FlexBox';
import { H3, Paragraph } from '../Typography';
import { default as css } from './DispensaryCard.module.css';

export type DispensaryCardProps = {
	data: Required<Dispensary>;
	loading?: boolean;
	className?: string | string[];
	current?: boolean;
	priority?: boolean;
};

function DispensaryCard({
	data: dispensary,
	loading,
	className,
	current,
	priority = false,
}: DispensaryCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	// Event handlers for mouse enter and leave
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const ImageBackDrop = useCallback(
		({
			src,
			children,
			blurData = undefined,
		}: { src: string; blurData?: string } & PropsWithChildren) => {
			return (
				<div className="absolute left-0 top-0 bg-transparent h-full w-full flex -z-5">
					<Image
						priority={priority}
						placeholder={blurData ? 'blur' : 'empty'}
						blurDataURL={blurData}
						className={`${
							isHovered ? `hidden` : ``
						} object-contain self-center pt-6 px-4 py-2`}
						src={src}
						alt={dispensary?.name}
						sizes="(max-width: 180px)"
						fill
						quality={25}
						loader={({ src }) => src}
						style={{
							maxHeight: '220px',
						}}
					/>
					{children}
				</div>
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispensary]
	);

	const OpenBadge = ({ schedule }: { schedule: Dispensary['schedule'] }) => {
		const nextScheduleDay = getNextScheduleDay(schedule);
		return (
			<Paragraph
				// style={{
				// 	color: checkIsDispensaryOpen(schedule)
				// 		? applyDispensaryStyles['primary-color']
				// 		: applyDispensaryStyles['secondary-color'],
				// }}
				className={twMerge(styles.isOpenBadge, 'text-white font-medium')}
			>
				{checkIsDispensaryOpen(schedule)
					? `closes at ${integerToTime(Number(nextScheduleDay.closeAt))}`
					: `opens ${
							nextScheduleDay.day === 'today' ? '' : nextScheduleDay.day
						} at ${integerToTime(Number(nextScheduleDay.openAt))}`}
			</Paragraph>
		);
	};

	const applyDispensaryStyles: Record<string, string> = {
		'primary-color': dispensary?.siteSetting?.primaryColor as string,
		'secondary-color': dispensary?.siteSetting?.secondaryColor as string,
		'tertiary-color': dispensary?.siteSetting?.tertiaryColor as string,
		'text-color': dispensary?.siteSetting?.textColor as string,
		'background-color': dispensary?.siteSetting?.backgroundColor as string,
	};

	const hasLogo = dispensary?.images?.[0]?.location || false;

	const hoverStyles: CSSProperties = {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: 'rgb(0,0,0,.6)',
		width: '100%',
		height: '100%',
		color: 'white',
		// fontSize: '20px',
		// cursor: 'pointer',
	};

	if (loading)
		return (
			<div
				className={twMerge([
					styles.dispensaryCard,
					'bg-light',
					'animate-pulse',
					className,
				])}
			/>
		);

	if (!dispensary || !dispensary.name)
		return (
			<div className={twMerge([styles.dispensaryCard, 'bg-light', className])}>
				<Paragraph>!</Paragraph>
			</div>
		);

	return (
		<div
			style={{
				borderColor: applyDispensaryStyles['background-color'],
				backgroundColor:
					(hasLogo && applyDispensaryStyles['background-color']) || '#fff2da',
			}}
			onClick={() => {
				if (document.activeElement) {
					(document.activeElement as HTMLElement).blur();
				}
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={twMerge(styles.dispensaryCard, css.dispensaryCard)}
		>
			<ImageBackDrop
				src={dispensary?.images?.[0]?.location || logo.src}
				blurData={dispensary?.images?.[0]?.blurhash || ''}
			>
				<FlexBox
					className="z-5 left-0 flex-col"
					// className={`z-5 left-0 flex-col transition transition-opacity duration-300 ${
					// 	isHovered ? 'opacity-100' : 'opacity-0'
					// }`}
				>
					{isHovered ? (
						<div style={{ ...hoverStyles }} className="w-full px-2">
							<Link
								href={`/browse/${dispensary.slug}`}
								className="absolute bg-dark transition-50 w-30 h-30 bottom-1 right-1 p-2.5 rounded-full hover:text-[#f4d03f]"
							>
								<BuildingStorefrontIcon height={28} width={28} />
							</Link>
							<H3 className="z-5 font-semibold left-0 top-0 max-w-[248px] whitespace-normal tracking-wide drop-shadow text-[22px]">
								{dispensary?.name}
							</H3>
							<FlexBox className="flex-wrap flex-row gap-x-1">
								<Paragraph className="drop-shadow tracking-wider text-sm">
									{dispensary?.address?.street1}{' '}
								</Paragraph>
								<OpenBadge schedule={dispensary?.schedule || []} />
							</FlexBox>
							<FlexBox className="z-5 absolute bottom-0 left-0 flex-col p-2 px-4">
								<Paragraph className="text-inverse text-xl font-semibold drop-shadow">
									{(dispensary?.isSubscribedForDelivery &&
										'Accepting Delivery') ||
										(dispensary?.isSubscribedForPickup && 'Order for Pickup') ||
										''}
								</Paragraph>
							</FlexBox>
						</div>
					) : (
						<div className="w-full px-2">
							<H3
								style={{ color: applyDispensaryStyles['primary-color'] }}
								className="z-5 font-semibold left-0 top-0 max-w-[248px] whitespace-normal tracking-wide drop-shadow text-[22px]"
							>
								{dispensary?.name}
							</H3>
							<Paragraph
								style={{ color: applyDispensaryStyles['secondary-color'] }}
								className="drop-shadow tracking-wider text-sm"
							>
								{dispensary?.address?.street1}
							</Paragraph>
						</div>
					)}
				</FlexBox>
			</ImageBackDrop>
		</div>
	);
}

export default DispensaryCard;
