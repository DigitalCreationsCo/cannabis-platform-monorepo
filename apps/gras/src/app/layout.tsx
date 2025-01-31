import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '@/lib/theme';

import { BasicAppShell } from '@/components/BasicAppShell';
import seoConfig from '@/lib/seo.config';
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = seoConfig
export const viewport: Viewport = {
	themeColor: '#000000',
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang={"en"} {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript forceColorScheme='light' />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <MantineProvider theme={theme} defaultColorScheme='light' forceColorScheme='light'>
            <BasicAppShell>
              {props.children}
            </BasicAppShell>
          </MantineProvider>
        </body>
      </html>
  );
}
