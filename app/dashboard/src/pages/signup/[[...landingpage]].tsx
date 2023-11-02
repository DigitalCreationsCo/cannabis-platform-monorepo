// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { TextContent } from '@cd/core-lib';
import {
	Button,
	Card,
	Collapse,
	FlexBox,
	H1,
	H3,
	H5,
	Icons,
	IconWrapper,
	Page,
	Paragraph,
	type LayoutContextProps,
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
		<Page gradient="pink" className="pb-0">
			<Hero />
			<Benefits data={benefitOne} />
			<Benefits imgPos="right" data={benefitTwo} />
			<div className="space-y-16 px-12 pb-24">
				<Faq />
				<CallToSignup />
			</div>
		</Page>
	);
}

export default LandingPage;

LandingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

const Hero = () => {
	return (
		<Card className="m-auto shadow-2xl drop-shadow-xl !pb-16 lg:!px-20 lg:!w-10/12 lg:!rounded-[44px]">
			<FlexBox className="container m-auto flex flex-col p-8 space-y-4 xl:space-y-0 xl:space-x-4 xl:flex-row xl:px-0">
				<div className="flex w-full h-full m-auto max-w-2xl items-center">
					<H1 className="text-secondary-light m-auto text-center font-bold lg:text-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl xl:leading-tight">
						{TextContent.info.FULL_SERVICE_CANNABIS_DELIVERY}
					</H1>
				</div>
				<Image
					src={heroImg}
					className={
						'rounded-full w-1/2 xl:w-1/3 m-auto self-center'
						// 'rounded-full my-auto hidden object-cover md:mr-auto lg:block'
					}
					alt="Hero Illustration"
					loading="eager"
					placeholder="blur"
				/>
			</FlexBox>
			<FlexBox className="flex flex-col items-center justify-center space-y-4 pb-4 md:flex-row md:items-end md:space-x-12 lg:space-x-24">
				<Link href={'#benefit-one'} scroll={false}>
					<Button size="lg" bg="secondary-light" hover="primary-light">
						{TextContent.info.LEARN_MORE}
					</Button>
				</Link>
				<div className="flex flex-col items-center justify-center space-y-4">
					<Paragraph className="w-[330px]">
						Missed our signup window?{'\n'}
						<b>Join our waitlist.</b> We'll message you when we launch in your
						area.
					</Paragraph>
					<Iframe
						className="m-auto"
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

const Benefits = (props: any) => {
	const { data } = props;
	return (
		<FlexBox
			id="benefit-one"
			className="md:mt-12 flex flex-col flex-wrap items-center justify-center space-y-8 p-8 md:flex-row md:space-x-12 md:space-y-0"
		>
			<div
				className={`max-w-[580px] space-y-2 md:w-1/2 ${
					data.imgPos === 'right' ? 'lg:justify-end' : ''
				}`}
			>
				<H3 className="text-inverse drop-shadow-xl mt-3 max-w-2xl text-center text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight">
					{data.title}
				</H3>
				<Paragraph className="m-auto max-w-[440px] py-4 text-justify leading-normal lg:text-lg xl:text-lg">
					{data.desc}
				</Paragraph>
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
					height={400}
					width={400}
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
				<IconWrapper className="text-dark" Icon={props.icon} iconSize={25} />
			</div>
			<div>
				<H5 className="text-inverse text-xl font-medium ">{props.title}</H5>
				<Paragraph className="mt-1">{props.children}</Paragraph>
			</div>
		</div>
	);
}

const benefitOne = {
	title: 'We Deliver Medical and Recreational Cannabis',
	desc: `We help you process delivery orders. 
	A Gras DeliveryPerson delivers quickly and safely to your customers. `,
	image: benefitOneImg,
	bullets: [
		{
			title: 'Safe And Secure',
			desc: 'Our DeliveryPersons are trained in customer service, compliance and safety.',
			icon: Icons.UserAdmin,
		},
		{
			title: 'Industry Compliant Platform',
			desc: 'We follow the state compliance guidelines for transporting and delivering cannabis, and we are fully insured.',
			icon: Icons.TaskComplete,
		},
		{
			title: 'Easy to Order',
			desc: 'Orders are placed online. We guarantee delivery within 2 hours in Baltimore, Maryland.',
			icon: Icons.ShoppingBag,
		},
	],
};

const benefitTwo = {
	title: 'A Platform That Grows With You',
	desc: `Gras is investing in the growth of your dispensary. Our goal is for you to have your best years in business yet. `,
	image: benefitTwoImg,
	bullets: [
		{
			title: `So Easy You'll Giggle`,
			desc: `Sign up and setup in 10 minutes, easy.`,
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'World Class Support',
			desc: (
				<>
					Gras support team is available during peak hours and off hours. We are
					available by phone, email, and chat.
					<br />
					<Link
						href={TextContent.href.support}
						className="hover:text-primary inline-block mx-auto text-2xl text-inverse font-semibold underline"
					>
						<H3>Get Support</H3>
					</Link>
				</>
			),
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Our Goal Is Your Growth',
			desc: 'Gras is committed to long term service for your business. We believe in building a sustainable cannabis industry.',
			icon: Icons.IncreaseLevel,
		},
	],
};

const Faq = () => {
	return (
		<FlexBox className="mx-auto items-center space-y-4 w-full max-w-2xl rounded-2xl p-8">
			<H3 className="text-inverse drop-shadow-xl mt-3 max-w-2xl text-center text-2xl font-bold leading-snug tracking-tight sm:text-4xl lg:leading-tight">
				Frequently Asked Questions
			</H3>

			{faqdata.map((item, index: number) => (
				<Collapse key={`faq-${index}`} item={item} />
			))}
			<div>
				<H3 className="text-center m-auto">Have more questions?</H3>
				<Button
					bg="transparent"
					hover="transparent"
					onClick={() => {
						window?.BrevoConversations &&
							window?.BrevoConversations?.openChat();
					}}
					className="hover:text-primary duration-0 mx-auto text-xl text-inverse font-semibold underline"
				>
					<H3 className="text-center m-auto">We're available.</H3>
				</Button>
			</div>
		</FlexBox>
	);
};

const faqdata = [
	{
		q: 'How do I get started with Delivery by Gras?',
		value: `Hit the big button to create your account. 👇 
			Once you signup, you can view your account. Then, simply follow our setup guide to receive delivery orders.`,
	},
	{
		q: 'I signed up. Now what?',
		value: `Follow our setup guide to receive delivery orders!`,
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

const CallToSignup = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get('code') || '';

	return (
		<FlexBox className="px-8">
			<div className="bg-secondary-light mx-auto flex w-full max-w-4xl flex-col flex-wrap place-content-center content-center items-center space-y-4 rounded-xl p-7 text-white sm:flex-row sm:space-x-8 md:space-y-0 lg:flex-nowrap lg:p-12">
				<div className="text-center lg:text-center">
					<h2 className="text-2xl font-medium lg:text-3xl">
						Make your people happy.
					</h2>
					<p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
						Start Delivery by Gras today.
					</p>
				</div>
				<Link href={`/signup/create-dispensary-account?code=${code}`}>
					<Button
						size="lg"
						bg="primary"
						hover="primary-light"
						className="duration-5 lg:p-12"
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
