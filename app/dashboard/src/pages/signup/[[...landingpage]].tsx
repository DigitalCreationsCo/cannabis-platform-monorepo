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
	H4,
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
import benefitOneImg from '../../../public/benefit-one.png';
import benefitTwoImg from '../../../public/benefit-two.png';
import heroImg from '../../../public/hero.png';

function LandingPage() {
	return (
		<Page gradient="pink" className="pb-0">
			<Hero />
			<Benefits data={benefitOne} />
			<Benefits imgPos="right" data={benefitTwo} />
			<div className="space-y-16 -mx-16 pb-24">
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
		<Card className="m-auto shadow-2xl drop-shadow-xl !pb-16 lg:!px-32 lg:!w-10/12 lg:!rounded-[44px]">
			<FlexBox className="container m-auto flex flex-col flex-wrap p-12 md:flex-row xl:px-0">
				<div className="flex w-full h-full items-center lg:w-1/2">
					<div className="m-auto max-w-2xl">
						<H1 className="text-secondary-light m-auto text-center font-bold leading-snug tracking-tight lg:text-center lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
							{TextContent.info.FULL_SERVICE_CANNABIS_DELIVERY}
						</H1>
					</div>
				</div>
				<div className="m-auto w-1/3  md:my-auto md:ml-0 md:mr-auto lg:m-auto">
					<Image
						src={heroImg}
						className={'my-auto hidden object-cover md:mr-auto lg:block'}
						alt="Hero Illustration"
						loading="eager"
						placeholder="blur"
					/>
				</div>
			</FlexBox>
			<FlexBox className="flex flex-col items-center justify-center space-y-4 pb-4 md:flex-row md:items-end md:space-x-12 lg:space-x-24">
				<Link href={'#cannabis-heals'} scroll={false}>
					<Button size="lg" bg="secondary-light" hover="primary-light">
						{TextContent.info.LEARN_MORE}
					</Button>
				</Link>
				<div className="flex flex-col items-center justify-center pb-2">
					<Paragraph className="w-[330px]">
						Missed our signup window?{'\n'}
						<b>Get on our waitlist.</b> We'll keep you posted when we launch in
						your area.
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
		<FlexBox className="mt-12 flex flex-col flex-wrap items-center justify-center space-y-8 p-8 md:flex-row md:space-x-12 md:space-y-0">
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
				className={`flex max-w-[340px] items-center justify-center sm:w-1/3 ${
					props.imgPos === 'right' ? 'lg:order-1' : ''
				}`}
			>
				<Image
					src={data.image}
					alt="Benefits"
					className={'object-cover'}
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
			<div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-lime-200">
				<IconWrapper className="text-dark" Icon={props.icon} iconSize={25} />
			</div>
			<div>
				<H5 className="text-xl font-medium ">{props.title}</H5>
				<Paragraph className="mt-1">{props.children}</Paragraph>
			</div>
		</div>
	);
}

const Faq = () => {
	return (
		<FlexBox className="mx-auto w-full max-w-2xl rounded-2xl p-8">
			<div className="m-auto">
				<H3 className="text-inverse drop-shadow-xl mt-3 max-w-2xl text-center text-2xl font-bold leading-snug tracking-tight sm:text-4xl lg:leading-tight">
					Frequently Asked Questions
				</H3>
				<H4 className="text-center">Here are some questions we hear often.</H4>
			</div>

			{faqdata.map((item, index: number) => (
				<Collapse key={`faq-${index}`} item={item} />
			))}
			<H4 className="text-center m-auto">Have more questions?</H4>
			<Link
				href={TextContent.href.support}
				className="mx-auto text-xl text-inverse font-semibold underline"
			>
				Get Support
			</Link>
		</FlexBox>
	);
};

const faqdata = [
	{
		q: 'How do I get started with Delivery by Gras?',
		value:
			'Sign Up Below to create your account today. Once you signup, you can view your account, and install our software tool to start receiving delivery orders.',
	},
	{
		q: 'How much does it cost?',
		value:
			'Gras charges a delivery fee on a per order basis. Its that simple. We keep our fees low to offer an affordable delivery service for your business and your customers.',
	},
	{
		q: 'What is your refund policy?',
		value:
			"During this Early Access Program, if you're not satisfied with our service, you can opt out after 30days. Gras does not issue any refund, but you are free to cancel your account anytime.",
	},
	{
		q: 'Do you offer technical support? ',
		value:
			"Yes, we do. Gras support team is available 7 days a week to help you with any questions you may have. You can reach us by email, phone, or text. We're here to help.",
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

const benefitOne = {
	title: 'Delivering Cannabis In Baltimore, Maryland',
	desc: 'We help our Dispensary partners get delivery orders, and a trained Gras Deliveryperson delivers quickly and safely to the customer. ',
	image: benefitOneImg,
	bullets: [
		{
			title: 'Safe And Secure',
			desc: 'Our Deliverypersons are trained in high quality customer service, and safety.',
			icon: Icons.UserData,
		},
		{
			title: 'Industry Compliant Platform',
			desc: 'We follow strict industry guidelines for handling and delivery cannabis products. Our system is built to ensure compliance and record keeping with all state and federal laws.',
			icon: Icons.Shield,
		},
		{
			title: 'Easy to Order',
			desc: 'Order by phone. We guarantee delivery within 2 hours in Baltimore, Maryland.',
			icon: Icons.Shield,
		},
	],
};

const benefitTwo = {
	title: 'A Platform Built For The Future Of Your Dispensary',
	desc: 'Gras is a platform built for the future of your dispensary. We are constantly adding new features and functionality to help you grow your business. ',
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Easy to Get Started',
			desc: 'Start using Delivery by Gras today by installing our software tool. It is easy to install and use. We have documentation and live support available.',
			icon: Icons.CheckmarkOutline,
		},
		{
			title: 'Top Notch User Support',
			desc: (
				<>
					<>
						Gras support team is available during peak hours and off hours. We
						are available by phone, email, and chat.
					</>
					<br />
					<Link
						href={TextContent.href.support}
						className="mx-auto text-xl text-inverse font-semibold underline"
					>
						Get Support
					</Link>
				</>
			),
			icon: Icons.ServiceDesk,
		},
		{
			title: 'Your Success Is Our Goal',
			desc: 'Gras is committed to helping you drive growth in your business for the long term future. We believe in the people and businesses we work with, and we are here to help you succeed.',
			icon: Icons.IncreaseLevel,
		},
	],
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
