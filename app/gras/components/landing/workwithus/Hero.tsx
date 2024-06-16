/* eslint-disable i18next/no-literal-string */
import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, H1, H2, Paragraph, styles } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { CTA } from '../';
import Partners from '../partners/Partners';
import { recognizedBy } from '../partners/partners-data';

function Hero({ showPretext = true }) {
	const { heading, largeHeading } = styles.HERO;
	return (
		<section className={twMerge('bg-inverse-soft', 'pt-8 md:pt-16')}>
			<div
				className={twMerge(
					'sm:' + styles.textShadow,
					'text-center space-y-4 max-w-7xl mx-auto'
				)}
			>
				{showPretext ? (
					<H2 className={twMerge('font-black text-3xl text-dark')}>
						CANNABIS BUSINESS OWNERS, FINALLY...
					</H2>
				) : (
					<></>
				)}
				<div>
					<H1 className={twMerge(heading)}>
						{`The ultimate cannabis business service inluding delivery and software to\n`}
					</H1>
					<H1
						className={twMerge(largeHeading, 'inline text-center')}
					>{`2X Your Business`}</H1>
				</div>
			</div>
			<div className="sm:my-0 mx-auto grid max-w-screen-xl p-6 place-self-center text-center gap-y-8 mt-0">
				<H2 className="font-encode mx-auto tracking-wider max-w-lg xl:max-w-xl text-2xl xl:text-3xl whitespace-pre-line !leading-10">
					Grow your sales by 20% in 100 days, and 2X sales in 1 year with
					<b className="text-primary"> Cannabis Delivery Software</b> and
					<b className="text-primary"> Growth Services</b> for cannabis
					businesses.
				</H2>
				<FlexBox className="items-center gap-4 sm:flex-row justify-center lg:gap-8">
					<CTA />
					<Link
						href={'#grow'}
						scroll={false}
						className="w-[240px] placeholder:hover:scale-105 transition duration-200 pb-2"
					>
						<Button
							size="lg"
							bg="transparent"
							hover="transparent"
							className="w-full px-8 uppercase border-primary border-[3px]"
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
