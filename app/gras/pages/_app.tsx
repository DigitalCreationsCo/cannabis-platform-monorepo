import app from '@/lib/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import colors from 'tailwindcss/colors';
import {
  ErrorBoundary,
  LoadingPage,
  ModalProvider,
  ToastProvider,
} from '@cd/ui-lib';
import mixpanel from 'mixpanel-browser';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@boxyhq/react-ui/dist/style.css';
import '../styles/anim8-gradient.css';
import '../styles/globals.css';
import '../styles/shop.css';
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-unused-vars
import '../styles/tailwind.css';
import { useEffect } from 'react';
import env from '@/lib/env';
import { Theme, applyTheme } from '@cd/ui-lib';
import { Themer } from '@boxyhq/react-ui/shared';
import { AccountLayout } from '@/components/layouts';
import { NextSeo } from 'next-seo';
import { AppPropsWithLayout } from '@/lib/next.types';
import { wrapper } from '@/lib/store';
import { loadHotJar } from '@cd/core-lib/src/lib/hotjar';
import { loadBrevoChat } from '@cd/core-lib/src/lib/brevoChat';
import {
  GTMTag,
  loadGoogleTagManager,
} from '@cd/core-lib/src/lib/googletagmanager';
import { SWRConfig } from 'swr';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CacheProvider from '@cd/core-lib/src/lib/cache';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

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
      {loadBrevoChat()}
      {loadGoogleTagManager()}
      {loadHotJar()}
      <GTMTag />
      <NextSeo
        title={app.name}
        description={app.description}
        openGraph={{
          url: app.url,
          title: app.opengraph.title,
          type: 'website',
          description: app.description,
          images: [
            { url: app.opengraph.image, alt: app.opengraph.title, width: 300 },
          ],
          site_name: app.name,
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: app.url,
          handle: '@grascannabis',
        }}
      />
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
