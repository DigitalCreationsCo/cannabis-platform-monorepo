import { NextSeo, type NextSeoProps } from 'next-seo';
import app from './app';

const SEOMetaTags = ({
  additionalMetaTags = [],
  openGraph = {},
  twitter = {},
  additionalKeywords = [],
  ...props
}: NextSeoProps & { additionalKeywords?: string[] }) => (
  <>
    {/* <link rel="manifest" href="/favicon/site.webmanifest" /> */}
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="msapplication-TileColor" content="#000000" />
    {/* <meta name="msapplication-config" content="/favicon/browserconfig.xml" /> */}
    <meta name="theme-color" content="#000" />

    <link
      rel="apple-touch-icon"
      sizes="57x57"
      key="57x57"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      key="60x60"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      key="72x72"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      key="76x76"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      key="114x114"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      key="120x120"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      key="144x144"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      key="152x152"
      href="/favicon.ico"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      key="180x180"
      href="/favicon.ico"
    />

    <link rel="icon" sizes="16x16" key="favicon-16x16" href="/favicon.ico" />
    <link rel="icon" sizes="32x32" key="favicon-32x32" href="/favicon.ico" />
    <link rel="icon" sizes="96x96" key="favicon-96x96" href="/favicon.ico" />
    <link
      rel="icon"
      sizes="192x192"
      key="android-chrome-192x192"
      href="/favicon.ico"
    />

    <meta charSet="utf-8" key="charSet" />

    <NextSeo
      title={props.title || app.name}
      description={props.description || app.description}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'keywords',
          content: [
            'weed',
            'cannabis',
            'delivery',
            'cannabis friendly events',
            'weed friendly events',
            'legal weed',
            'legal cannabis',
            'buy weed online',
            'cannabis delivery service',
            'cannabis delivery near me',
            'weed delivery',
            'weed delivery near me',
            'cannabis delivery new york',
            'weed delivery new york',
            ...additionalKeywords,
          ].join(', '),
        },
        ...additionalMetaTags,
      ]}
      openGraph={{
        ...app.opengraph,
        ...openGraph,
        images: [...(openGraph.images || []), ...app.opengraph.images],
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@gras_cannabis',
        handle: '@gras_cannabis',
        ...twitter,
      }}
      {...props}
    />
  </>
);
export default SEOMetaTags;
