import { Grid, Page } from '@cd/ui-lib';
import { NodeNextRequest } from 'next/dist/server/base-http/node';
import Head from 'next/head';

interface StorefrontProps {
    // organization: OrganizationWithShopDetails
    organization: { name: string }
}

export default function StoreFront({
    organization
    // products, categories
}: StorefrontProps) {

    
    return (
        <Page>
            <Head>
                <title>{organization.name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid>Welcome to {organization.name} storefront</Grid>
        </Page>
    );
}

export async function getServerSideProps({ req }: { req: NodeNextRequest }) {
    // const subDomain = await prisma.subDomain.findUnique({
    //     where: {
    //         id: req.headers.host
    //     },
    //     include: {
    //         organization: {
    //             include: {
    //                 address: true,
    //                 products: true,
    //                 images: true,
    //                 siteSetting: true,
    //                 categoryList: true
    //             }
    //         }
    //     }
    // });

    // if (!subDomain) {
    //     return {
    //         props: {
    //             error: 'The domain was not registered in the app'
    //         }
    //     };
    // }

    // return {
    //     props: {
    //         organization: subDomain.organization,
    //         products: subDomain.organization.products
    //     }
    // };
    return { props: { organization: req.headers.host } };
}
