import { Button, Page, Paragraph } from '@cd/shared-ui';
import Head from 'next/head';

export default function MarketPlace({ host }) {
    const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || '';
    return (
        <Page>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Paragraph>
                {`Shopping App
            Env: APP_NAME: ${appName}
            Shopping at host: ${host}
            `}
            </Paragraph>
            <Paragraph>
                This page is the main shopping view. It displays a list of products and allows the user to add them to
                the cart. It also display list of nearby dispensaries and lets the user enter their storefront to view
                merchandise and content.
            </Paragraph>
            <Button>Hello</Button>
        </Page>
    );
}

export function getServerSideProps({ req }) {
    return {
        props: {
            host: req.headers.host
        }
    };
}
