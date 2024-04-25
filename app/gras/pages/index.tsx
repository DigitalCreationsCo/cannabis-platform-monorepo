import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FAQSection from '@/components/defaultLanding/FAQSection';
import HeroSection from '@/components/defaultLanding/HeroSection';
import FeatureSection from '@/components/defaultLanding/FeatureSection';
import PricingSection from '@/components/defaultLanding/PricingSection';
import {FlexBox, Paragraph, GrasSignature, useTheme, styles} from '@cd/ui-lib';
import env from '@/lib/env';
import Head from 'next/head';
import { NextPageWithLayout } from '@/lib/next.types';
import Image from 'next/image';
import { TextContent } from '@cd/core-lib';
import classNames from 'classnames';

const Home: NextPageWithLayout = () => {
  const { toggleTheme, selectedTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('homepage-title')}</title>
      </Head>

      <div className="container mx-auto">
        <div className="navbar bg-base-100 px-0 sm:px-1">
          <div className="flex-1">
          <FlexBox>
				<FlexBox className="flex-row items-center">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-secondary pt-1 pb-0 mb-0 leading-3">
							Gras
						</GrasSignature>
					</Link>
					<Link href={'/'}>
						<Image alt="Gras" width={40} height={40} src={'/logo.png'} />
					</Link>
				</FlexBox>
				<Link href={'/'}>
					<Paragraph className={classNames(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal flex items-center gap-2 sm:gap-4">
              {env.darkModeEnabled && (
                <li>
                  <button
                    className="bg-none p-0 rounded-lg flex items-center justify-center"
                    onClick={toggleTheme}
                  >
                    <selectedTheme.icon className="w-5 h-5" />
                  </button>
                </li>
              )}
              <li>
                <Link
                  href="/auth/join"
                  className="btn btn-primary btn-md py-3 px-2 sm:px-4 text-white"
                >
                  {t('sign-up')}
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="btn btn-primary dark:border-zinc-600 dark:border-2 dark:text-zinc-200 btn-outline py-3 px-2 sm:px-4 btn-md"
                >
                  {t('sign-in')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <HeroSection />
        <div className="divider"></div>
        <FeatureSection />
        <div className="divider"></div>
        <PricingSection />
        <div className="divider"></div>
        <FAQSection />
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
