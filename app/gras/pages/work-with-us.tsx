/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Page,
  type LayoutContextProps,
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
  Hero,
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

export default function DispensaryLandingPage() {
  useEffect(() => {
    window.BrevoConversationsSetup = {
      startHidden: true,
    };
  }, []);
  return (
    <>
      <Head>
      </Head>
      <Page
        className={twMerge(
          'lg:min-h-[710px]',
          'flex flex-col',
          'p-0 m-0 md:p-0 lg:p-0'
        )}
      >
        <Letter id="grow" className="bg-inverse-soft pt-8" {...letters['growth']} title={letters['free-consultation'].title} />

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
