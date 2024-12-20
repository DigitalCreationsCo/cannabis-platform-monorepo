import "@/styles/globals.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import seoConfig from "../lib/seo.config";
import { SWRConfig } from "swr";
import { CacheProvider } from '@cd/core-lib/lib'
import { ToastProvider } from '@cd/ui-lib'

export interface SharedPageProps {
	draftMode: boolean;
	token: string;
	isRouteChanging?: boolean;
}

export default function App({ Component, ...appProps }: AppProps & { pageProps: SharedPageProps }) {
  const { pageProps } = appProps;
	const { session, ...props } = pageProps;

  return (
  <>
    <NextSeo {...seoConfig} />
    <SWRConfig value={{ revalidateOnFocus: false, provider: CacheProvider}}>
      <ToastProvider />
      <Component {...props} />
    </SWRConfig>
  </>
  )
}
