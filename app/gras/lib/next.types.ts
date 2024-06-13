/* eslint-disable @typescript-eslint/naming-convention */
import { type NextPage } from 'next';
import { type Session } from 'next-auth';
import { type AppProps } from 'next/app';
import { type ReactElement, type ReactNode } from 'react';

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session?: Session;
  };
};

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
