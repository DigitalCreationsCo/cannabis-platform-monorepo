import { FlexBox, H3, Paragraph, IconWrapper, H5 } from '@cd/ui-lib';
import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { type BenefitData } from './benefit-data';

interface BenefitsProps extends HTMLAttributes<HTMLDivElement> {
	data: BenefitData;
	imagePosition?: 'left' | 'right';
	orientation?: 'row' | 'col';
}

export default function Benefits({
	data,
	imagePosition = 'right',
	orientation: ornt = 'row',
	...props
}: BenefitsProps) {
	const orientation = ornt === 'row' ? 'flex-row' : 'flex-col';
	return (
		<div
			id={props.id}
			className={twMerge(
				'gap-8',
				'py-12',
				`${data.image && imagePosition === 'right' ? 'lg:justify-end' : ''}`,
				props.className,
			)}
		>
			<FlexBox
				className={twMerge(
					'flex flex-col flex-wrap items-center justify-center gap-8 md:space-x-12 md:space-y-0',
				)}
			>
				{data.title && (
					<H3 className="px-4 drop-shadow-xl mt-3 text-center text-4xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight">
						{data.title}
					</H3>
				)}
				{data.description && (
					<Paragraph className="m-auto py-4 text-justify leading-normal lg:text-lg xl:text-lg">
						{data.description}
					</Paragraph>
				)}
				<FlexBox
					className={twMerge(
						'flex flex-col md:flex-row flex-wrap items-center justify-center gap-8',
					)}
				>
					<FlexBox
						className={twMerge(
							'max-w-md',
							'gap-2 justify-around',
							'xl:' + orientation,
						)}
					>
						{data.bullets.map((item: any, index: any) => (
							<Benefit
								key={index}
								title={item.title}
								icon={item.icon}
								description={item.desc}
							/>
						))}
					</FlexBox>

					{data.image && (
						<div
							className={`flex items-center justify-center ${
								imagePosition === 'right' ? 'lg:order-1' : ''
							}`}
						>
							<Image
								className="bg-inverse border-2 rounded-full"
								height={300}
								width={300}
								src={data.image}
								alt="Benefits"
								placeholder="blur"
								blurDataURL={data.image.toString()}
							/>
						</div>
					)}
				</FlexBox>
			</FlexBox>
		</div>
	);
}

export function Benefit(props: BenefitData['bullets'][number]) {
	return (
		<div className="m-auto w-full flex max-w-[440px] px-2 items-center space-x-3">
			<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-300">
				<IconWrapper iconSize={32} Icon={props.icon} />
			</div>
			<div className="w-full">
				<H5 className="text-xl whitespace-nowrap font-medium ">
					{props.title}
				</H5>
				{props.description && (
					<Paragraph className="text-dark mt-1 text-lg">
						{props.description}
					</Paragraph>
				)}
			</div>
		</div>
	);
}
