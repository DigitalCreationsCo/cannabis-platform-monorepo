import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { Page, Span, H3, H6, Card, Paragraph, Grid } from '@cd/shared-ui';
import prisma, {Organization, Product, Order, User} from "@cd/data-access"
import { GetServerSideProps } from 'next';
import { Small } from '@cd/shared-ui';
import { Tiny } from '@cd/shared-ui';

interface AdminDashboardProps {
    user: User;
    organization: Organization;
    products: Product[];
    orders: Order[];
}

export default function Dashboard({ user, organization, products, orders }) {

    const todaysOrders = useMemo(() => {
    const todaysOrders = Array.isArray(orders)
      ? orders.filter((order) => {
          return (
            new Date(order.createdAt).getFullYear === new Date().getFullYear &&
            new Date(order.createdAt).getMonth() === new Date().getMonth() &&
            new Date(order.createdAt).getDate() === new Date().getDate()
          );
        })
      : [];
    return todaysOrders;
    }, []);
    
    const cardList = [
    { title: "Total Products", amount: products.length },
    { title: "Total Orders", amount: orders.length },
    { title: "Today's Orders", amount: todaysOrders.length },
    ];
    
    return (
        <Page>
            <Head>
                <title>Cannabis Dispensary Vendor Experience</title>
                <meta name="vendor experience" content="Property of Gras Cannabis Co." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <H3>{ organization.name }</H3>
            <Span className='pl-1'>Hi, { user.username }</Span>

            <Grid>
                {cardList.map((item, ind) => (
                    <Card key={`cardlist-${ind}`} title={item.title} amount={item.amount} />
                )) }
            </Grid>

            <H6>Orders</H6>
            <Paragraph>Orders</Paragraph>
            <Small>Orders</Small>
            <Span>Orders</Span>
            <Tiny>Orders</Tiny>
            { orders.map((item, ind) => (
                <div>{ind}</div>
                // <OrderRow item={item} key={item._id} orderDetailsRoute="/admin/orders" />
            )) }

            Products
            { products.map((item, ind) => (
                <div>{ind}</div>
                // <OrderRow item={item} key={item._id} orderDetailsRoute="/admin/orders" />
            )) }

            {/* {todaysOrders.map((item) => (
                <OrderRow item={item} key={item._id} orderDetailsRoute="/admin/orders" />
            )) } */}

            {/*                 
                {stockOutProducts.length > 0 && (
                <Grid item xs={12}>
                <Card sx={{ p: "20px 30px" }}>
                    <H5 mb={3}>Stock Out Products</H5>
                    {stockOutProducts.map((item) => (
                    <ProductRow product={item} key={item._id} />
                    ))}
                </Card>
                </Grid>
            )} */}
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

    // let organization = await prisma.organization.findUnique({ where: { id: organizationId } }) || {}
    let products = await prisma.product.findMany({ where: { organizationId }}) || []
    let orders:Order[] = await prisma.order.findMany({ where: { organizationId }}) || []

    return {
        props: {
            user,
            organization,
            products,
            orders
    }}
}