import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, H1, styles } from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import heroImg from '../../../public/cannabis-delivered.jpg';

function Hero() {
	const [heading, largeHeading] = [
		'tracking-wider inline-block max-w-4xl whitespace-pre-line text-5xl font-bold text-secondary-light sm:text-5xl xl:text-6xl',
		'tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline max-w-4xl whitespace-pre-line text-5xl font-bold sm:text-6xl xl:text-7xl',
	];
	return (
		<section className={twMerge('bg-inverse', 'pt-16')}>
			<div className={twMerge('sm:' + styles.textShadow, 'text-center mt-0')}>
				<H1 className={twMerge('pb-2', heading)}>Fast&nbsp;</H1>
				<H1 className={heading}>and&nbsp;</H1>
				<H1 className={heading}>Easy</H1>
				<H1 className={largeHeading}>{`\nCannabis`}</H1>
				<H1 className={largeHeading}>&nbsp;Delivery</H1>
			</div>
			<div className="sm:my-0 mx-auto grid max-w-screen-xl p-6 place-self-center text-center gap-y-16 mt-0">
				<p className="font-encode mx-auto tracking-wider max-w-lg xl:max-w-xl text-2xl xl:text-3xl whitespace-pre-line">
					Driving Your Success with Essential{' '}
					<b className="text-primary">Delivery</b> and{' '}
					<b className="text-primary">Retail Services</b>
					{/* <b className="text-primary">Business Development</b> */}
				</p>
				<FlexBox className="items-center gap-4 sm:flex-row justify-center lg:gap-8">
					<Link href={'#contact-us-header'} scroll={false}>
						<Button
							size="lg"
							bg="secondary"
							hover="primary-light"
							className="w-[240px]"
						>
							{TextContent.prompt.CONTACT_US}
						</Button>
					</Link>
					<Link href={'#benefit-1'} scroll={false}>
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
