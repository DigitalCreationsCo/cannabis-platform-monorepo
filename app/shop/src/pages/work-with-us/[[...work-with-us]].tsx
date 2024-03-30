/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Page, type LayoutContextProps } from '@cd/ui-lib';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Benefits from 'components/landing-page/benefits/Benefits';
import Partners from 'components/landing-page/partners/Partners';
import { ContactUs, Hero, ServicesTopBar } from '../../components/landing-page';
import {
	benefitDataDeliveryThatWorksForYou,
	benefitDataStableBusinessAndGrowth,
	benefitDataTrackYourOrders,
} from '../../components/landing-page/benefits/benefit-data';
import { partners } from '../../components/landing-page/partners/partners-data';

export default function DispensaryLandingPage() {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	return (
		<Page
			className={twMerge(
				'bg-inverse-soft',
				'lg:min-h-[710px]',
				'flex flex-col',
				'p-0 m-0 md:p-0 lg:p-0',
			)}
		>
			<Head>
				<>
					{(function (
						d,
						a,
						i,
						l,
						ye,
						s,
						t,
						o?: HTMLScriptElement | undefined,
						r?: HTMLScriptElement | undefined,
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						y,
					) {
						d._dsSettings = i;
						r = a.createElement('script');
						o = a.getElementsByTagName('script')[0];
						r.src = '//us-1.dailystory.com/ds/ds' + i + '.js';
						r.async = true;
						r.id = 'ds-sitescript';
						o.parentNode!.insertBefore(r, o);
					})(window, document, 'driilnbagyzhfydo')}
				</>
			</Head>
			<Hero />
			<Partners partners={partners} />
			<Benefits id="benefit-3" data={benefitDataStableBusinessAndGrowth} />
			<Benefits
				id="benefit-1"
				imagePosition="left"
				data={benefitDataDeliveryThatWorksForYou}
			/>
			<Benefits id="benefit-2" data={benefitDataTrackYourOrders} />
			<ContactUs />
		</Page>
	);
}

DispensaryLandingPage.getLayoutContext = (): LayoutContextProps => ({
	TopBarComponent: ServicesTopBar,
	showHeader: false,
	showSideNav: false,
});
