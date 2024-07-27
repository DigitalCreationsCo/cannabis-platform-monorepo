/* eslint-disable i18next/no-literal-string */
import { TextContent } from '@cd/core-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { styles } from '../../../styleClassNames';
import { CTA, Button } from '../../button';
import FlexBox from '../../FlexBox';
import { H1, H2, H3 } from '../../Typography';
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
		<section
			className={twMerge(['bg-inverse-soft', 'pt-0 px-4 md:pt-8', 'mx-auto'])}
		>
			<div className="space-y-4 max-w-6xl mx-auto">
				<div className="max-w-5xl mx-auto w-fit text-center xl:text-start">
					{showPretext ? (
						<H3 className="lg:pb-4 text-center">
							For the Cannabis Business Owner,
						</H3>
					) : (
						<></>
					)}
					<H1
						className={twMerge(heading, 'font-onest', styles.shadow.textShadow)}
					>
						The ultimate cannabis business growth solution is here:
					</H1>
				</div>
				<div className="text-center">
					<H1 className={twMerge(largeHeading, styles.shadow.textShadowLg)}>
						2X Your Business in 12 Months
					</H1>
				</div>
			</div>
			<div className="max-w-3xl sm:my-0 mx-auto grid p-6 pb-12 place-self-center text-center gap-y-8 mt-0">
				<H3>
					Achieve remarkable growth while simplifying operations and ensuring
					compliance.
				</H3>
				<FlexBox className="items-center gap-4 flex-col-reverse sm:flex-row justify-center lg:gap-8">
					<CTA href={'#info'} secondary />
					<CTA href={href} />
				</FlexBox>
			</div>
			<Partners
				id="recognized-by-partners"
				title={'Recognized by trusted organizations'}
				partners={recognizedBy}
			/>
		</section>
	);
}

export default Hero;
