import Head from 'next/head';

export default function MarketPlace({ host }) {
    const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || '';
    return (
        <main>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>Shopping App</p>
            <p>Env: APP_NAME: {appName}</p>
            <p>Shopping at host: {host}</p>
            <p>
                {`This page is the main shopping view. 
                It displays a list of products and 
                allows the user to add them to the cart.
                It also display list of nearby dispensaries 
                and lets the user enter their storefront to 
                view merchandise and content.
                `}
            </p>
        </main>
    );
}

export function getServerSideProps({ req }) {
    console.log('host: ', req.headers.host);
    return {
        props: {
            host: req.headers.host
        }
    };
}
