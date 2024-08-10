/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ServicesTopBar } from '@/components/layouts';
import { getDashboardSite, keywords } from '@cd/core-lib';
import {
	Page,
	type LayoutContextProps,
	H2,
	H3,
	Paragraph,
	Footer,
	Benefits,
	Letter,
	ContactUs,
	Hero,
	H5,
	H4,
} from '@cd/ui-lib';
import {
	automateDeliveryCompliance,
	consumerTextMessaging,
	dealValue,
	deliveryManagementService,
	fullServiceDelivery,
	trackDeliveries,
	unlockYourGrowth,
} from '@cd/ui-lib/src/components/landing/benefits/benefit-data';
import { letters } from '@cd/ui-lib/src/components/landing/letter/letter-data';
import Partners from '@cd/ui-lib/src/components/landing/partners/Partners';
import { partners } from '@cd/ui-lib/src/components/landing/partners/partners-data';
import price from '@cd/ui-lib/src/components/landing/Pricing/messagingPrices';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import seoConfig from '@/lib/seo.config';

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
							...keywords['messaging'],
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
				<Hero href={getDashboardSite('/')} />

				<Letter id="info" {...letters.growth} href={getDashboardSite('/')} />

				<Benefits
					data={unlockYourGrowth}
					className="bg-inverse-soft"
					href={getDashboardSite('/')}
				/>

				<Letter
					className="bg-gradient-to-b from-10% from-inverse to-inverse-soft"
					{...letters['delivery-painpoints']}
					href={getDashboardSite('/')}
				/>

				<Benefits
					data={deliveryManagementService}
					href={getDashboardSite('/')}
				/>
				<Benefits
					imagePosition="left"
					data={automateDeliveryCompliance}
					href={getDashboardSite('/')}
					className="bg-inverse-soft"
				/>

				<div
					className={twMerge(
						'bg-gradient-to-b from-10% from-inverse to-inverse-soft'
					)}
				>
					<Partners
						scaleOnHover
						title={`Partnered with the leading cannabis technology`}
						partners={partners}
					/>
				</div>

				<Letter
					{...letters['delivery-tracking']}
					href={getDashboardSite('/')}
				/>
				<Benefits
					imagePosition="left"
					data={trackDeliveries}
					href={getDashboardSite('/')}
					className="bg-inverse-soft"
				/>

				<Letter
					className="bg-inverse-soft"
					{...letters['full-service-delivery']}
					href={getDashboardSite('/')}
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

				<Letter
					className="bg-inverse-soft"
					{...letters['consumer-messaging']}
					href={getDashboardSite('/')}
				/>

				<Benefits
					className="bg-inverse-soft"
					imagePosition="left"
					data={consumerTextMessaging}
					href={getDashboardSite('/')}
				/>

				<Letter
					className="bg-inverse"
					href={getDashboardSite('/')}
					{...letters['partner-relationship']}
				/>

				<Letter
					className="bg-inverse-soft"
					href={getDashboardSite('/')}
					{...letters['limited-offer']}
				/>

				<Benefits
					className="bg-inverse"
					imagePosition="left"
					data={dealValue}
					values={price.dealValues}
					valueColor="text-primary"
					href={getDashboardSite('/')}
				>
					<H3 className="text-primary">
						Total Value{' '}
						<span className="line-through">{`$${price.dealValues.reduce(
							(a, b) => a + b,
							0
						)}`}</span>
					</H3>
					<H3 className="mt-1 leading-normal">{`You don't pay this price today!
					See today's price below 👇`}</H3>
				</Benefits>

				<Letter
					className="bg-inverse-soft"
					href={getDashboardSite('/')}
					{...letters['take-urgent-action']}
				/>

				<Letter
					className="bg-inverse"
					{...letters['free-consultation']}
					href={getDashboardSite('/')}
					cta={t('sign-up-now')}
					secondaryCTA={t('contact-sales')}
				>
					<div className="py-6">
						<Paragraph className="text-center text-2xl">
							Your price today is{' '}
							<span className="text-primary line-through">{`$980.88`}</span>
							<H3 className="items-center pt-4">
								<span className="text-5xl font-bold text-primary">
									{price.prices[0].price}
								</span>{' '}
							</H3>
						</Paragraph>
						<br />
						<Paragraph className="text-2xl text-center">
							{`Fill Out The Form Below 👇`}
						</Paragraph>
					</div>
				</Letter>

				<ContactUs id="get-started" />
			</Page>
		</>
	);
}

DispensaryLandingPage.getLayoutContext = (): LayoutContextProps => ({
	TopBarComponent: () => (
		<>
			<div className="text-center bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2>
					Create Hyper Growth For Your Dispensary With Customer Appeal and
					Delivery
				</H2>
			</div>
			<ServicesTopBar />
		</>
	),
});

const Bonus = ({ title }: { title: string }) => {
	return (
		<div>
			<H2
				className={twMerge(
					'text-center text-5xl font-bold leading-snug max-w-lg md:max-w-6xl lg:text-6xl lg:leading-tight whitespace-pre-line'
				)}
			>
				{title}
			</H2>
		</div>
	);
};

DispensaryLandingPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<div className="text-center bg-secondary-light text-inverse-soft py-1 cursor-default">
				<H2>
					Create Hyper Growth For Your Dispensary With Customer Appeal and
					Delivery
				</H2>
			</div>
			<ServicesTopBar className="lg:px-10 h-fit" />
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
