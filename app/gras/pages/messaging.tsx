/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import SEOMetaTags from '@/lib/SEOMetaTags';
import { Page, Footer } from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	Benefits,
	Letter,
	MessagingHero,
	ServicesTopBar,
} from '@/components/landing';
import {
	consumerTextMessaging,
	messageSupport,
} from '@/components/landing/benefits/benefit-data';
import { letters } from '@/components/landing/letter/letter-data';
import messagingPrices from '@/components/landing/Pricing/messagingPrices';
import PricingCard from '@/components/landing/Pricing/Pricing';

export default function MessagingLandingPage() {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	return (
		<>
			<SEOMetaTags
				additionalKeywords={[
					'cannabis text message marketing',
					'cannabis text message',
					'cannabis sms',
					'dispensary text message',
					'send messages from dispensary',
					'message dispensary customers',
					'weed text',
					'cannabis messaging',
					'cannabis business messag',
					'cannabis business marketing',
					'cannabis business consulting',
					'cannabis marketing solution',
				]}
			/>
			<Page
				className={twMerge(
					'lg:min-h-[710px]',
					'flex flex-col',
					'p-0 m-0 md:p-0 lg:p-0'
				)}
			>
				<MessagingHero />

				<Letter
					id="info"
					className="bg-inverse-soft"
					{...letters['consumer-messaging']}
				/>
				<Benefits
					className="bg-inverse"
					id="engagement"
					imagePosition="left"
					data={consumerTextMessaging}
				/>

				<PricingCard id="pricing" className="md:pt-8" {...messagingPrices} />

				<Benefits
					className="bg-inverse"
					id="support"
					imagePosition="left"
					data={messageSupport}
				/>

				<Letter
					id="get-started"
					title={`Create Memorable Customer Experiences Today`}
					text={`Start building customer engagement with compliant cannabis text messaging from Gras.`}
					cta={`Get Started`}
					href={`/auth/join`}
					divider={false}
				/>
			</Page>
		</>
	);
}

const SectionsNav = () => {
	const { asPath } = useRouter();
	const hash = asPath.split('#')[1];

	const sections = [
		{ title: 'Messaging', id: 'messaging' },
		{ title: 'Info', id: 'info' },
		{ title: 'Engagement', id: 'engagement' },
		{ title: 'Pricing', id: 'pricing' },
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
		<div className="">
			<ServicesTopBar />
			<div className="sticky top-0 z-50">
				<SectionsNav />
			</div>
			{page}
			<Footer />
		</div>
	);
};
export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}
