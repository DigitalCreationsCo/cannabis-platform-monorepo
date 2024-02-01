import {
	type AppState,
	axios,
	dispensaryActions,
	urlBuilder,
} from '@cd/core-lib';
import { type OrderWithFullDetails } from '@cd/data-access';
import {
	Grid,
	Icons,
	Page,
	PageHeader,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { wrapper } from '../../../store';

interface TrackingProps {
	orders: OrderWithFullDetails[];
}

function DashboardTrackingPage({ orders }: TrackingProps) {
	if (!orders) throw new Error();

	const styles = {
		mapBox: 'w-90 h-90 border rounded',
	};
	return (
		<Page className={twMerge('lg:min-h-[710px] sm:px-4 md:pr-16')}>
			<PageHeader title="Tracking" Icon={Icons.DeliveryTruck} />
			<Grid className="gap-2">
				<div className={twMerge(styles.mapBox)}></div>
			</Grid>
		</Page>
	);
}

DashboardTrackingPage.getLayoutContext = (): LayoutContextProps => ({
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
