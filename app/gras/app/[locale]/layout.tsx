import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

import { NextIntlClientProvider, useMessages } from "next-intl";
import { BasicAppShell } from '@/components/BasicAppShell';
import { NextSeo } from 'next-seo';
import seoConfig from '@/lib/seo.config';
import { allLocales } from '@/lib/app';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  if (!allLocales.includes(props.params.locale)) notFound();
  const messages = useMessages();

  return (
    <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
          >
      <html lang={props.params.locale} {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript forceColorScheme='light' />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
        </head>
        <body>
          <MantineProvider theme={theme} defaultColorScheme='light' forceColorScheme='light'>
            <NextSeo {...seoConfig} />
            <BasicAppShell>
              {props.children}
            </BasicAppShell>
          </MantineProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
