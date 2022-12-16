import Head from 'next/head';
import Link from 'next/link';
import { Page} from '@cd/shared-ui';
import prisma, {Organization, Product, Order, User} from "@cd/data-access"
import { GetServerSideProps } from 'next';

interface AdminDashboardProps {
    user: User;
  organization: Organization;
  products: Product[];
  orders: Order[];
}

export default function Dashboard({ user, organization, products, orders }) {
    return (
        <Page>
            <Head>
                <title>Cannabis Dispensary Vendor Experience</title>
                <meta name="vendor experience" content="Property of Gras Cannabis Co." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>logged in as { user.username }</div>
            <div>organization is { organization.name }</div>
        </Page>
    );
}

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', organizationId: '2' } }
    let { user } = session
    return user;
}
export async function getServerSideProps({req, res}) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=20, stale-while-revalidate=59"
    );

    let user = getUserInfo({req})
    let {organizationId} = user

    let organization = await prisma.organization.findUnique({ where: { id: organizationId } }) || {}
    let products:Product[] = []
    let orders:Order[] = []

    return {
        props: {
            user,
            organization,
            products,
            orders
    }}
}