import {
  ErrorBoundary,
  LoadingPage,
  ModalProvider,
  ToastProvider,
  type Theme,
  applyTheme,
} from '@cd/ui-lib';
import mixpanel from 'mixpanel-browser';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SWRConfig } from 'swr';
import colors from 'tailwindcss/colors';
import app from '@/lib/app';
import '@boxyhq/react-ui/dist/style.css';
import '../styles/anim8-gradient.css';
import '../styles/globals.css';
import '../styles/shop.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';
import env from '@/lib/env';
import { Themer } from '@boxyhq/react-ui/shared';
import { AccountLayout } from '@/components/layouts';
import { type AppPropsWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import { wrapper } from '@/lib/store';
import { loadHotJar } from '@cd/core-lib/src/lib/hotjar';
import { loadBrevoChat } from '@cd/core-lib/src/lib/brevoChat';
import {
  GTMTag,
  loadGoogleTagManager,
} from '@cd/core-lib/src/lib/googletagmanager';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CacheProvider from '@cd/core-lib/src/lib/cache';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loadSegment } from '@cd/core-lib/src/lib/segment';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
);

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

function MyApp({
  Component,
  ...appProps
}: AppPropsWithLayout & { pageProps: SharedPageProps }) {
  const { store } = wrapper.useWrappedStore(appProps);
  // @ts-expect-error - persistor is not a property of store
  const persistor = store._persistor;

  const { pageProps } = appProps;
  const { session, ...props } = pageProps;

  // Add mixpanel
  useEffect(() => {
    if (env.mixpanel.token) {
      mixpanel.init(env.mixpanel.token, {
        debug: true,
        ignore_dnt: true,
        track_pageview: true,
      });
    }

    if (env.darkModeEnabled) {
      applyTheme(localStorage.getItem('theme') as Theme);
    }
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <AccountLayout>{page}</AccountLayout>);

  return (
    <>
      <Head>
        <>
          {loadBrevoChat()}
          {loadSegment()}
          {loadGoogleTagManager()}
          {loadHotJar()}
          <GTMTag />
          <SEOMetaTags />
        </>
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          provider: CacheProvider,
        }}
      >
        <ErrorBoundary>
          <SessionProvider session={session}>
            <ReduxProvider store={store}>
              <PersistGate persistor={persistor} loading={<LoadingPage />}>
                <ModalProvider />
                <ToastProvider />
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: 'setup',
                    currency: 'usd',
                    setup_future_usage: 'off_session',
                  }}
                >
                  <Themer
                    overrideTheme={{
                      '--primary-color': colors.blue['500'],
                      '--primary-hover': colors.blue['600'],
                      '--primary-color-50': colors.blue['50'],
                      '--primary-color-100': colors.blue['100'],
                      '--primary-color-200': colors.blue['200'],
                      '--primary-color-300': colors.blue['300'],
                      '--primary-color-500': colors.blue['500'],
                      '--primary-color-600': colors.blue['600'],
                      '--primary-color-700': colors.blue['700'],
                      '--primary-color-800': colors.blue['800'],
                      '--primary-color-900': colors.blue['900'],
                      '--primary-color-950': colors.blue['950'],
                    }}
                  >
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                      onExitComplete={() => window.scrollTo(0, 0)}
                    >
                      {getLayout(<Component {...props} />)}
                    </AnimatePresence>
                  </Themer>
                </Elements>
              </PersistGate>
            </ReduxProvider>
          </SessionProvider>
        </ErrorBoundary>
      </SWRConfig>
    </>
  );
}

export default wrapper.withRedux(appWithTranslation<never>(MyApp));
