import app from '@/lib/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import colors from 'tailwindcss/colors';
import mixpanel from 'mixpanel-browser';

import '@boxyhq/react-ui/dist/style.css';
import '../styles/globals.css';
import '../styles/anim8-gradient.css';
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


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
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
      <NextSeo
      title={app.name}
      description={app.description}
      openGraph={{url: app.url, title: app.opengraph.title, type: 'website', description: app.description, images: [{url: app.opengraph.image, alt: app.name, width: 300}], site_name: app.name}}
      twitter={{cardType: 'summary_large_image', site: app.url, handle: '@grascannabis'}}
      />
      <SessionProvider session={session}>
        <Toaster toastOptions={{ duration: 4000 }} />
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
          {getLayout(<Component {...props} />)}
        </Themer>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation<never>(MyApp);
