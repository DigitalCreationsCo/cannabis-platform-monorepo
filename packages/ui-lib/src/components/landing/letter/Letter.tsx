import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA } from '../../button';
import FlexBox from '../../FlexBox';
import { H2, Paragraph } from '../../Typography';

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
			className={twMerge('relative bg-inverse py-20 pb-24', props.className)}
		>
			<FlexBox
				className={twMerge(
					'bg-inherit flex flex-col flex-wrap items-center justify-center gap-2 space-y-0 max-w-md sm:!max-w-2xl lg:!max-w-4xl mx-auto'
				)}
			>
				{title && (
					<H2
						className={twMerge(
							styles.shadow.textShadow,
							'whitespace-pre-line mt-3 text-center font-bold leading-snug tracking-tight lg:leading-tight text-5xl lg:text-6xl'
						)}
					>
						{title}
					</H2>
				)}
				{divider && <div className="w-11/12 mx-auto border-b-4"></div>}
				<FlexBox className="w-full z-10 bg-inherit items-center justify-center">
					<div className="mx-auto max-w-2xl py-4 px-10 bg-inherit">
						{subtitle && (
							<Paragraph className="font-semibold mt-1 text-2xl">
								{subtitle}
							</Paragraph>
						)}
						{text && (
							<Paragraph className="font-normal mt-1 text-2xl">
								{text}
							</Paragraph>
						)}
						{props.children}
						{footer && (
							<Paragraph className="font-semibold mt-1 text-2xl">
								{footer}
							</Paragraph>
						)}
					</div>

					{photos.length > 0 && (
						<div className="flex-row justify-center md:flex hidden py-6">
							{photos.map((photo: string, index) => (
								<Image
									key={index}
									className={twMerge(
										'rotate-[359.5deg] max-w-sm max-h-[275px]',
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
