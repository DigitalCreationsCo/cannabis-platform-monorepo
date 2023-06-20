import { usePagination } from '@cd/core-lib';
import { OrderWithDashboardDetails } from '@cd/data-access';
import { Card, Grid, H6, Icons, OrderRow, Page, PageHeader, Row } from '@cd/ui-lib';
import { orders, organization, products, userDispensaryAdmin as user } from 'data/dummyData';
import { dateToString } from 'pages/dashboard';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface OrdersDashboardProps {
    orders: OrderWithDashboardDetails[];
}

export default function Orders({ orders }: OrdersDashboardProps) {

    const [currentPage, setCurrentPage] = useState(1);
    
    const 
    currentOrders = usePagination(currentPage, orders);

    return (
        <Page className={twMerge("sm:px-4 md:pr-16")}>

            <PageHeader 
            title="Orders" 
            Icon={Icons.DeliveryTruck} 
            />

            <Grid className='gap-2'>
                <Row className="h-[44px]">
                    
                    <H6 className="w-[100px]">
                        order</H6>
                    <H6 className="grow">
                        status</H6>
                    <H6 className="w-[99px] sm:w-[168px] flex justify-left">
                        date of sale</H6>
                    <H6 className="w-[80px] flex justify-left">
                        total</H6>
                    <div className="hidden sm:block w-[15px]"></div>
                    
                </Row>

                {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                        <OrderRow 
                        key={order.id} 
                        order={order} 
                        orderDetailsRoute="/orders" 
                        />
                    ))
                ) : (
                    <Card>There are no orders.</Card>
                )}
                
            </Grid>

        </Page>
    );
}

export async function getServerSideProps({ req }: { req: any }) {
    // const orders: Order[] = await (
    //     await fetch(urlBuilder.dashboard + '/api/orders', {
    //         headers: {
    //             Cookie: req.headers.cookie
    //         }
    //     })
    // ).json();

    return {
        props: { 
            user: dateToString(user), 
            organization: dateToString(organization), 
            products: dateToString(products) || [], 
            orders: dateToString(orders) || [], 
        }
    };
}
