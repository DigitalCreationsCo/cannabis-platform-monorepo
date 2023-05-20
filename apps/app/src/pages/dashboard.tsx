import { Order, Organization, ProductWithDetails, UserWithDetails } from '@cd/data-access';
import { Card, Grid, Icons, OrderRow, Page, PageHeader } from '@cd/ui-lib';
import { ProductRow, ProtectedPage } from 'components';
import { useMemo } from 'react';

interface DashboardProps {
    user: UserWithDetails;
    organization: Organization;
    products: ProductWithDetails[];
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

    const lowStockVariants = findLowStockVariants(products);
    const cardList = [
        { title: 'Total Products', amount: products.length },
        { title: 'Total Orders', amount: orders.length },
        { title: "Today's Orders", amount: todaysOrders.length }
    ];

    return (
        <ProtectedPage>
            <Page>
                <PageHeader
                    title={`${organization?.name} Dashboard`}
                    subTitle={`Welcome, ${user.firstName}`}
                    Icon={Icons.ShoppingBagOutlined}
                />

                <Grid>
                    {cardList.map((item, ind) => (
                        <Card key={`cardlist-${ind}`} title={item.title} amount={item.amount} />
                    ))}
                </Grid>

                <Grid title="Orders">
                    {orders.map((order) => (
                        <OrderRow order={order} key={order.id} orderDetailsRoute="/orders" />
                    ))}
                </Grid>

                <Grid title="Products">
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </Grid>

                <Grid title="Recent Orders">
                    {todaysOrders.length > 0 ? (
                        todaysOrders.map((order) => (
                            <OrderRow order={order} key={order.id} orderDetailsRoute="/orders" />
                        ))
                    ) : (
                        <Card>There are no recent orders</Card>
                    )}
                </Grid>

                <Grid title="Low Stock Products">
                    {lowStockVariants.length > 0 ? (
                        lowStockVariants.map((product) =>
                            product.variants.map((variant) => (
                                <ProductRow key={product.id} product={product} variant={variant} />
                            ))
                        )
                    ) : (
                        <Card>There are no low stock products</Card>
                    )}
                </Grid>
            </Page>
        </ProtectedPage>
    );
}

export const findLowStockVariants = (products) =>
    products.map((product) => {
        if (product.id && product.variants) {
            return {
                ...product,
                variants: product.variants.filter((variant) => {
                    return variant.stock < 7;
                })
            };
        } else return [];
    });

// export async function getServerSideProps({ req, res }) {
//     try {
//         return { redirect: { destination: '/welcome', permanent: false } };

//         const { session, user } = await getSession({ req, res });
//         if (!session || !user) {
//             console.log('No session or user');
//             return { redirect: { destination: '/welcome', permanent: false } };
//         }

//         const { organizationId } = user.memberships[0];
//         const organization = await (
//             await axios(urlBuilder.next + `/api/organization/${organizationId}`, {
//                 headers: {
//                     Cookie: req.headers.cookie
//                 }
//             })
//         ).data;
//         const products = await (
//             await axios(urlBuilder.next + '/api/products', {
//                 headers: {
//                     Cookie: req.headers.cookie
//                 }
//             })
//         ).data;
//         const orders = await (
//             await axios(urlBuilder.next + '/api/orders/', {
//                 headers: {
//                     Cookie: req.headers.cookie
//                 }
//             })
//         ).data;
//         if (!user || !organization || !products || !orders) {
//             return { notFound: true };
//         }
//         return {
//             props: { user, organization, products, orders }
//         };
//     } catch (error) {
//         console.log('SSR error: ', error.message);
//         if (error.type === Session.Error.TRY_REFRESH_TOKEN) {
//             console.log('needs refresh error: ', error);
//             return { props: { fromSupertokens: 'needs-refresh' } };
//         } else if (error.type === Session.Error.UNAUTHORISED) {
//             console.log('unauthorized error: ', error);
//             return res.status(200).json({ status: false, error });
//         } else return { redirect: { destination: '/welcome', permanent: false } };
//     }
// }
