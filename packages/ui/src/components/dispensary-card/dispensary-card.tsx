"use client"
import { Card, BackgroundImage, Text, Button, Group, Title } from '@mantine/core';
import logo from "../../assets/logo.png"
import OpenBadge from './open-badge';

export type DispensaryCardProps = {
    dispensary: any
}

export default function DispensaryCard({dispensary}: DispensaryCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" 
    h={200}
    withBorder>
        <BackgroundImage
          src={dispensary?.images?.[0]?.location || logo.src}
        />

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={2}>{dispensary.name}</Title>
        <OpenBadge schedule={dispensary.schedule} />
      </Group>

      <Text size="sm" c="dimmed">
        {dispensary.address.street1}
      </Text>

      <Button color="blue" mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  )
}

// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import {
// 	checkIsDispensaryOpen,
// 	// formatDispensaryUrl,
// 	getNextScheduleDay,
// 	integerToTime,
// 	// showTime,
// } from '../../../../core/src/utils';
// import { type Schedule, type Dispensary } from '@gras/data-access';
// import Image from 'next/image';
// import Link from 'next/link';
// import {
// 	useCallback,
// 	type PropsWithChildren,
// 	useState,
// 	type CSSProperties,
// } from 'react';
// import { twMerge } from 'tailwind-merge';
// import logo from '../../../public/assets/images/logo.png';
// import { styles } from '../../styleClassNames';
// import FlexBox from '../FlexBox';
// import { H3, Paragraph } from '../Typography';

// export interface DispensaryCardProps {
// 	data: Required<Dispensary>;
// 	loading?: boolean;
// 	className?: string | string[];
// 	current?: boolean;
// 	priority?: boolean;
// }

// function DispensaryCard({
// 	data: dispensary,
// 	loading,
// 	className,
// 	priority = false,
// }: DispensaryCardProps) {
// 	const [isHovered, setIsHovered] = useState(false);
// 	const handleMouseEnter = () => setIsHovered(true);
// 	const handleMouseLeave = () => setIsHovered(false);

// 	const ImageBackDrop = useCallback(
// 		({
// 			src,
// 			children,
// 			blurData = undefined,
// 		}: { src: string; blurData?: string } & PropsWithChildren) => {
// 			return (
// 				<div className="absolute left-0 top-0 bg-transparent h-full w-full flex -z-5">
// 					<Image
// 						priority={priority}
// 						placeholder={blurData ? 'blur' : 'empty'}
// 						blurDataURL={blurData}
// 						className={`${
// 							isHovered ? `hidden` : ``
// 						} object-contain self-center pt-6 px-4 py-2`}
// 						src={src}
// 						alt={dispensary?.name}
// 						sizes="(max-width: 180px)"
// 						fill
// 						quality={25}
// 						unoptimized
// 						loader={({ src }) => src}
// 						style={{
// 							maxHeight: '220px',
// 						}}
// 					/>
// 					{children}
// 				</div>
// 			);
// 		},
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 		[dispensary]
// 	);

// 	const OpenBadge = ({ schedule }: { schedule: Schedule[] }) => {
// 		const nextScheduleDay = getNextScheduleDay(schedule);
// 		return (
// 			<Paragraph
// 				// style={{
// 				// 	color: checkIsDispensaryOpen(schedule)
// 				// 		? applyDispensaryStyles['primary-color']
// 				// 		: applyDispensaryStyles['secondary-color'],
// 				// }}
// 				className={twMerge(styles.isOpenBadge, 'z-50 text-white font-medium')}
// 			>
// 				{nextScheduleDay ? (
// 					checkIsDispensaryOpen(schedule) ? (
// 						`closes at ${integerToTime(Number(nextScheduleDay.closeAt))}`
// 					) : (
// 						`opens ${
// 							nextScheduleDay.day === 'today' ? '' : nextScheduleDay.day
// 						} at ${integerToTime(Number(nextScheduleDay.openAt))}`
// 					)
// 				) : (
// 					<></>
// 				)}
// 			</Paragraph>
// 		);
// 	};

// 	const applyDispensaryStyles: Record<string, string> = {
// 		'primary-color': dispensary?.siteSetting?.primaryColor as string,
// 		'secondary-color': dispensary?.siteSetting?.secondaryColor as string,
// 		'tertiary-color': dispensary?.siteSetting?.tertiaryColor as string,
// 		'text-color': dispensary?.siteSetting?.textColor as string,
// 		'background-color': dispensary?.siteSetting?.backgroundColor as string,
// 	};

// 	const hasLogo = dispensary?.images?.[0]?.location || false;

// 	const hoverStyles: CSSProperties = {
// 		position: 'absolute',
// 		zIndex: 10,
// 		backgroundColor: 'rgb(77,113,152,0.5)',
// 		width: '100%',
// 		height: '100%',
// 		color: 'white',
// 		transition: 'all 0.1s ease-in-out',
// 	};

// 	if (loading)
// 		return (
// 			<div
// 				className={twMerge([
// 					styles.dispensaryCard,
// 					'bg-light',
// 					'animate-pulse',
// 					className,
// 				])}
// 			/>
// 		);

// 	if (!dispensary?.name)
// 		return (
// 			<div className={twMerge([styles.dispensaryCard, 'bg-light', className])}>
// 				<Paragraph>!</Paragraph>
// 			</div>
// 		);

// 	return (
// 		<div
// 			style={{
// 				borderColor: applyDispensaryStyles['background-color'],
// 				backgroundColor:
// 					(hasLogo && applyDispensaryStyles['background-color']) || '#ffffff',
// 			}}
// 			onClick={() => {
// 				if (document.activeElement) {
// 					(document.activeElement as HTMLElement).blur();
// 				}
// 			}}
// 			onMouseEnter={handleMouseEnter}
// 			onMouseLeave={handleMouseLeave}
// 			className={twMerge(styles.dispensaryCard, styles.floatingCard)}
// 		>
// 			<ImageBackDrop
// 				src={dispensary?.images?.[0]?.location || logo.src}
// 				blurData={dispensary?.images?.[0]?.blurhash || ''}
// 			>
// 				<FlexBox className="z-5 left-0 flex-col w-full">
// 					{isHovered ? (
// 						<div style={{ ...hoverStyles }} className="px-1 w-full">
// 							<Link
// 								href={`/browse/${dispensary.slug}`}
// 								className="text-light hover:text-secondary-light absolute !p-0 !m-0 w-32 h-32 md:w-24 md:h-24 lg:w-32 lg:h-32 -right-7 md:-right-8 -bottom-8 md:bottom-0 lg:-bottom-10 rounded-full"
// 							>
// 								<ArrowRightCircleIcon />
// 							</Link>
// 							<H3
// 								style={{ color: applyDispensaryStyles['primary-color'] }}
// 								className="drop-shadow overflow-x-hidden z-5"
// 							>
// 								{dispensary?.name}
// 							</H3>
// 							<FlexBox className="flex-wrap flex-row gap-x-1">
// 								<Paragraph className="drop-shadow tracking-wider text-sm">
// 									{dispensary?.address?.street1}{' '}
// 								</Paragraph>
// 								<OpenBadge schedule={dispensary?.schedule || []} />
// 							</FlexBox>
// 							<FlexBox className="z-5 absolute bottom-0 left-0 flex-col p-2 px-4">
// 								<Paragraph className="text-inverse text-xl font-semibold drop-shadow">
// 									{(dispensary?.isSubscribedForDelivery &&
// 										'Accepting Delivery') ||
// 										(dispensary?.isSubscribedForPickup && 'Order for Pickup') ||
// 										''}
// 								</Paragraph>
// 							</FlexBox>
// 						</div>
// 					) : (
// 						<div className="px-1 w-full">
// 							<H3
// 								style={{ color: applyDispensaryStyles['primary-color'] }}
// 								className="drop-shadow overflow-x-hidden z-5"
// 							>
// 								{dispensary?.name}
// 							</H3>
// 							<Paragraph
// 								style={{ color: applyDispensaryStyles['secondary-color'] }}
// 								className="drop-shadow tracking-wider text-sm"
// 							>
// 								{dispensary?.address?.street1}
// 							</Paragraph>
// 						</div>
// 					)}
// 				</FlexBox>
// 			</ImageBackDrop>
// 		</div>
// 	);
// }

// export default DispensaryCard;
