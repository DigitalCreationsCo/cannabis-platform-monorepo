import { OrderWithDashboardDetails, OrganizationWithDashboardDetails, ProductWithDashboardDetails, UserDispensaryAdmin } from '@cd/data-access';
import { Card, Grid, Icons, OrderRow, Page, PageHeader, Paragraph } from '@cd/ui-lib';
import { orders, organization, products, userDispensaryAdmin as user } from 'data/dummyData';
import { NextRequest, NextResponse } from 'next/server';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductRow } from '../components';

interface DashboardProps {
    organization: OrganizationWithDashboardDetails;
    user: UserDispensaryAdmin;
    products: ProductWithDashboardDetails[];
    orders: OrderWithDashboardDetails[];
}

export default function Dashboard({ user, organization, products, orders }: DashboardProps) {
    
    const 
    todaysOrders = useMemo(() => orders.filter((order) => {
        return (
            new Date(order.createdAt).getFullYear === new Date().getFullYear &&
            new Date(order.createdAt).getMonth() === new Date().getMonth() &&
            new Date(order.createdAt).getDate() === new Date().getDate()
        );
    }), []);

    const { lowStockVariants, totalVariants } = useProductVariants(products)

    const 
    keyIndicatorsList = [
        { name: 'todays-orders', title: "Today's Orders", amount: todaysOrders.length },
        { name: 'total-orders', title: 'Orders', amount: orders.length },
        { name: 'low-stock-variants', title: 'Low Stock Variants', amount: totalVariants.length },
        { name: 'total-skus', title: 'Products', amount: lowStockVariants.length },
    ];

    return (
        <Page className={twMerge("sm:px-4 md:pt-0 md:pr-16")}>
            <PageHeader
                title={`${organization.name}`}
                subTitle={`storefront dashboard`}
                Icon={Icons.ShoppingCartArrowUp}
            />

            <Paragraph>
                {`Welcome, ${user.firstName}`}</Paragraph>

            <Grid className='grid-cols-2 lg:grid-cols-3 gap-4'>
                {keyIndicatorsList.map((item, ind) => (
                    <Card
                    className="md:!w-full"
                    key={`key-indicator-${item.title}`} 
                    title={item.title} 
                    amount={item.amount} 
                    />
                ))}
            </Grid>
            
            <Grid title="Recent Orders">
                { todaysOrders.length > 0 ? (
                    todaysOrders.map((order) => (
                        <OrderRow 
                        key={order.id} 
                        order={order} 
                        orderDetailsRoute="/orders" 
                        />
                    ))
                ) : (
                    <Card>There are no orders today.</Card>
                )}
            </Grid>

            <Grid title="Low Stock Products" className='gap-2'>
                {lowStockVariants.length > 0 ? (
                    lowStockVariants.map(variant =>
                        <ProductRow 
                        key={variant.id} 
                        variant={variant} />
                    )
                ) : (
                    <Card>There are no low stock products</Card>
                )}
            </Grid>
            
            {/* <Grid title="Orders">
                {orders.map((order) => (
                    <OrderRow order={order} key={order.id} orderDetailsRoute="/orders" />
                ))}
            </Grid> */}

            {/* <Grid title="Products">
                {products.map((product) => (
                    <ProductRow key={product.id} product={product} />
                ))}
            </Grid> */}

            
        </Page>
    );
}

function useProductVariants (products: ProductWithDashboardDetails[]) {

    const 
    lowStockThreshold = 7;

    const 
    _totalVariants = products.map((product: ProductWithDashboardDetails) => product.variants).flat();

    const
    _lowStockVariants = _totalVariants.filter(variant => variant.stock < lowStockThreshold)

    return {
        totalVariants: _totalVariants,
        lowStockVariants: _lowStockVariants
    }
}

export async function getServerSideProps({ req, res }: { req: NextRequest, res: NextResponse }) {
    return {
        props: { 
            user: dateToString(user), 
            organization: dateToString(organization), 
            products: dateToString(products) || [], 
            orders: dateToString(orders) || [], 
        }
    };
}

export function dateToString(doc: any) {
    
    if (doc != null || doc != undefined) {
        
        Object.keys(doc).forEach((key) => {
            // console.log("key pair: ", doc[key]); 
            if (typeof doc[key] === 'object' && doc[key] !== null)
                // console.log("object found: ", key);
                dateToString(doc[key]);
            if (key === 'scannedDOB' ||
                key === 'createdAt' ||
                key === 'updatedAt' ||
                key === 'deliveredAt')
                doc[key] = JSON.parse(JSON.stringify(doc[key]));
        });
    }
    return doc;
}

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
        
//     } 
//     catch (error) {

//         console.log('SSR error: ', error.message);

//         if (error.type === Session.Error.TRY_REFRESH_TOKEN)
//         return { props: { fromSupertokens: 'needs-refresh' } }
//         else 
//         if (error.type === Session.Error.UNAUTHORISED)
//         console.log('unauthorized error: ', error);
//         return res.status(200).json({ status: false, error });
//         else 
//         return { redirect: { destination: '/welcome', permanent: false } };
//     }
// }


// add redux wrapper.getServerSideProps
// seed dispensary data
// handle dispensary data in dashboard using redux ( use redux to store only data that is needed for server requests (org data))
// fix dispensary create and sign in