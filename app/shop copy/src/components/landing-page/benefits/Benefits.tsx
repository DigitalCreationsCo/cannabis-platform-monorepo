import {
	FlexBox,
	H3,
	Paragraph,
	IconWrapper,
	H5,
	H4,
	styles,
} from '@cd/ui-lib';
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
				'relative',
				'gap-8',
				'py-16',
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
					<H3
						className={twMerge(
							styles.textShadow,
							'mt-3 text-center text-4xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight',
						)}
					>
						{data.title}
					</H3>
				)}
				{data.description && (
					<H4 className="w-3/4 text-xl text-center leading-normal">
						{data.description}
					</H4>
				)}
				<FlexBox
					className={twMerge(
						'flex flex-col md:flex-row flex-wrap items-center justify-center gap-8',
					)}
				>
					{data.bullets.length > 0 && (
						<FlexBox
							className={twMerge(
								'max-w-md',
								'gap-y-8 justify-around',
								'xl:' + orientation,
							)}
						>
							{data.bullets.map((item: any, index: any) => (
								<Benefit
									key={index}
									title={item.title}
									icon={item.icon}
									description={item.description}
								/>
							))}
						</FlexBox>
					)}

					{data.image && (
						<div
							className={`max-w-3xl m-8 flex items-center justify-center ${
								imagePosition === 'right' ? 'lg:order-1' : ''
							}`}
						>
							<Image
								className="bg-inverse shadow-lg rounded w-lg"
								src={data.image}
								alt="Benefits"
								placeholder="blur"
								blurDataURL={data.image.toString()}
							/>
						</div>
					)}
					{props.children}
				</FlexBox>
			</FlexBox>
		</div>
	);
}

export function Benefit(props: BenefitData['bullets'][number]) {
	return (
		<div className="m-auto w-full flex flex-col max-w-[440px] px-2 items-center space-x-3">
			<H5 className="text-xl text-center whitespace-nowrap font-medium ">
				{props.title}
			</H5>
			<FlexBox className="w-full flex-row items-center gap-4">
				<div className="flex h-11 w-11 shadow-lg shrink-0 items-center justify-center rounded-md bg-orange-300">
					<IconWrapper iconSize={32} Icon={props.icon} />
				</div>
				<div>
					{props.description && (
						<Paragraph className="text-dark mt-1 text-lg">
							{props.description}
						</Paragraph>
					)}
				</div>
			</FlexBox>
		</div>
	);
}
