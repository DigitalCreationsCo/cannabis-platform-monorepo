import { ServicesTopBar } from '@/components/layouts';
import seoConfig from '@/lib/seo.config';
import keywords from '@gras/core/seo';
import { getDashboardSite } from '@gras/core/utils';
import {
	Page,
	Footer,
	Benefits,
	ContactUs,
	Letter,
	MessagingHero,
} from '@gras/ui';
import {
	consumerTextMessaging,
	messageSupport,
} from '@gras/ui/src/components/landing/benefits/benefit-data';
import { letters } from '@gras/ui/src/components/landing/letter/letter-data';
import messagingPrices from '@gras/ui/src/components/landing/Pricing/messagingPrices';
import PricingCard from '@gras/ui/src/components/landing/Pricing/Pricing';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export default function MessagingLandingPage() {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	return (
		<>
			<NextSeo
				{...seoConfig}
				additionalMetaTags={[
					...seoConfig.additionalMetaTags,
					{
						name: 'keywords',
						content: [
							...keywords['business'],
							...keywords['messaging'],
							...keywords['events'],
						].join(', '),
					},
				]}
			/>
			<Page
				className={twMerge(
					'lg:min-h-[710px]',
					'flex flex-col',
					'p-0 m-0 md:p-0 lg:p-0'
				)}
			>
				<MessagingHero href={getDashboardSite('/')} />

				<Benefits
					id="info"
					className="bg-inverse"
					imagePosition="left"
					href={getDashboardSite('/')}
					data={consumerTextMessaging}
				/>

				<Letter
					id="events"
					className="bg-inverse-soft"
					{...letters.events}
					href={getDashboardSite('/')}
				/>
				<Letter
					id="engagement"
					className="bg-inverse"
					href={getDashboardSite('/')}
					{...letters['consumer-messaging']}
				/>

				<Benefits
					className="bg-inverse-soft"
					id="support"
					imagePosition="left"
					href={getDashboardSite('/')}
					data={messageSupport}
				/>
				<PricingCard
					id="pricing"
					href={getDashboardSite('/')}
					className="md:pt-8 bg-inverse"
					{...messagingPrices}
				/>

				<Letter
					className="bg-inverse-soft"
					title={`Start creating memorable customer experiences today.`}
					text={`Create customer engagement and build trust with compliant Messaging Service from Gras.`}
					cta={`Get Started`}
					href={getDashboardSite('/')}
					divider={false}
				/>

				<ContactUs id="get-started" />
			</Page>
		</>
	);
}

const SectionsNav = () => {
	const { asPath } = useRouter();
	const hash = asPath.split('#')[1];

	const sections = [
		// { title: 'Messaging', id: 'messaging' },
		{ title: 'Info', id: 'info' },
		{ title: 'Events', id: 'events' },
		{ title: 'Engagement', id: 'engagement' },
		{ title: 'Support', id: 'support' },
		{ title: 'Pricing', id: 'pricing' },
		{ title: 'Get Started', id: 'get-started' },
	];
	return (
		<div className="bg-[#444444] mx-auto flex flex-row content-center items-center justify-center gap-x-4 py-2">
			{sections.map((section) => (
				<Link
					key={`link-${section.title}`}
					className={`text-light font-encode text-md font-medium hover:underline ${
						(hash?.includes(section.id) && 'underline') || ''
					}`}
					href={`#${section.id}`}
				>
					{section.title}
				</Link>
			))}
		</div>
	);
};
MessagingLandingPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<ServicesTopBar />
			{/* <div className="sticky top-0 z-50">
				<SectionsNav />
			</div> */}
			{page}
			<Footer />
		</>
	);
};
export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}
