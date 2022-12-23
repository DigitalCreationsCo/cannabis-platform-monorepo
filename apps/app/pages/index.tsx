import Head from 'next/head';
import { useMemo } from 'react';
import { Page, Card, Grid, OrderRow, Center, LoadingDots} from '@cd/shared-ui';
import prisma, {Organization, Product, Order, User} from "@cd/data-access"
import { PageHeader, ProductRow } from "components"
import { Icons } from '@cd/shared-ui';
import SessionReact, { useSessionContext } from "supertokens-auth-react/recipe/session";
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'
import { PropsWithChildren, useState } from 'react';
import {Layout} from "components";

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
                <title>Gras Cannabis</title>
                <meta name="vendor experience application" content="Property of Gras Cannabis Co." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader
                title={`${organization.name} Dashboard`}
                subTitle={ `Hi, ${user.firstName}` }
                Icon={Icons.ShoppingBagOutlined}
            />

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

    // return (
    //     <>
    //         <div>Private route: Dashboard Page</div>
    //         <button onClick={ async () => {
    //             await SessionReact.signOut();
    //         } }>sign out</button>
            
    //         <div>Hello, { session.userId }! You are logged in.</div>
    //         <div>Access token payload: { JSON.stringify(session.accessTokenPayload) }</div>
    //         <button 
    //             onClick={ fetchUserData }
    //         >fetch user api</button>
    //     </>
    // )
}

const getUserInfo = ({ req }) => {
    // let user = req.session?.user
    const session = { user: { username: 'kbarnes', firstName: 'Katie', lastName: 'Barnes', organizationId: '2' } }
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

// export default function SessionControl ({ user,
//             organization,
//             products,
//             orders, children }:PropsWithChildren):JSX.Element {
//     const session = useSessionContext()

//     // export this from session control context
//     async function logoutClicked() {
//         await SessionReact.signOut();
//         SuperTokensReact.redirectToAuth();
//     }

//      async function fetchUserData() {
//         const res = await fetch("/api/user");
//         if (res.status === 200) {
//             const json = await res.json();
//             // add user to app state here
//             alert(JSON.stringify(json));
//         }
//      }
    
//     if (session.loading === true) {
//         return <LoadingDots />
//     }

//     if (!session.doesSessionExist) {
//         return (
//             <Page className="flex border">
//                 <Center>Please login to view this page</Center>
//                 <button onClick={() => SuperTokensReact.redirectToAuth({ show: 'signin' })}>sign in</button>
//             </Page>
//         )
//     }

//     return (
//         <SessionReact.SessionAuth>
//             <{children}>
//         </SessionReact.SessionAuth>
//     );
// };