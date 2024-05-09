/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type AppState,
  axios,
  dispensaryActions,
  urlBuilder,
} from '@cd/core-lib';
import {
  Grid,
  H6,
  Icons,
  OrderRow,
  usePagination,
  Page,
  PageHeader,
  Row,
  type LayoutContextProps,
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';
import { wrapper } from '@/lib/store';

export default function Orders() {
  // const { orders } = useOrders();
  const orders: any[] = [];
  const { current, PaginationButtons } = usePagination(orders);
  // const { current: latestOrders } = usePagination(orders, 12);

  return (
    <div className={twMerge('bg-light lg:min-h-[710px] sm:px-4 md:pr-16')}>
      <PageHeader title="Orders" Icon={Icons.WatsonHealthDicomOverlay} />

      <Grid className="gap-2">
        <Row className="grid h-[44px] grid-cols-12">
          <H6 className="col-span-4">order</H6>
          <H6 className="col-span-4">status</H6>
          <H6 className="col-span-2">date of sale</H6>
          <H6 className="col-span-2 justify-self-end">total</H6>
        </Row>
        {current.length > 0 ? (
          <>
            {current.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                orderDetailsRoute="/orders"
              />
            ))}
            <PaginationButtons />
          </>
        ) : (
          <Row className="h-[77px]">There are no orders.</Row>
        )}
      </Grid>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }: any) => {
      // const response = await axios(urlBuilder.dashboard + '/api/orders', {
      // 	headers: {
      // 		'organization-id': query.dashboard,
      // 		Authorization: `Bearer ${session.getAccessToken()}`,
      // 	},
      // });

      // if (response.data.success === 'false')
      // 	throw new Error(response.data.error);

      // store.dispatch(
      // 	dispensaryActions.updateDispensaryOrders(response.data.payload),
      // );

      return {
        props: {},
      };
    }
);
