import Head from 'next/head';

export default function Home() {
    const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || '';
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <p>Shopping App</p>
                Env: APP_NAME: {appName}
            </div>
        </>
    );
}
