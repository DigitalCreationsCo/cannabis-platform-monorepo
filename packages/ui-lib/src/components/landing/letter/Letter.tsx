import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA } from '../../button';
import FlexBox from '../../FlexBox';
import { H2, H3, H4, H5, Paragraph } from '../../Typography';

interface LetterProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	text?: string;
	footer?: string;
	cta?: string;
	secondaryCTA?: string;
	href?: string;
	photos?: string[];
	divider?: boolean;
}

export default function Letter({
	title,
	subtitle,
	text,
	footer,
	cta,
	href = '#get-started',
	photos = [],
	divider = true,
	secondaryCTA,
	...props
}: LetterProps) {
	return (
		<div
			id={props.id}
			className={twMerge('relative bg-inverse py-20 pb-16', props.className)}
		>
			<FlexBox
				className={twMerge(
					'bg-inherit flex flex-col flex-wrap items-center justify-center gap-2 space-y-0 max-w-md sm:!max-w-2xl lg:!max-w-4xl mx-auto'
				)}
			>
				{title && (
					<H2 className={twMerge(styles.HERO.heading, 'text-dark')}>{title}</H2>
				)}
				{divider && <div className="w-11/12 mx-auto border-b-4"></div>}
				<FlexBox className="w-full z-10 bg-inherit items-center justify-center">
					<div className="mx-auto max-w-2xl py-4 px-10 bg-inherit">
						{subtitle && <H3 className="mt-1 leading-normal">{subtitle}</H3>}
						{text && (
							<H4 className="font-normal mt-1 leading-normal">{text}</H4>
						)}
						{props.children}
						{footer && <H4 className="mt-1 leading-normal">{footer}</H4>}
					</div>

					{photos.length > 0 && (
						<div className="flex flex-col md:flex-row justify-center gap-y-2 py-6">
							{photos.map((photo: string, index) => (
								<Image
									key={index}
									className={twMerge(
										`rotate-[${359.5}deg] max-w-sm max-h-[275px]`,
										index > 1 ? 'hidden lg:block' : 'block',
										index === 1 ? 'z-10' : ''
									)}
									src={photo}
									alt={`${title}-photo-${index}`}
									quality={25}
									unoptimized
								/>
							)) || <></>}
						</div>
					)}
				</FlexBox>
				<FlexBox className="py-6 gap-4 lg:gap-8 lg:flex-row-reverse">
					{(cta && <CTA cta={cta} href={href} />) || <></>}
					{(secondaryCTA && (
						<CTA cta={secondaryCTA} href={'#get-started'} secondary />
					)) || <></>}
				</FlexBox>
			</FlexBox>
		</div>
	);
}
