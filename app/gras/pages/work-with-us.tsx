import { ServicesTopBar } from '@/components/layouts';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { getDashboardSite } from '@cd/core-lib';
import {
	Page,
	H2,
	type LayoutContextProps,
	Footer,
	Benefits,
	Letter,
	ContactUs,
	Hero,
} from '@cd/ui-lib';
import {
	consumerTextMessaging,
	fullServiceDelivery,
} from '@cd/ui-lib/src/components/landing/benefits/benefit-data';
import { letters } from '@cd/ui-lib/src/components/landing/letter/letter-data';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export default function DispensaryLandingPage() {
	const { t } = useTranslation('common');
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	return (
		<>
			<SEOMetaTags
				additionalKeywords={[
					'cannabis business help',
					'cannabis business growth',
					'cannabis business success',
					'cannabis dispensary help',
					'cannabis dispensary sales',
					'cannabis dispensary growth',
					'cannabis delivery software',
					'cannabis business',
					'cannabis business services',
					'cannabis delivery service',
					'weed delivery software',
					'weed delivery business',
					'weed business',
					'dispensary software',
					'weed delivery service',
					'bud delivery service',
					'weed delivery help',
					'cannabis delivery help',
					'bud delivery help',
					'help my dispensary',
					'help my cannabis business',
					'dispensary success',
					'merchant services for cannabis businesses',
					'business services for cannabis',
					'cannabis business compliance services',
					'cannabis businesses and services',
					'cannabis business solutions',
					'cannabis delivery business plan',
					'cannabis consulting',
					'cannabis business consulting',
					'cannabis business marketing',
					'cannabis messaging',
					'cannabis business messag',
					'cannabis industry business services',
				]}
			/>
			<Page
				className={twMerge(
					'lg:min-h-[710px]',
					'flex flex-col',
					'p-0 m-0 md:p-0 lg:p-0'
				)}
			>
				<Hero showPretext={false} href={getDashboardSite('/')} />
				<Letter
					id="info"
					className="bg-inverse-soft pt-8"
					{...letters.growth}
					href={getDashboardSite('/')}
					title={letters['free-consultation'].title}
				/>

				<Benefits
					className="bg-inverse"
					href={getDashboardSite('/')}
					data={fullServiceDelivery}
				/>

				<Letter
					className="bg-inverse"
					href={getDashboardSite('/')}
					{...letters.events}
				/>

				<Benefits
					className="bg-inverse-soft"
					imagePosition="left"
					data={consumerTextMessaging}
					href={getDashboardSite('/')}
				/>

				<ContactUs id="get-started" />
			</Page>
		</>
	);
}

DispensaryLandingPage.getLayoutContext = (): LayoutContextProps => ({
	TopBarComponent: () => (
		<>
			<div className="bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2 className="text-center font-semibold">
					Create Hyper Growth For Your Dispensary With Customer Appeal and
					Delivery
				</H2>
			</div>
			<ServicesTopBar />
		</>
	),
	showHeader: false,
	showSideNav: false,
});

DispensaryLandingPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<div className="bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2 className="text-center font-semibold">
					Create Hyper Growth For Your Dispensary With Customer Appeal and
					Delivery
				</H2>
			</div>
			<ServicesTopBar />
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
