/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	axios,
	dispensaryActions,
	urlBuilder,
	usePagination,
} from '@cd/core-lib';
import { type OrderWithDashboardDetails } from '@cd/data-access';
import {
	Grid,
	H6,
	Icons,
	OrderRow,
	Page,
	PageHeader,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { current } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { wrapper, type RootState } from '../../../redux/store';

interface TrackingProps {
	orders: OrderWithDashboardDetails[];
}

function DashboardTrackingPage({ orders }: TrackingProps) {
	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
			<PageHeader title="Tracking" Icon={Icons.DeliveryTruck} />

			<Grid className="gap-2"></Grid>
		</Page>
	);
}

DashboardTrackingPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: RootState) {
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
				if (query.dashboard === 'undefined')
					throw new Error('That info is not found. Please try again.');
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

export default connect(mapStateToProps)(DashboardTrackingPage);
