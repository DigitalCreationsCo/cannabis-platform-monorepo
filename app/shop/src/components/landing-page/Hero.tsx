import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, H1 } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

function Hero() {
	return (
		<section className={twMerge('bg-inverse', 'pt-20 lg:mt-0')}>
			<div className="mx-auto grid max-w-screen-xl p-6 text-center sm:pt-16">
				<div className="mx-auto place-self-center">
					<div className="my-8 lg:mt-0">
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
					<p className=" leading-9 mx-auto tracking-wider mb-6 max-w-xl text-2xl md:my-10 lg:mt-20 lg:text-3xl font-semibold whitespace-pre-line">
						<b>Efficient</b> and <b>Compliant</b> full&#8209;service delivery
						for cannabis retailers
					</p>
					<FlexBox className="items-center my-12 gap-4 lg:flex-row justify-center lg:gap-8 lg:mb-24">
						<Link href={'#contact-form'}>
							<Button
								size="lg"
								bg="secondary"
								hover="primary-light"
								className="w-[240px]"
							>
								{TextContent.info.CONTACT_US}
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
			</div>
		</section>
	);
}

export default Hero;
