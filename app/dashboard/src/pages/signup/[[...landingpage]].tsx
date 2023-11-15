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
	Collapse,
	Page,
	Paragraph,
	type LayoutContextProps,
	Video,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Iframe from 'react-iframe';
import heroImg from '../../../public/cannabis-delivered.jpg';
import benefitOneImg from '../../../public/get-order.png';
import benefitTwoImg from '../../../public/pair-of-buds.png';

function LandingPage() {
	return (
		<Page gradient="pink" className="pb-8 flex flex-col gap-8">
			<Hero />
			<Benefits data={benefitOne} />
			<div className="py-12">
				<H3 className="font-normal text-center tracking-wider">
					Works with the leading cannabis software
				</H3>
				<FlexBox className="flex-row items-center justify-center ">
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
			<EmbedVideo />
			<Benefits imgPos="right" data={benefitTwo} />
			<div className="space-y-16 p-12">
				<div>
					<H3 className="text-inverse m-auto drop-shadow-xl mt-3 max-w-2xl text-center text-2xl font-bold leading-snug tracking-wider sm:text-4xl lg:leading-tight">
						Frequently Asked Questions
					</H3>
					<FAQ />
					<div>
						<H3 className="text-center text-xl md:text-2xl m-auto">
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
				<CallToSignup />
			</div>
		</Page>
	);

	function FAQ() {
		const faqdata = [
			{
				q: 'How do I get started with Delivery by Gras?',
				value: `Hit the big button to create your account. 👇 
					Once you signup, you can view your account. Then, simply follow our setup guide to receive delivery orders.`,
			},
			{
				q: 'I signed up. Now what?',
				value: `Sign in and follow our setup guide to receive delivery orders!`,
			},
			{
				q: 'How much will I pay for Delivery by Gras?',
				value: `Gras charges your business a low monthly fee. Its that simple. 
					We keep our fees low to offer you affordable, high quality delivery service.`,
			},
			{
				q: 'Is there a guarantee?',
				value: `Yes! If you're not satisfied with our delivery service for any reason, we'll give you 30 days free. We'll do the best we can to improve our service. 
				Gras does not issue refunds. `,
			},
			{
				q: 'Do you offer technical support? ',
				value: `Yes, we do. Gras support team is available 7 days a week to help you with any issues you may have. 
					You can reach us by email, phone, or text. We're here to help.`,
			},
		];
		return (
			<FlexBox className="mx-auto items-center w-full max-w-2xl rounded-2xl p-8">
				<div>
					{faqdata.map((item, index: number) => (
						<Collapse key={`faq-${index}`} item={item} />
					))}
				</div>
			</FlexBox>
		);
	}
}

export default LandingPage;

LandingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

const Hero = () => {
	return (
		<Card className="m-auto shadow-2xl drop-shadow-xl !pb-16 lg:!px-20 lg:!w-10/12 lg:!rounded-[44px] space-y-8">
			<FlexBox className="container m-auto flex flex-col py-8 space-y-8 xl:space-x-4 xl:flex-row xl:px-0">
				<div className="flex h-full m-auto items-center">
					<H1 className="font-bold text-secondary-light m-auto text-center lg:text-center text-5xl md:text-7xl tracking-wide xl:leading-tight">
						{TextContent.info.FULL_SERVICE_CANNABIS_DELIVERY}
					</H1>
				</div>
				<div className="w-md">
					<Image
						src={heroImg}
						className={
							'rounded-full w-md xl:max-w-sm m-auto self-center'
							// 'rounded-full my-auto hidden object-cover md:mr-auto lg:block'
						}
						alt="Hero Illustration"
						loading="eager"
						placeholder="blur"
					/>
				</div>
			</FlexBox>
			<FlexBox className="flex flex-col items-center justify-center space-y-12 pb-4 md:flex-row md:items-end md:space-x-12 lg:space-x-24">
				<Link href={'#waitlist'} scroll={false}>
					<Button size="lg" bg="secondary-light" hover="primary-light">
						{TextContent.info.LEARN_MORE}
					</Button>
				</Link>
				<div
					id="waitlist"
					className="flex flex-col items-center justify-center space-y-4"
				>
					<Paragraph className="w-[330px]">
						Missed our signup window?{'\n'}
						<b>Join our waitlist.</b> We'll message you when we launch in your
						area.
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
				</div>
			</FlexBox>
		</Card>
	);
};

const EmbedVideo = () => {
	return (
		<FlexBox className="p-8 m-auto flex-col gap-8">
			<div>
				<H3 className="text-inverse drop-shadow-xl mt-3 max-w-2xl text-center text-3xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight">
					Fast, Easy, Secure Delivery Service for your Dispensary
				</H3>
			</div>
			<Video
				Embed={() => (
					<Iframe
						className="m-auto rounded h-full aspect-video max-h-[240px] w-full max-w[620px]"
						src="https://www.youtube.com/embed/jnjA4hPyKoc?si=3C4G8KUgah9EakQ9"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></Iframe>
				)}
			/>
		</FlexBox>
	);
};

const Benefits = (props: any) => {
	const { data } = props;
	return (
		<FlexBox
			id="benefit-one"
			className="flex flex-col flex-wrap items-center justify-center space-y-8 py-24 md:flex-row md:space-x-12 md:space-y-0"
		>
			<div
				className={`space-y-8 md:w-1/2 ${
					data.imgPos === 'right' ? 'lg:justify-end' : ''
				}`}
			>
				<H3 className="text-inverse drop-shadow-xl mt-3 text-center text-4xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight">
					{data.title}
				</H3>
				{data.desc && (
					<Paragraph className="m-auto py-4 text-justify leading-normal lg:text-lg xl:text-lg">
						{data.desc}
					</Paragraph>
				)}
				<div className="space-y-2">
					{data.bullets.map((item: any, index: any) => (
						<Benefit key={index} title={item.title} icon={item.icon}>
							{item.desc}
						</Benefit>
					))}
				</div>
			</div>
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
		</FlexBox>
	);
};

function Benefit(props: any) {
	return (
		<div className="m-auto flex max-w-[440px] items-start space-x-3">
			<div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cream">
				<IconWrapper className="text-inverse" iconSize={32} Icon={props.icon} />
			</div>
			<div>
				<H5 className="text-inverse text-xl font-medium ">{props.title}</H5>
				<Paragraph className="mt-1 text-lg">{props.children}</Paragraph>
			</div>
		</div>
	);
}

const benefitOne = {
	title: 'Delivering Medical and Recreational Cannabis',
	// desc: `We help you process delivery orders.
	// A Gras DeliveryPerson delivers quickly and safely to your customers. `,
	image: benefitOneImg,
	bullets: [
		{
			title: 'Secure Delivery',
			desc: 'Our Delivery team is trained in industry compliance and safety.',
			icon: Icons.UserAdmin,
		},
		{
			title: `So Easy You'll Giggle`,
			desc: `Sign up and receive deliveries the same day.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Same-Day Delivery',
			desc: 'We guarantee delivery within 2 hours in Baltimore, Maryland.',
			icon: Icons.ShoppingBag,
		},
	],
};

const benefitTwo = {
	title: 'Easy, Compliant Delivery That Grows With You',
	// desc: `Gras is investing in the growth of your dispensary. Our goal is for you to have your best years in business yet. `,
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Industry Compliant',
			desc: 'We follow all state compliance guidelines for delivery and sale of cannabis.',
			// and we are fully insured.',
			icon: Icons.TaskComplete,
		},
		{
			title: 'Support When You Need It',
			desc: (
				<>
					Gras support is available by phone, email and chat. We're only a phone
					call or a click away.
					{/* <br />
					<Link
						href={TextContent.href.support}
						className="hover:text-primary inline-block mx-auto text-2xl text-inverse font-semibold underline"
					>
						<H3>Get Support</H3>
					</Link> */}
				</>
			),
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Your Growth Is Our Goal',
			desc: `Gras is committed to long term growth. 
			We believe in building a sustainable cannabis industry.`,
			icon: Icons.IncreaseLevel,
		},
	],
};

const CallToSignup = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get('code') || '';

	return (
		<FlexBox className="m-auto">
			<div className="bg-secondary-light mx-auto flex w-full max-w-4xl flex-col flex-wrap place-content-center content-center items-center space-y-4 rounded-xl p-7 text-white sm:flex-row sm:space-x-8 md:space-y-0 lg:flex-nowrap lg:p-12">
				<div className="text-center lg:text-center">
					<h2 className="text-xl max-w-sm md:text-2xl font-medium lg:text-3xl">
						Make your people happy with Delivery&nbsp;by&nbsp;Gras
					</h2>
				</div>
				<Link href={`/signup/create-dispensary-account?code=${code}`}>
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
