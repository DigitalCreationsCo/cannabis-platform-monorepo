import Image, { type StaticImageData } from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA } from '../../button';
import FlexBox from '../../FlexBox';
import IconWrapper from '../../IconWrapper';
import { H5, H2, H3 } from '../../Typography';

export interface BenefitData {
	title?: string;
	description?: string;
	image?: StaticImageData | string;
	bullets: {
		title?: string;
		description?: string;
		icon: any;
	}[];
	cta?: string;
}

interface BenefitsProps extends HTMLAttributes<HTMLDivElement> {
	data: BenefitData;
	imagePosition?: 'left' | 'right';
	orientation?: 'row' | 'col';
	values?: number[];
	valueColor?: string;
	href?: string;
}

export default function Benefits({
	data,
	imagePosition = 'right',
	orientation: ornt = 'col',
	values,
	valueColor = 'text-dark',
	href = '#get-started',
	...props
}: BenefitsProps) {
	const orientation = ornt === 'row' ? 'flex-row' : 'flex-col';
	return (
		<div
			id={props.id}
			className={twMerge(
				'relative bg-inverse',
				'py-20 pb-24',
				'gap-8',
				`${data.image && imagePosition === 'right' ? 'lg:justify-end' : ''}`,
				props.className
			)}
		>
			<FlexBox
				className={twMerge(
					'flex flex-col flex-wrap items-center text-center justify-center gap-4 mx-auto max-w-md'
				)}
			>
				{(data.title && (
					<H2
						className={twMerge(
							styles.HERO.heading,
							'text-dark',
							'font-semibold'
							// styles.shadow.textShadow
						)}
					>
						{data.title}
					</H2>
				)) || <></>}
				{data.description && <H3>{data.description}</H3>}
				<FlexBox
					className={twMerge(
						'flex flex-col lg:flex-row flex-wrap items-center justify-center gap-8 py-8'
					)}
				>
					{data.bullets.length > 0 && (
						<FlexBox
							className={twMerge(
								'max-w-md',
								'gap-y-8 justify-around',
								'xl:' + orientation
							)}
						>
							{data.bullets.map((item: any, index: any) => (
								<Benefit
									key={index}
									title={item.title}
									icon={item.icon}
									description={item.description}
									value={values?.[index]}
									valueColor={valueColor}
								/>
							))}
						</FlexBox>
					)}

					{data.image && (
						<div
							className={`max-w-lg flex items-center justify-center -order-1 lg:order-1 ${
								imagePosition === 'right' ? 'lg:order-1' : 'lg:-order-1'
							}`}
						>
							<Image
								height={400}
								className="bg-inverse shadow-lg md:rounded object-cover"
								src={data.image}
								alt="Benefits"
								placeholder="blur"
								blurDataURL={data.image.toString()}
								unoptimized
								quality={25}
							/>
						</div>
					)}
				</FlexBox>
				<>{props.children}</>
				{(data.cta && <CTA cta={data.cta} href={href} />) || <></>}
			</FlexBox>
		</div>
	);
}

export function Benefit(
	props: BenefitData['bullets'][number] & {
		value?: number;
		valueColor?: string;
	}
) {
	return (
		<div className="m-auto w-full flex flex-col max-w-[440px] px-2 items-center space-x-3">
			<FlexBox className="w-full flex-row items-center gap-4">
				<div className="flex h-11 w-11 shadow-lg shrink-0 items-center justify-center bg-orange-300">
					<IconWrapper iconSize={30} Icon={props.icon} />
				</div>
				<div className={twMerge('w-full', props.valueColor)}>
					<H5>
						{props.title}
						<span className={props.valueColor}>
							{props.value && ` ($${props.value} value)`}
						</span>
					</H5>
					{props.description && <H5>{props.description}</H5>}
				</div>
			</FlexBox>
		</div>
	);
}
