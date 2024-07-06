/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import SEOMetaTags from '@/lib/SEOMetaTags';
import {
	Page,
	type LayoutContextProps,
	H2,
	Paragraph,
	Footer,
} from '@cd/ui-lib';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	Benefits,
	Letter,
	ContactUs,
	Hero,
	ServicesTopBar,
} from '@/components/landing';
import {
	automateDeliveryCompliance,
	consumerTextMessaging,
	dealValue,
	deliveryManagementService,
	fullServiceDelivery,
	trackDeliveries,
	unlockYourGrowth,
} from '@/components/landing/benefits/benefit-data';
import { letters } from '@/components/landing/letter/letter-data';
import Partners from '@/components/landing/partners/Partners';
import { partners } from '@/components/landing/partners/partners-data';

export default function DispensaryLandingPage() {
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
					'cannabis retail success',
					'retail success',
					'retail services',
					'cannabis dispensary help',
					'cannabis dispensary sales',
					'cannabis dispensary growth',
					'dispensary growth',
					'delivery growth',
					'cannabis delivery software',
					'cannabis delivery',
					'cannabis home delivery',
					'weed home delivery',
					'bud home delivery',
					'bud delivery to home',
					'home delivery',
					'cannabis business',
					'cannabis business services',
					'cannabis delivery service',
					'weed delivery software',
					'weed delivery business',
					'weed business',
					'dispensary software',
					'weed delivery service',
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
				<Hero />

				<Letter id="grow" {...letters.growth} />
				<Benefits data={unlockYourGrowth} className="bg-inverse-soft" />

				<Letter {...letters['delivery-painpoints']} />
				<Benefits
					className="bg-gradient-to-b from-10% from-inverse to-inverse-soft"
					data={deliveryManagementService}
				/>
				<Benefits
					imagePosition="left"
					data={automateDeliveryCompliance}
					className="bg-inverse-soft"
				/>

				<Letter {...letters['delivery-tracking']} />
				<Benefits
					imagePosition="left"
					data={trackDeliveries}
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
					className="bg-inverse-soft"
					{...letters['full-service-delivery']}
				/>
				<Benefits className="bg-inverse" data={fullServiceDelivery} />

				<Letter
					className="bg-inverse-soft"
					{...letters['consumer-messaging']}
				/>
				<Benefits
					className="bg-inverse"
					imagePosition="left"
					data={consumerTextMessaging}
				/>
				<Letter className="bg-inverse-soft" {...letters.events} />

				<Letter className="bg-inverse" {...letters['take-urgent-action']} />
				<Letter className="bg-inverse-soft" {...letters['limited-offer']} />

				<Letter className="bg-inverse" {...letters['partner-relationship']} />

				<Benefits
					className="bg-inverse-soft"
					imagePosition="left"
					data={dealValue}
					values={dealValues}
					valueColor="text-primary"
				>
					<Paragraph className="font-semibold text-3xl text-primary">
						Total Value{' '}
						<span className="line-through">{`$${dealValues.reduce(
							(a, b) => a + b,
							0
						)}`}</span>
					</Paragraph>
					<Paragraph className="font-semibold text-4xl">
						{`You don't pay this price today!`}
					</Paragraph>
					<Paragraph className="font-semibold text-3xl ml-6">
						{`See today's price below 👇`}
					</Paragraph>
				</Benefits>

				<Letter className="bg-inverse" {...letters['free-consultation']}>
					<div className="py-6">
						<Paragraph className="font-semibold text-center text-3xl">
							Your price today:{' '}
							<span className="text-primary line-through">{`$980.88`}</span>
							<span className="block text-primary pt-4 underline underline-offset-8">{`${price}`}</span>
						</Paragraph>
						<br />
						<Paragraph className="font-semibold text-3xl text-center">
							{`Fill Out The Form Below 👇`}
						</Paragraph>
					</div>
				</Letter>

				<ContactUs id="get-started" />
			</Page>
		</>
	);
}

const dealValues = [779, 1179, 4779, 979, 1479];
const price = '$489.99';

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
