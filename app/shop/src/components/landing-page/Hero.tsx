import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, H1 } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import heroImg from '../../../public/cannabis-delivered.jpg';

function Hero() {
	return (
		<section className={twMerge('bg-inverse', 'pt-16')}>
			<div className="text-center mt-16 sm:mt-0">
				<H1 className="pb-2 inline-block max-w-4xl whitespace-pre-line text-4xl font-bold text-secondary-light sm:text-6xl xl:text-7xl">
					Fast&nbsp;
				</H1>
				<H1 className="inline-block max-w-4xl whitespace-pre-line text-4xl font-bold text-secondary-light sm:text-6xl xl:text-7xl">
					and&nbsp;
				</H1>
				<H1 className="inline-block max-w-4xl whitespace-pre-line text-4xl font-bold text-secondary-light sm:text-6xl xl:text-7xl">
					Easy
				</H1>
				<H1 className="bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline max-w-4xl whitespace-pre-line text-4xl font-bold sm:text-7xl xl:text-8xl">
					{`\nCannabis`}
				</H1>
				<H1 className="bg-clip-text text-transparent inline max-w-4xl whitespace-pre-line text-4xl font-bold bg-gradient-to-b from-secondary-light to-primary-light sm:text-7xl xl:text-8xl">
					&nbsp;Delivery
				</H1>
			</div>
			<div className="mx-auto grid max-w-screen-xl p-6 place-self-center text-center sm:gap-y-16 gap-y-16 mt-0 sm:mt-0">
				<p className="leading-9 mx-auto tracking-wider max-w-xl text-2xl lg:text-3xl font-semibold whitespace-pre-line">
					<b className="text-primary">Efficient</b> and{' '}
					<b className="text-primary">compliant</b>{' '}
					<b className="text-primary">delivery service</b> for cannabis retail
					{/* full&#8209;service  */}
				</p>
				<FlexBox className="items-center gap-4 sm:flex-row justify-center lg:gap-8">
					<Link href={'#contact-form'}>
						<Button
							size="lg"
							bg="secondary"
							hover="primary-light"
							className="w-[240px]"
						>
							{TextContent.prompt.CONTACT_US}
						</Button>
					</Link>
					<Link href={'#benefit-one'} scroll={false}>
						<Button
							size="lg"
							bg="secondary-light"
							hover="secondary-light"
							className="w-[240px]"
						>
							{TextContent.info.LEARN_MORE}
						</Button>
					</Link>
				</FlexBox>
			</div>
		</section>
	);
}

export default Hero;
