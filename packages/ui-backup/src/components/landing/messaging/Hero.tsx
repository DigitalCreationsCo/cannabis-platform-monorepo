/* eslint-disable i18next/no-literal-string */
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import messageImg from '../../../../public/message-1.png';
import { styles } from '../../../styleClassNames';
import { CTA } from '../../button';
import FlexBox from '../../FlexBox';
import { H1, Paragraph } from '../../Typography';

function Hero({ href = '#get-started' }: { href?: string }) {
	return (
		<section
			id="messaging"
			className={twMerge(
				'bg-gradient-to-b',
				'from-secondary',
				'to-primary',
				'py-8 pb-16 md:pt-16'
			)}
		>
			<FlexBox className="flex-col md:flex-row justify-center items-center md:items-start gap-x-8 mx-auto px-16 py-4">
				<FlexBox className="flex-1 justify-center items-center max-w-2xl">
					<div
						className={twMerge(
							'sm:' + styles.shadow.textShadow,
							'space-y-4 mx-auto'
						)}
					>
						<H1
							className={twMerge(
								styles.HERO.heading,
								styles.shadow.textShadow,
								'!leading-tight',
								'text-inverse',
								'text-left max-w-fit mx-auto'
							)}
						>{`Personalized Text Messaging Service For Cannabis Businesses`}</H1>
					</div>
					<div className="sm:my-0 mx-auto grid py-6 place-self-center text-left gap-y-8 mt-0">
						<Paragraph className="text-light mx-auto text-xl lg:text-2xl">
							{`Build deeper customer relationships with a messaging service based on choice, quality and trust.`}
						</Paragraph>
						<FlexBox className="w-full py-8 flex-col-reverse sm:flex-row gap-8 items-center">
							<Link
								className="w-[240px px-8 underline text-light pb-2 uppercase hover:text-dark transition"
								href={'#info'}
								scroll={false}
							>
								<Paragraph className="text-lg font-medium">
									{`Learn More`}
								</Paragraph>
							</Link>
							<CTA cta={'Get Started'} href={href} />
						</FlexBox>
					</div>
				</FlexBox>
				<Image
					src={messageImg}
					alt={`consumer-messaging`}
					className="rounded bg-inverse shadow-lg object-contain max-w-sm lg:max-w-md flex-1 md:mt-8"
					priority
				/>
			</FlexBox>
		</section>
	);
}

export default Hero;
