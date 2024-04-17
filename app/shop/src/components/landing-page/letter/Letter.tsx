import { FlexBox, H2, Paragraph, styles } from '@cd/ui-lib';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { CTA2XMyBusiness } from 'pages/work-with-us/[[...work-with-us]]';

interface LetterProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	text: string;
	footer?: string;
	cta?: string;
}

export default function Letter({
	title,
	subtitle,
	text,
	footer,
	cta,
	...props
}: LetterProps) {
	return (
		<div className={twMerge('relative bg-inverse py-20', props.className)}>
			<FlexBox
				className={twMerge(
					'flex flex-col flex-wrap items-center justify-center gap-2 space-y-0 max-w-lg md:max-w-2xl lg:max-w-5xl mx-auto',
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
				<div className="max-w-xl text-justify py-4">
					{subtitle && (
						<Paragraph className="font-semibold mt-1 text-2xl">
							{subtitle}
						</Paragraph>
					)}
					{text && (
						<Paragraph className="font-normal mt-1 text-2xl">{text}</Paragraph>
					)}
					{footer && (
						<Paragraph className="font-semibold mt-1 text-2xl">
							{'\n'}
							{footer}
						</Paragraph>
					)}
				</div>
				{(cta && <CTA2XMyBusiness cta={cta} />) || <></>}
			</FlexBox>
		</div>
	);
}
