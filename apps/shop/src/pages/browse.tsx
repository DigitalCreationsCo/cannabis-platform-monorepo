import { selectSelectedLocationState, selectUserState } from '@cd/core-lib/src/reduxDir';
import { Grid, H3, Page, Paragraph } from '@cd/ui-lib';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Session from 'supertokens-node/recipe/session';
import { CategoriesSelector, DispensaryList } from '../components';

const organizationsListDummy = [
    { name: 'Curaleaf', subdomainId: 'curaleaf', id: '234' },
    { name: 'Sunnyside', subdomainId: 'sunnyside', id: '345' },
    { name: 'McNuggz', subdomainId: 'mcnuggz', id: '456' }
];

export default function MarketPlace({ host }: { host: string}) {
    const appName = process.env.NEXT_PUBLIC_SHOP_APP_NAME || '';

    const selectedLocation = useSelector(selectSelectedLocationState);

    const user = useSelector(selectUserState)
    const firstName = user?.user?.firstName
    
    return (
        <Page>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <H3 className='px-4'>Good day{firstName && `, ${ firstName}`}!</H3>
            <Grid className="space-y-5">
                <DispensaryList title={`Dispensaries Near You ( ${selectedLocation?.address?.city}, ${selectedLocation?.address?.state} )`} list={organizationsListDummy} />
                <CategoriesSelector />
            </Grid>
            <Paragraph>
                This page is the main shopping view. It displays a list of products and allows the user to add them to
                the cart. It also display list of nearby dispensaries and lets the user enter their storefront to view
                merchandise and content.
            </Paragraph>
        </Page>
    );
}

export async function getServerSideProps({ req, res }: any) {
    try {
        return {
            props: {
                host: req.headers.host
            }
        };
    } catch (error: any) {
        console.log('SSR error marketplace place: ', error.message);
        if (error.type === Session.Error.TRY_REFRESH_TOKEN) {
            return { props: { fromSupertokens: 'needs-refresh' } };
        } else if (error.type === Session.Error.UNAUTHORISED) {
            console.log('unauthorized error: ', error);
            return res.status(200).json({ status: false, error });
        } else return { notFound: true };
    }
}
