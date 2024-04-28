import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  FlexBox,
  Paragraph,
  GrasSignature,
  useTheme,
  styles,
  Button,
  Page,
  H1,
  H2,
  CheckAge,
  Footer,
} from '@cd/ui-lib';
import env from '@/lib/env';
import Head from 'next/head';
import { NextPageWithLayout } from '@/lib/next.types';
import Image from 'next/image';
import { TextContent } from '@cd/core-lib';
import classNames from 'classnames';
import logo from '../public/logo.png';
import { twMerge } from 'tailwind-merge';
import friendsVideo from '../public/Gras-community-clip.mp4';

const Home: NextPageWithLayout = () => {
  const { toggleTheme, selectedTheme } = useTheme();
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col">
      <Head>
        <title>{t('homepage-title')}</title>
      </Head>

      <div className={twMerge(styles.TOPBAR.topbar)}>
        <div>
          <FlexBox>
            <FlexBox className="flex-row items-center">
              <Link href={'/'} className="z-50">
                <GrasSignature className="text-secondary pt-1 pb-0 mb-0 leading-3">
                  Gras
                </GrasSignature>
              </Link>
              <Link href={'/'}>
                <Image alt="Gras" width={40} height={40} src={logo.src} />
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
          <ul className="flex items-center gap-2 sm:gap-4">
            <li>
              <Link href="/auth/join">
                <Button
                  className={twMerge(styles.BUTTON.highlight)}
                  size="sm"
                  bg="transparent"
                  hover="transparent"
                >
                  {t('sign-in')}
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Page className={twMerge(gradient, 'text-light')}>
        <div className="relative flex w-full h-full flex-col-reverse lg:!flex-row mx-auto gap-4 py-4 items-center justify-center">
          <video
            className="absolute lg:!relative h-full w-full opacity-25 lg:opacity-100 lg:max-w-lg shrink-0 lg:rounded-lg lg:p-0 shadow"
            style={{
              aspectRatio: 'auto',
              // width: '100%',
              // height: '100%',
              // zIndex: -1,
              objectFit: 'cover',
              objectPosition: '40% 40%',
              left: '0',
              top: '0',
            }}
            src={friendsVideo}
            autoPlay
            loop
            muted
          />
          <div className="w-[440px] h-[420px] z-10 m-auto lg:!m-0 pt-4 lg:!my-auto">
            <H1 className="text-center">Welcome to Gras</H1>
            <H2 className="text-center">Serving People And Cannabis</H2>
            <CheckAge redirect={'/browse'} />
          </div>
        </div>
      </Page>
    </div>
  );
};

const gradient = [
  'bg-gradient-to-b',
  'from-10%',
  'from-secondary-light',
  'to-secondary',
  'p-0 lg:p-16 h-max',
];

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
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

export default Home;
