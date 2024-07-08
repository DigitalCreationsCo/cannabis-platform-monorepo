/* eslint-disable i18next/no-literal-string */
import { TextContent } from '@cd/core-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA, Button } from '../../button';
import FlexBox from '../../FlexBox';
import { H1, H2 } from '../../Typography';
import Partners from '../partners/Partners';
import { recognizedBy } from '../partners/partners-data';

function Hero({
	showPretext = true,
	href = '#get-started',
}: {
	showPretext?: boolean;
	href?: string;
}) {
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
						CANNABIS BUSINESS OWNERS, finally...
					</H2>
				) : (
					<></>
				)}
				<div>
					<H1 className={twMerge(heading)}>
						{`The ultimate cannabis business success service guaranteed to\n`}
					</H1>
					<H1
						className={twMerge(largeHeading, 'inline text-center')}
					>{`2X Your Business`}</H1>
				</div>
			</div>
			<div className="sm:my-0 mx-auto grid max-w-screen-xl p-6 place-self-center text-center gap-y-8 mt-0">
				<H2 className="mx-auto font-medium tracking-wider max-w-lg xl:max-w-xl text-2xl xl:text-3xl whitespace-pre-line !leading-10">
					Boost your sales by 10% in 100 days, and 2X sales in 1 year with our
					suite of
					<b className="text-primary"> Promotions, Events</b> and
					<b className="text-primary"> Delivery</b> Services.
				</H2>
				<FlexBox className="items-center gap-4 sm:flex-row justify-center lg:gap-8">
					<Link
						href={'#info'}
						scroll={false}
						className="w-[240px] hover:scale-105 transition duration-200 pb-2"
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
					<CTA href={href} />
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
