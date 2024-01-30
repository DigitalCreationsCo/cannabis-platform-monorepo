import { Page, type LayoutContextProps } from '@cd/ui-lib';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Benefits from 'components/landing-page/benefits/Benefits';
import Partners from 'components/landing-page/partners/Partners';
import heroImg from '../../../public/cannabis-delivered.jpg';
import { ContactUs, Hero, ServicesTopBar } from '../../components/landing-page';
import {
	benefitDataDeliveryThatWorksForYou,
	benefitDataStableBusinessAndGrowth,
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
				'flex flex-col gap-8',
				'p-0 md:p-0 lg:p-0 pb-8',
			)}
		>
			<Hero />
			<Partners partners={partners} />
			<Benefits data={benefitDataDeliveryThatWorksForYou} />
			<Benefits data={benefitDataStableBusinessAndGrowth} />
			<ContactUs />
		</Page>
	);
}

DispensaryLandingPage.getLayoutContext = (): LayoutContextProps => ({
	TopBarComponent: ServicesTopBar,
	showHeader: false,
	showSideNav: false,
});
