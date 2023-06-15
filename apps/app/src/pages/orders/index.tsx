import { urlBuilder, usePagination } from '@cd/core-lib';
import { Order } from '@cd/data-access';
import { Card, Grid, H6, Icons, OrderRow, Page, PageHeader, Row } from '@cd/ui-lib';
import { useState } from 'react';

interface OrdersDashboardProps {
    orders: Order[];
}

export default function Orders({ orders }: OrdersDashboardProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const currentOrders = usePagination(currentPage, orders);

    return (
            <Page>
                <PageHeader title="Orders" Icon={Icons.ShoppingBagOutlined} />
                <Grid>
                    <Row>
                        <H6 className="w-[100px]">Order #</H6>
                        <H6 className="grow">Status</H6>
                        <H6 className="w-[140px] flex justify-center">Date purchased</H6>
                        <H6 className="w-[80px] flex justify-center">Total</H6>
                        <div className="w-[20px]"></div>
                    </Row>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                            <OrderRow order={order} key={order.id} orderDetailsRoute="/orders" />
                        ))
                    ) : (
                        <Card>There are no orders.</Card>
                    )}
                </Grid>

                {/* <FlexBox justifyContent="center" mt={5}>
          <Pagination
            color="primary"
            variant="outlined"
            count={Math.ceil(orders.length / 10)}
            onChange={(_, value) => setCurrentPage(value)}
          />
        </FlexBox> */}
            </Page>
    );
}

export async function getServerSideProps({ req }: { req: any }) {
    const orders: Order[] = await (
        await fetch(urlBuilder.dashboard + '/api/orders', {
            headers: {
                Cookie: req.headers.cookie
            }
        })
    ).json();
    return {
        props: {
            orders
        }
    };
}
