import Head from 'next/head';
import { useMemo } from 'react';
import { Icons, Page, Card, Grid, OrderRow } from '@cd/shared-ui';
import prisma, {Organization, Product, Order, User} from "@cd/data-access"
import { PageHeader, ProductRow, ProtectedComponent } from "components"
import urlBuilder from '../src/utils/urlBuilder';

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
    
    const lowStockProducts = products.filter((product) => {
    return product.stock <= 6;
  });

    const cardList = [
    { title: "Total Products", amount: products.length },
    { title: "Total Orders", amount: orders.length },
    { title: "Today's Orders", amount: todaysOrders.length },
    ];
    

    return (
        <ProtectedComponent>
        <Page>
            <Head>
                <title>Gras Cannabis</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader
                title={`${organization.name} Dashboard`}
                subTitle={ `Hi, ${user.firstName}` }
                Icon={Icons.ShoppingBagOutlined}
            />

            <Grid>
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
            )) : <Card>There are no recent orders</Card>}
            </Grid>
                            
            <Grid title="Low Stock Products">
            { lowStockProducts.length > 0 && 
                lowStockProducts.map((product) => (
                <ProductRow key={ product.id } product={product} />
                ))
            }
            </Grid>
            </Page>
        </ProtectedComponent>
    );
}

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } }
    let { user } = session
    return user;
}

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    let user = getUserInfo({req})
    let {organizationId} = user

    let organization = await prisma.organization.findUnique({ where: { id: organizationId }}) || {}
    let products = await (await fetch(urlBuilder.next + '/api/products')).json()
    let orders = await (await fetch(urlBuilder.next + '/api/orders/')).json()
    return {
        props: {
            user,
            organization,
            products,
            orders,
        }
    };
}