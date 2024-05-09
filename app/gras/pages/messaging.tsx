/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Page,
	H2,
	Paragraph,
	Footer,
} from '@cd/ui-lib';
import Head from 'next/head';
import { type ReactElement, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	Benefits,
	Letter,
	ContactUs,
	MessagingHero,
	ServicesTopBar,
} from '@/components/landing';
import { letters } from '@/components/landing/letter/letter-data';
import Partners from '@/components/landing/partners/Partners';
import {
	automateDeliveryCompliance,
	consumerTextMessaging,
	dealValue,
	deliveryManagementService,
	fullServiceDelivery,
	trackDeliveries,
	unlockYourGrowth,
} from '@/components/landing/benefits/benefit-data';
import { partners } from '@/components/landing/partners/partners-data';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MessagingLandingPage() {
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
				<MessagingHero />
				
				{/* <Letter id="letter-1" {...letters['growth']} /> */}
				<Benefits
					id="benefit-1"
					data={unlockYourGrowth}
					className="bg-inverse-soft"
				/>

				{/* <Letter {...letters['delivery-painpoints']} />
				<Benefits
					id="benefit-5"
					imagePosition="left"
					data={automateDeliveryCompliance}
					className="bg-inverse-soft"
				/>

				<Letter {...letters['delivery-tracking']} />
				<Benefits
					id="benefit-3"
					imagePosition="left"
					data={trackDeliveries}
					className="bg-inverse-soft"
				/>
				<Benefits
					id="benefit-4"
					className="bg-gradient-to-b from-10% from-inverse to-inverse-soft"
					data={deliveryManagementService}
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

				<Letter
					className="bg-inverse-soft"
					{...letters['full-service-delivery']}
				/>
				<Benefits
					className="bg-inverse"
					id="benefit-6"
					data={fullServiceDelivery}
				/>

				<Benefits
					className="bg-inverse-soft"
					id="benefit-2"
					imagePosition="left"
					data={consumerTextMessaging}
				/>
				<Letter className="bg-inverse" {...letters['consumer-messaging']} />
				<Letter className="bg-inverse-soft" {...letters['events']} />

				<Letter className="bg-inverse" {...letters['take-urgent-action']} />
				<Letter className="bg-inverse-soft" {...letters['limited-offer']} />

				<Letter className="bg-inverse" {...letters['partner-relationship']} /> */}

				{/* <Bonus title="BONUS 1" />
				<Bonus title="BONUS 2" />
				<Bonus title="BONUS 3" /> */}
				{/* <Benefits
					className="bg-inverse-soft"
					id="benefit-2"
					imagePosition="left"
					data={dealValue}
					values={dealValues}
					valueColor="text-primary"
				>
					<Paragraph className="font-semibold text-3xl text-primary">
						Total Value{' '}
						<span className="line-through">{`$${dealValues.reduce(
							(a, b) => a + b,
							0,
						)}`}</span>
					</Paragraph>
					<Paragraph className="font-semibold text-4xl">
						{`You don't pay this price today!`}
					</Paragraph>
					<Paragraph className="font-semibold text-3xl">
						{`Find out your price today below 👇`}
					</Paragraph>
				</Benefits>

				<Letter className="bg-inverse" {...letters['free-consultation']}>
					<div className="py-6">
						<Paragraph className="font-semibold text-3xl">
							Fill Out The Form Below To Get Your Free Consultation 👇
						</Paragraph>
					</div>
				</Letter>

				<ContactUs /> */}
			</Page>
		</>
	);
}

const dealValues = [779, 1179, 4779, 979, 1479];

const Bonus = ({ title }: { title: string }) => {
	return (
		<div>
			<H2
				className={twMerge(
					'text-center text-5xl font-bold leading-snug max-w-lg md:max-w-6xl lg:text-6xl lg:leading-tight whitespace-pre-line',
				)}
			>
				{title}
			</H2>
		</div>
	);
};

const SectionsNav = () => {

	const {asPath} = useRouter();
	const hash = asPath.split('#')[1];

	const sections =[
		{title: 'Messaging', id: 'messaging'},
		{title:'Info', id: 'info'},
		{title:'Engagement', id: 'engagement'},
		{title:'Pricing', id: 'pricing'},
	];
	return (
		<div className='bg-[#444444] mx-auto flex flex-row content-center items-center justify-center gap-x-4 py-2'>
		{sections.map((section) => (<Link key={`link-${section.title}`} className={`text-light font-encode text-md font-medium hover:underline ${hash.includes(section.id) && 'underline' || ''}`} href={`#${section.id}`}>{section.title}</Link>))}
		</div>
	);

}
MessagingLandingPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
		<div className='sticky'>
			<ServicesTopBar />
			<SectionsNav />
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