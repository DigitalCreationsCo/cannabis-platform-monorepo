/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePagination } from '@cd/core-lib';
import { type OrderWithDashboardDetails } from '@cd/data-access';
import {
	Card,
	Grid,
	H6,
	Icons,
	OrderRow,
	Page,
	PageHeader,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { type RootState } from '../../redux/store';

interface OrdersDashboardProps {
	orders: OrderWithDashboardDetails[];
}

function Orders({ orders }: OrdersDashboardProps) {
	const [currentPage, setCurrentPage] = useState(1);

	const currentOrders = usePagination(currentPage, orders);

	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
			<PageHeader title="Orders" Icon={Icons.DeliveryTruck} />

			<Grid className="gap-2">
				<Row className="grid h-[44px] grid-cols-12">
					<H6 className="col-span-4">order</H6>
					<H6 className="col-span-4">status</H6>
					<H6 className="col-span-2">date of sale</H6>
					<H6 className="col-span-2 justify-self-end">total</H6>
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

Orders.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: RootState) {
	const { dispensary } = state;
	return {
		orders: dispensary.orders,
	};
}

export default connect(mapStateToProps)(Orders);
