import { ServicesTopBar } from '@/components/layouts';
import seoConfig from '@/lib/seo.config';
import keywords from '@gras/core/seo';
import { getDashboardSite } from '@gras/core/utils';
import {
	Page,
	H2,
	type LayoutContextProps,
	Footer,
	Benefits,
	Letter,
	ContactUs,
	Hero,
} from '@gras/ui';
import {
	consumerTextMessaging,
	fullServiceDelivery,
} from '@gras/ui/src/components/landing/benefits/benefit-data';
import { letters } from '@gras/ui/src/components/landing/letter/letter-data';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
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
			<NextSeo
				{...seoConfig}
				additionalMetaTags={[
					...seoConfig.additionalMetaTags,
					{
						name: 'keywords',
						content: [
							...keywords['cannabis'],
							...keywords['business'],
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
			<ServicesTopBar />
			<div className="bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2 className="text-center font-semibold">
					Create Hyper Growth For Your Dispensary With Customer Appeal and
					Delivery
				</H2>
			</div>
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
