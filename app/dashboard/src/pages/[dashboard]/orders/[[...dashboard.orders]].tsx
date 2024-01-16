/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	type AppState,
	axios,
	dispensaryActions,
	urlBuilder,
} from '@cd/core-lib';
import { type OrderWithFullDetails } from '@cd/data-access';
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
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { wrapper } from '../../../store';

interface OrdersDashboardProps {
	orders: OrderWithFullDetails[];
}

function Orders({ orders }: OrdersDashboardProps) {
	if (!orders) throw new Error();
	const { current, PaginationButtons } = usePagination(orders);

	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
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
		</Page>
	);
}

Orders.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: AppState) {
	const { dispensary } = state;
	return {
		orders: dispensary.orders,
	};
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query }: any) => {
			try {
				console.log('query', query);
				if (!query.dashboard) throw new Error();
				const response = await axios.get(urlBuilder.dashboard + '/api/orders', {
					headers: {
						'organization-id': query.dashboard,
					},
				});
				if (response.data.success === 'false')
					throw new Error(response.data.error);
				store.dispatch(
					dispensaryActions.updateDispensaryOrders(response.data.payload),
				);
				return {
					props: {},
				};
			} catch (error) {
				console.log(error);
				return {
					notFound: true,
				};
			}
		},
);

export default connect(mapStateToProps)(Orders);
