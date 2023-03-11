import { Grid, Page, Paragraph } from '@cd/shared-ui';
import Head from 'next/head';
import { CategoriesSelector, DispensaryList } from '../src/components';

const organizationsListDummy = [
    { name: 'Curaleaf', id: '234' },
    { name: 'Sunnyside', id: '345' },
    { name: 'McNuggz', id: '456' }
];

export default function MarketPlace({ host }) {
    const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || '';
    return (
        <Page className="">
            <Head>
                a<title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid className="space-y-5">
                <DispensaryList title={'Dispensaries Near You'} list={organizationsListDummy} />
                <CategoriesSelector />
            </Grid>
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
            {/* <Paragraph>
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
            <Paragraph>
                This page is the main shopping view. It displays a list of products and allows the user to add them to
                the cart. It also display list of nearby dispensaries and lets the user enter their storefront to view
                merchandise and content.
            </Paragraph>
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
            </Paragraph> */}
        </Page>
    );
}

export async function getServerSideProps({ req }) {
    // const organizations_local = await prisma.organization.findMany({
    //     where: {}
    // });
    return {
        props: {
            host: req.headers.host
        }
    };
}
