/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Page, H2, Paragraph, Footer } from '@cd/ui-lib';
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
  messageSupport,
  trackDeliveries,
  unlockYourGrowth,
} from '@/components/landing/benefits/benefit-data';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PricingCard from '@/components/landing/Pricing/Pricing';
import messagingPrices from '@/components/landing/Pricing/messagingPrices';
import SEOMetaTags from '@/lib/SEOMetaTags';

export default function MessagingLandingPage() {
  useEffect(() => {
    window.BrevoConversationsSetup = {
      startHidden: true,
    };
  }, []);
  return (
    <>
      <Head>
        <SEOMetaTags
          additionalKeywords={[
            'cannabis text message marketing',
            'cannabis text message',
            'cannabis text message marketing',
            'cannabis sms',
            'dispensary text message',
            'send messages from dispensary',
            'message dispensary customers',
            'weed text',
          ]}
        />
      </Head>
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

const dealValues = [779, 1179, 4779, 979, 1479];

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
