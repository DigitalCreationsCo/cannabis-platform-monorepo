import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { Page, Span, H3, Card, Paragraph, Grid, OrderRow, } from '@cd/shared-ui';
import prisma, {Organization, Product, Order, User} from "@cd/data-access"
import { GetServerSideProps } from 'next';
import { ProductRow } from "components"

interface DashboardProps {
    user: User;
    organization: Organization;
    products: Product[];
    orders: Order[];
}

export default function Dashboard({ user, organization, products, orders }: DashboardProps) {

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
    
    const stockOutProducts = products.filter((product) => {
    return product.quantity === 0;
  });

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

            <Grid cols={ 1 } sm={ 2 }>
                {cardList.map((item, ind) => (
                    <Card key={`cardlist-${ind}`} title={item.title} amount={item.amount} />
                )) }
            </Grid>

            <Grid title="Orders">
            { orders.map((order) => (
                <OrderRow order={ order } key={ order.id } orderDetailsRoute="/orders" />
            )) }
            </Grid>

            <Grid title="Products">
            { products.map((product) => (
                <ProductRow key={ product.id } product={product} />
            )) }
            </Grid>

            <Grid title="Recent Orders">
            { todaysOrders.length > 0 ? todaysOrders.map((order) => (
                <OrderRow order={order} key={order.id} orderDetailsRoute="/orders" />
            )) : <Card>"There are no recent orders"</Card>}
            </Grid>
                            
            <Grid title="Out of Stock Products">
            { stockOutProducts.length > 0 && 
                stockOutProducts.map((product) => (
                <ProductRow key={ product.id } product={product} />
                ))
            }
            </Grid>
        </Page>
    );
}

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', organizationId: '2' } }
    let { user } = session
    return user;
}
export async function getServerSideProps({ req, res }) {
    
    let user = getUserInfo({req})
    let {organizationId} = user

    let organization = await prisma.organization.findUnique({ where: { id: organizationId }}) || {}
    let products = await prisma.product.findMany({ where: { organizationId }, orderBy: [ { rating: 'desc' },{ quantity: 'desc' }],include: { images: true}}) || []
    let orders:Order[] = await prisma.order.findMany({ where: { organizationId }, orderBy: [{id: 'desc'}]}) || []

    return {
        props: {
            user,
            organization,
            products,
            orders
    }}
}