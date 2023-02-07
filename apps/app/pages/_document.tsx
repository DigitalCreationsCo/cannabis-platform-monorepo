import Document, { Head, Html, Main, NextScript } from 'next/document';

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;
export default class MainDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
        };
    }

    render() {
        return (
            <Html data-theme="cannabis">
                <Head title="Gras Cannabis">
                    <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
                    <link rel="icon" href="/favicon.ico" />
                    {process.env.NODE_ENV !== 'production' && (
                        <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
                    )}
                </Head>
                {/* <Script
                    id="hide-error-overlay"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }}
                /> */}
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
