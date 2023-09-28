// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { TextContent } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	H1,
	H2,
	H3,
	H5,
	Icons,
	IconWrapper,
	Page,
	Paragraph,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import benefitOneImg from '../../../public/benefit-one.png';
import benefitTwoImg from '../../../public/benefit-two.png';
import heroImg from '../../../public/hero.png';

const SignUpLandingPage = () => {
	return (
		<Page className={'bg-inverse'}>
			<Hero />
			<SectionTitle
				pretitle="We are changing the way cannabis is enjoyed"
				title="Cannabis Heals"
			>
				For Gras, cannabis is medicine. It's a powerful healing plant that heals
				people and communities. We are committed to enriching the lives in our
				community through public service.
			</SectionTitle>
			<Benefits data={benefitOne} />
			<Benefits imgPos="right" data={benefitTwo} />
			{/* ADD A VIDEO SECTION INSIDE THE DISPENSARY PORTAL, FOR SUCCESS LEARNING, AND CHECKOUT WIDGET INSTALL */}
			{/* <SectionTitle
				pretitle="Watch a video"
				title="Learn how to fullfil your needs"
			>
				This section is to highlight a promo or demo video of your product.
				Analysts says a landing page with video has 3% more conversion rate. So,
				don&apos;t forget to add one. Just like this.
			</SectionTitle> */}
			{/* <Video /> */}

			{/* We don't have testimonials yet, we will */}
			{/* <SectionTitle
				pretitle="Testimonials"
				title="Here's what our customers said"
			>
				Testimonails is a great way to increase the brand trust and awareness.
				Use this section to highlight your popular customers.
			</SectionTitle> */}
			{/* <Testimonials /> */}

			<SectionTitle title="Frequently Asked Questions">
				Here are some of the frequently asked questions. If you have any other
				questions, get in touch with us by email.
			</SectionTitle>
			<Faq />
			<Cta />
		</Page>
	);
};

export default SignUpLandingPage;

SignUpLandingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

const Hero = () => {
	return (
		<>
			<FlexBox className="container mx-auto flex flex-col flex-wrap p-8 md:flex-row xl:px-0">
				<div className="flex w-full items-center lg:w-1/2">
					<div className="m-auto mb-8 max-w-2xl">
						<H3 className="text-primary">
							{TextContent.info.YOUR_CUSTOMERS_ARE_OUR_CUSTOMERS}
						</H3>
						<H1 className="text-secondary-light text-4xl font-bold leading-snug tracking-tight  lg:text-4xl lg:leading-tight xl:text-[61px] xl:leading-tight">
							{TextContent.info.GRAS_DELIVERS_FOR_DISPENSARIES}
						</H1>
						<FlexBox className="p-4">
							<Link href={'#cannabis-heals'} scroll={false}>
								<Button size="lg" bg="secondary-light" hover="primary-light">
									{TextContent.info.LEARN_MORE}
								</Button>
							</Link>
						</FlexBox>
					</div>
				</div>
				<div className="flex w-full items-center justify-center lg:w-1/2">
					<Image
						src={heroImg}
						width="550"
						height="560"
						className={'object-cover'}
						alt="Hero Illustration"
						loading="eager"
						placeholder="blur"
					/>
				</div>
			</FlexBox>
			<FlexBox className="m-auto py-16">
				<H2>{TextContent.info.BUILDING_TRUST_WITH_OUR_PARTNERS}</H2>
			</FlexBox>
		</>
	);
};

const SectionTitle = (props: any) => {
	return (
		<FlexBox
			id="cannabis-heals"
			className={`flex w-full flex-col pt-12 ${
				props.align === 'left' ? '' : 'items-center justify-center text-center'
			}`}
		>
			{props.pretitle && (
				<Small className="text-primary text-sm font-bold uppercase tracking-wider">
					{props.pretitle}
				</Small>
			)}

			{props.title && (
				<H2 className="text-secondary-light mt-3 max-w-2xl text-4xl font-bold leading-snug tracking-tight lg:leading-tight">
					{props.title}
				</H2>
			)}

			{props.children && (
				<H5 className="max-w-2xl py-4 text-lg leading-normal lg:text-xl xl:text-xl">
					{props.children}
				</H5>
			)}
		</FlexBox>
	);
};

const Benefits = (props: any) => {
	const { data } = props;
	return (
		<>
			<FlexBox className="mb-20 flex flex-row flex-wrap lg:flex-nowrap lg:gap-10">
				<div
					className={`flex w-full items-center justify-center lg:w-1/2 ${
						props.imgPos === 'right' ? 'lg:order-1' : ''
					}`}
				>
					<div>
						<Image
							src={data.image}
							width="521"
							height="500"
							alt="Benefits"
							className={'object-cover'}
							placeholder="blur"
							blurDataURL={data.image.src}
						/>
					</div>
				</div>

				<div
					className={`flex w-full flex-wrap items-center lg:w-1/2 ${
						data.imgPos === 'right' ? 'lg:justify-end' : ''
					}`}
				>
					<div>
						<div className="mt-4 flex w-full flex-col">
							<H3 className="text-secondary-light mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight lg:text-4xl lg:leading-tight">
								{data.title}
							</H3>

							<H5 className="max-w-2xl py-4 leading-normal lg:text-xl xl:text-xl">
								{data.desc}
							</H5>
						</div>

						<div className="mt-5 w-full">
							{data.bullets.map((item: any, index: any) => (
								<Benefit key={index} title={item.title} icon={item.icon}>
									{item.desc}
								</Benefit>
							))}
						</div>
					</div>
				</div>
			</FlexBox>
		</>
	);
};

function Benefit(props: any) {
	return (
		<>
			<div className="mt-8 flex items-start space-x-3">
				<div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-lime-400">
					<IconWrapper className="text-dark" Icon={props.icon} iconSize={25} />
				</div>
				<div>
					<H5 className="text-xl font-medium ">{props.title}</H5>
					<Paragraph className="mt-1">{props.children}</Paragraph>
				</div>
			</div>
		</>
	);
}

const Faq = () => {
	return (
		<FlexBox className="!p-0">
			<div className="mx-auto w-full max-w-2xl rounded-2xl p-2">
				{faqdata.map((item, index: number) => (
					<div
						key={`faq-${index}`}
						className="bg-inverse collapse mb-5 rounded shadow"
					>
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium">
							<Paragraph className="text-primary">{item.question}</Paragraph>
						</div>
						<div className="collapse-content">
							<Paragraph className="font-semibold">{item.answer}</Paragraph>
						</div>
					</div>
				))}
			</div>
		</FlexBox>
	);
};

const faqdata = [
	{
		question: 'How do I get started with Delivery by Gras?',
		answer:
			'Sign Up Below to create your account today. Once you signup, you can view your account, and install our software tool to start receiving delivery orders.',
	},
	{
		question: 'How much does it cost?',
		answer:
			'Gras charges a delivery fee on a per order basis. Its that simple. We keep our fees low to offer an affordable delivery service for your business and your customers.',
	},
	{
		question: 'What is your refund policy?',
		answer:
			"During this Early Access Program, if you're not satisfied with our service, you can opt out after 30days. Gras does not issue any refund, but you are free to cancel your account anytime.",
	},
	{
		question: 'Do you offer technical support? ',
		answer:
			"Yes, we do. Gras support team is available 7 days a week to help you with any questions you may have. You can reach us by email, phone, or text. We're here to help.",
	},
];

const Cta = () => {
	return (
		<FlexBox>
			<div className="bg-secondary-light mx-auto flex w-full max-w-4xl flex-wrap items-center justify-around gap-5 rounded-xl p-7 text-white lg:flex-nowrap lg:p-12">
				<div className="text-center lg:text-left">
					<h2 className="text-2xl font-medium lg:text-3xl">
						Make your customers happy.
					</h2>
					<p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
						Start delivering with Gras today.
					</p>
				</div>
				<Link href="/signup/create-dispensary-account">
					<Button
						size="lg"
						bg="primary"
						hover="primary-light"
						className="duration-5 p-12"
					>
						{TextContent.account.CTA}
					</Button>
				</Link>
			</div>
		</FlexBox>
	);
};

const benefitOne = {
	title: 'Delivering In Baltimore, Maryland',
	desc: 'Orders placed with our trusted Dispensary partners, will be delivered by a Gras Deliveryperson, safely and quickly to the customer. ',
	image: benefitOneImg,
	bullets: [
		{
			title: 'Fast Delivery',
			desc: 'Same day delivery within 2 hours, in Baltimore, Maryland.',
			icon: Icons.Delivery,
		},
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
					<Link href="/support" className="font-semibold underline">
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
