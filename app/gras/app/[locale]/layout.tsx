import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

import { NextIntlClientProvider } from "next-intl";
import {getLocale, getMessages} from 'next-intl/server';
import { BasicAppShell } from '@/components/BasicAppShell';
import { NextSeo } from 'next-seo';
import seoConfig from '@/lib/seo.config';
import { allLocales } from '@/lib/app';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  if (!allLocales.includes(locale)) notFound();


  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale} {...mantineHtmlProps}>
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
