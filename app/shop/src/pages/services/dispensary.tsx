// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { TextContent } from '@cd/core-lib';
import {
	Button,
	Card,
	FlexBox,
	H1,
	H3,
	H5,
	Icons,
	IconWrapper,
	FAQ,
	Page,
	Paragraph,
	type LayoutContextProps,
	EmbedVideo,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import heroImg from '../../../public/cannabis-delivered.jpg';
import { benefitOne, benefitTwo } from '../../data/landingPageData';

const Hero = () => {
	return (
		<Card className="m-auto shadow-2xl drop-shadow-xl !py-8 sm:!py-16 lg:!px-20 lg:!w-10/12 md:!rounded-[44px] space-y-8">
			<FlexBox className="container m-auto flex flex-col gap-8 xl:gap-4 xl:px-0 items-center lg:flex-row">
				<div className="max-w-xs lg:max-w-sm float-right hidden sm:block">
					<Image
						src={heroImg}
						className={
							'rounded-full m-auto self-center'
							// 'rounded-full my-auto hidden object-cover md:mr-auto lg:block'
						}
						alt="Hero Illustration"
						loading="eager"
						placeholder="blur"
					/>
				</div>
				<div className="max-w-2xl flex h-full m-auto items-center">
					<H1 className="font-bold whitespace-pre-line text-secondary-light m-auto text-center lg:text-center text-5xl lg:text-7xl tracking-wide">
						{TextContent.info.FULL_SERVICE_CANNABIS_DELIVERY}
					</H1>
				</div>
			</FlexBox>
			<FlexBox className="flex flex-col items-center justify-center gap-12 pb-4 md:flex-row md:items-center lg:gap-24">
				<Benefits
					data={{
						bullets: [
							{ icon: Icons.DeliveryTruck, title: 'Same-Day Delivery' },
							{
								icon: Icons.TaskComplete,
								title: 'Cannabis Industry Compliant',
							},
							{
								icon: Icons.Shield,
								title: 'Live Technical Support',
							},
						],
					}}
				/>

				<Link href={'#benefit-one'} scroll={false}>
					<Button size="lg" bg="secondary-light" hover="primary-light">
						{TextContent.info.LEARN_MORE}
					</Button>
				</Link>

				{/* THIS SUBSCRIBE CTA IS FOR CONSUMERS. WE ALREADY HAVE DISPENSARY INFO. */}
				{/* <div
					id="waitlist"
					className="flex flex-col items-center justify-center space-y-4"
				>
					<Paragraph className="text-xl text-center">
						Gras is bringing delivery to your area.{'\n'}Join our waitlist.
					</Paragraph>
					<Iframe
						className="m-auto text-xl"
						src="https://embeds.beehiiv.com/2bc9d84b-e4a8-4cdd-a9ad-f75003eec7a0?slim=true"
						data-test-id="beehiiv-embed"
						width="330"
						height="52"
						frame="0"
						scrolling="no"
						style="margin: 0; -radius: 0px !important; background-color: transparent;"
					/>
				</div> */}
			</FlexBox>
		</Card>
	);
};

type Benefits = {
	title?: string;
	desc?: string;
	image?: StaticImageData | string;
	bullets: {
		title: string;
		desc?: string;
		icon: any;
	}[];
};
const Benefits = (
	props: {
		data: Benefits;
		orientation: 'row' | 'col';
		className: string | string[];
	} & HTMLDivElement,
) => {
	const { data } = props;
	const benefitsOrientation =
		props.orientation === 'row' ? 'flex-row' : 'flex-col';
	return (
		<div
			id={props.id}
			className={twMerge(
				'gap-8',
				'py-12',
				`${data.image && data.imgPos === 'right' ? 'lg:justify-end' : ''}`,
				props.className,
			)}
		>
			<FlexBox
				className={twMerge(
					'flex flex-col flex-wrap items-center justify-center gap-8 md:space-x-12 md:space-y-0',
				)}
			>
				{data.title && (
					<H3 className="px-4 drop-shadow-xl mt-3 text-center text-4xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight">
						{data.title}
					</H3>
				)}
				{data.desc && (
					<Paragraph className="m-auto py-4 text-justify leading-normal lg:text-lg xl:text-lg">
						{data.desc}
					</Paragraph>
				)}
				<FlexBox
					className={twMerge(
						'flex flex-col md:flex-row flex-wrap items-center justify-center gap-8',
					)}
				>
					<FlexBox
						className={twMerge(
							'max-w-md',
							'gap-2 justify-around',
							'xl:' + benefitsOrientation,
						)}
					>
						{data.bullets.map((item: any, index: any) => (
							<Benefit
								key={index}
								title={item.title}
								icon={item.icon}
								desc={item.desc}
							/>
						))}
					</FlexBox>

					{data.image && (
						<div
							className={`flex items-center justify-center ${
								props.imgPos === 'right' ? 'lg:order-1' : ''
							}`}
						>
							<Image
								className="bg-inverse border-2 rounded-full"
								height={300}
								width={300}
								src={data.image}
								alt="Benefits"
								placeholder="blur"
								blurDataURL={data.image.src}
							/>
						</div>
					)}
				</FlexBox>
			</FlexBox>
		</div>
	);
};

function Benefit(props: Benefits['bullets'][number]) {
	return (
		<div className="m-auto w-full flex max-w-[440px] px-2 items-center space-x-3">
			<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-orange-300">
				<IconWrapper iconSize={32} Icon={props.icon} />
			</div>
			<div className="w-full">
				<H5 className="text-xl whitespace-nowrap font-medium ">
					{props.title}
				</H5>
				{props.desc && (
					<Paragraph className="text-dark mt-1 text-lg">{props.desc}</Paragraph>
				)}
			</div>
		</div>
	);
}

const CTASignup = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get('code') || '';

	return (
		<FlexBox className="m-auto">
			<div className="bg-secondary-light mx-auto flex w-full max-w-4xl flex-col flex-wrap place-content-center content-center items-center space-y-4 md:rounded-xl p-7 text-white sm:flex-row sm:space-x-8 md:space-y-0 lg:flex-nowrap lg:p-12">
				<div className="text-center lg:text-center">
					<h2 className="text-xl max-w-sm md:text-2xl font-medium lg:text-3xl">
						{/* Make your people happy with Delivery&nbsp;by&nbsp;Gras */}
						Make your people happy
					</h2>
				</div>
				<Link
					href={getDashboardSite(
						`/signup/create-dispensary-account?code=${code}`,
					)}
				>
					<Button
						size="lg"
						bg="primary"
						hover="primary-light"
						className="duration-5 lg:p-12 text-2xl"
					>
						{TextContent.account.CTA}
					</Button>
				</Link>
			</div>
		</FlexBox>
	);
};

function LandingPage() {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);

	return (
		<Page gradient="pink" className="pb-8 flex flex-col gap-8">
			<Hero />
			<Benefits id={'benefit-one'} data={benefitOne} className="text-inverse" />
			<div className="py-12">
				<H3 className="font-normal text-center tracking-wider">
					Works with the leading cannabis software
				</H3>
				<FlexBox className="sm:flex-row items-center justify-center ">
					<Image
						src={
							'https://storage.googleapis.com/e4f53ea0212ea91d-image-dispensary/metrc.png'
						}
						alt={'metrc'}
						loader={({ src }) => src}
						width={200}
						height={150}
					/>
					<Image
						src={
							'https://storage.googleapis.com/e4f53ea0212ea91d-image-dispensary/dutchie.png'
						}
						alt={'dutchie'}
						loader={({ src }) => src}
						width={220}
						height={150}
					/>
				</FlexBox>
			</div>
			<EmbedVideo
				url={'https://www.youtube.com/embed/jnjA4hPyKoc?si=3C4G8KUgah9EakQ9'}
			/>
			<Benefits className="text-inverse" imgPos="right" data={benefitTwo} />
			<div className="space-y-16 md:py-12">
				<div className="mx-auto">
					<H3 className="max-w-2xl text-inverse px-2 drop-shadow-xl mt-3 text-3xl font-bold leading-snug tracking-wider sm:text-4xl lg:leading-tight mx-auto">
						Questions?
					</H3>
					<FAQ />
					<div>
						<H3 className="text-center text-xl font-semibold md:text-2xl m-auto">
							Have more questions?
						</H3>
						<Button
							bg="transparent"
							hover="transparent"
							onClick={() => {
								window?.BrevoConversations &&
									window?.BrevoConversations?.openChat();
							}}
							className="hover:text-primary duration-0 mx-auto text-xl text-inverse font-semibold underline"
						>
							<H3 className="text-center m-auto tracking-wider">
								We're available.
							</H3>
						</Button>
					</div>
				</div>
				<CTASignup />
			</div>
		</Page>
	);
}

export default LandingPage;

LandingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

// // MORE SECTIONS
// {
// 	/* ADD A VIDEO SECTION INSIDE THE DISPENSARY PORTAL, FOR SUCCESS LEARNING, AND CHECKOUT WIDGET INSTALL */
// }
// {
// 	/* <SectionTitle
// 				pretitle="Watch a video"
// 				title="Learn how to fullfil your needs"
// 			>
// 				This section is to highlight a promo or demo video of your product.
// 				Analysts says a landing page with video has 3% more conversion rate. So,
// 				don&apos;t forget to add one. Just like this.
// 			</SectionTitle> */
// }
// {
// 	/* <Video /> */
// }
// {
// 	/* We don't have testimonials yet, we will */
// }
// {
// 	/* <SectionTitle
// 				pretitle="Testimonials"
// 				title="Here's what our customers said"
// 			>
// 				Testimonails is a great way to increase the brand trust and awareness.
// 				Use this section to highlight your popular customers.
// 			</SectionTitle> */
// }
// {
// 	/* <Testimonials /> */
// }
