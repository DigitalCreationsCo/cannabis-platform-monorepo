/* eslint-disable i18next/no-literal-string */
import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, H1, H2, Paragraph, styles } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Partners from '../partners/Partners';
import { recognizedBy } from '../partners/partners-data';
import { CTA } from '../';

function Hero() {
	const [heading, largeHeading] = [
		'tracking-tight inline-block whitespace-pre-line font-bold text-secondary-light text-5xl md:text-6xl xl:text-6xl drop-shadow-[0px_1px_1px_#444444] md:drop-shadow-[0px_-2px_1px_#666666]',
		'tracking-normal bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline whitespace-pre-line text-6xl font-bold md:text-7xl drop-shadow-[0px_3px_1px_#444444] lg:text-8xl xl:text-8xl md:drop-shadow-[1px_-5px_1px_#666666]',
	];
	return (
		<section className={twMerge('bg-inverse-soft', 'pt-8 md:pt-16')}>
			<div
				className={twMerge(
					'sm:' + styles.textShadow,
					'text-center space-y-4 max-w-7xl mx-auto',
				)}
			>
				<H2 className={twMerge('font-black text-3xl text-dark')}>
					ATTENTION DISPENSARY OWNERS...
				</H2>
				{/* <H1 className={twMerge('pb-2', heading)}>Fast&nbsp;</H1>
				<H1 className={heading}>and&nbsp;</H1>
				<H1 className={heading}>Easy</H1>
				<H1 className={largeHeading}>{`\nCannabis`}</H1>
				<H1 className={largeHeading}>&nbsp;Delivery</H1> */}
				<div>
					<H1 className={twMerge(heading)}>
						{`Finally, the ultimate dispensary growth service for delivery and
					customer outreach that will\n`}
					</H1>
					<H1
						className={twMerge(largeHeading, 'inline text-center')}
					>{`2X your business`}</H1>
				</div>
			</div>
			<div className="sm:my-0 mx-auto grid max-w-screen-xl p-6 place-self-center text-center gap-y-8 mt-0">
				<Paragraph className="font-encode mx-auto tracking-wider max-w-lg xl:max-w-xl text-2xl xl:text-3xl whitespace-pre-line !leading-10">
					Our <b className="text-primary">Delivery</b> and{' '}
					<b className="text-primary">Customer Service </b>
					experience grows your sales by 20% in 100 days, and 2X sales in 1
					year.
				</Paragraph>
				<FlexBox className="items-center gap-4 sm:flex-row justify-center lg:gap-8">
					<CTA />
					<Link
						href={'#letter-1'}
						scroll={false}
						className="w-[240px] placeholder:hover:scale-105 transition duration-200 pb-2"
					>
						<Button
							size="lg"
							bg="secondary-light"
							hover="primary"
							className="w-full px-8"
						>
							{TextContent.info.LEARN_MORE}
						</Button>
					</Link>
				</FlexBox>
			</div>
			<Partners
				id="recognized-by-partners"
				className="pb-12"
				title={''}
				partners={recognizedBy}
			/>
		</section>
	);
}

export default Hero;
