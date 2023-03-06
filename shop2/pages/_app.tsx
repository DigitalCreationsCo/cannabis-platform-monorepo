import Head from 'next/head';

export default function App({ Component, pageProps }): JSX.Element {
    return (
        <>
            <Head>
                <title>Gras Cannabis Marketplace</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
