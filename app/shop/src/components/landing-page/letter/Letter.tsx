import { FlexBox, H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { CTA2XMyBusiness } from 'pages/work-with-us/[[...work-with-us]]';

interface LetterProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	text: string;
	footer?: string;
	cta?: string;
	photos?: string[];
}

export default function Letter({
	title,
	subtitle,
	text,
	footer,
	cta,
	photos = [],
	...props
}: LetterProps) {
	return (
		<div
			id={props.id}
			className={twMerge('relative bg-inverse py-20 pb-24', props.className)}
		>
			<FlexBox
				className={twMerge(
					' bg-inherit flex flex-col flex-wrap items-center justify-center gap-2 space-y-0 max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto',
				)}
			>
				{title && (
					<H2
						className={twMerge(
							styles.textShadow,
							'whitespace-pre-line mt-3 text-center text-5xl font-bold leading-snug tracking-tight lg:text-6xl lg:leading-tight',
						)}
					>
						{title}
					</H2>
				)}
				<div className="w-11/12 mx-auto border-b-4"></div>
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
										index === 1 ? 'z-10' : '',
									)}
									src={photo}
									alt={`${title}-photo-${index}`}
								/>
							)) || <></>}
						</div>
					)}
				</FlexBox>
				{(cta && (
					<div className="py-6">
						<CTA2XMyBusiness cta={cta} />
					</div>
				)) || <></>}
			</FlexBox>
		</div>
	);
}
