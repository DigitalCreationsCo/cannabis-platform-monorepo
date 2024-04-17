/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Page, type LayoutContextProps, H2, Button } from '@cd/ui-lib';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Benefits from 'components/landing-page/benefits/Benefits';
import Letter from 'components/landing-page/letter/Letter';
import { letters } from 'components/landing-page/letter/letter-data';
import Partners from 'components/landing-page/partners/Partners';
import { ContactUs, Hero, ServicesTopBar } from '../../components/landing-page';
import {
	automateDeliveryCompliance,
	consumerTextMessaging,
	deliveryManagementService,
	fullServiceDelivery,
	trackDeliveries,
	unlockYourGrowth,
} from '../../components/landing-page/benefits/benefit-data';
import { partners } from '../../components/landing-page/partners/partners-data';

export default function DispensaryLandingPage() {
	useEffect(() => {
		window.BrevoConversationsSetup = {
			startHidden: true,
		};
	}, []);
	return (
		<>
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
			<Page
				className={twMerge(
					'lg:min-h-[710px]',
					'flex flex-col',
					'p-0 m-0 md:p-0 lg:p-0',
				)}
			>
				<Hero />
				<Letter {...letters['growth']} />
				<Benefits id="benefit-1" data={unlockYourGrowth} />

				<Letter {...letters['painpoints']} />
				<Benefits
					id="benefit-5"
					imagePosition="left"
					data={automateDeliveryCompliance}
				/>

				<Letter {...letters['delivery-tracking']} />
				<Benefits id="benefit-3" imagePosition="left" data={trackDeliveries} />
				<Benefits
					id="benefit-4"
					className="bg-gradient-to-b from-10% from-inverse to-inverse-soft"
					data={deliveryManagementService}
				/>

				<Letter
					className="bg-inverse-soft"
					{...letters['full-service-delivery']}
				/>
				<Benefits
					className="bg-inverse-soft"
					id="benefit-6"
					data={fullServiceDelivery}
				/>

				<Benefits
					className="bg-inverse-soft"
					id="benefit-2"
					imagePosition="left"
					data={consumerTextMessaging}
				/>
				<Letter
					className="bg-inverse-soft"
					{...letters['consumer-messaging']}
				/>

				<div
					className={twMerge(
						'bg-gradient-to-b from-10% from-inverse to-inverse-soft',
					)}
				>
					<Partners
						scaleOnHover
						title={`Partnered with the leading cannabis technology`}
						partners={partners}
					/>
				</div>

				<ContactUs />
			</Page>
		</>
	);
}

DispensaryLandingPage.getLayoutContext = (): LayoutContextProps => ({
	TopBarComponent: () => (
		<>
			<div className="bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2 className="text-center font-semibold">
					Create Hyper Growth For Your Dispensary With Customer Mass Appeal and
					Delivery
				</H2>
			</div>
			<ServicesTopBar />
		</>
	),
	showHeader: false,
	showSideNav: false,
});

export const CTA2XMyBusiness = ({
	className,
	cta,
}: {
	className?: any;
	cta?: any;
}) => {
	return (
		<Link
			href={'#contact-us-header'}
			scroll={false}
			className={twMerge(
				'min-w-[240px] hover:scale-105 transition duration-200',
				className,
			)}
		>
			<Button
				size="lg"
				bg="secondary-light"
				hover="primary"
				className="w-full uppercase font-black px-8"
			>
				{cta || `2X My Business`}
			</Button>
		</Link>
	);
};
