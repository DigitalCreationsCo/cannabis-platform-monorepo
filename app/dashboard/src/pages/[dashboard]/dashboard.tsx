import {
	axios,
	dispensaryActions,
	TextContent,
	urlBuilder,
	usePagination,
} from '@cd/core-lib';
import {
	type OrderWithDashboardDetails,
	type OrganizationWithDashboardDetails,
	type ProductWithDashboardDetails,
	type UserDispensaryAdmin,
} from '@cd/data-access';
import {
	Card,
	Grid,
	H6,
	Icons,
	OrderRow,
	Page,
	PageHeader,
	VariantRow,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { FeatureConfig } from '../../config/dashboard.features';
import { wrapper, type RootState } from '../../redux/store';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryAdmin;
	products: ProductWithDashboardDetails[];
	orders: OrderWithDashboardDetails[];
}

function Dashboard({ user, organization, products, orders }: DashboardProps) {
	const todaysOrders = useMemo(
		() =>
			orders.filter((order) => {
				return (
					new Date(order.createdAt).getFullYear === new Date().getFullYear &&
					new Date(order.createdAt).getMonth() === new Date().getMonth() &&
					new Date(order.createdAt).getDate() === new Date().getDate()
				);
			}),
		[orders],
	);
	const { current: recentOrders } = usePagination(todaysOrders, 12);

	const { lowStockVariants, totalVariants } = useProductVariants(products);

	function getKeyIndicators() {
		const keyIndicatorsList = [
			{
				name: 'todays-orders',
				title: "Today's Orders",
				amount: todaysOrders.length,
				href: () => TextContent.href.orders_f(user.id),
				enabled: FeatureConfig.orders.enabled,
			},
			{
				name: 'low-stock-variants',
				title: 'Low Stock Variants',
				amount: totalVariants.length,
				href: () => TextContent.href.products_f(user.id),
				enabled: FeatureConfig.products.enabled,
			},
			{
				name: 'total-skus',
				title: 'Products',
				amount: lowStockVariants.length,
				href: () => TextContent.href.products_f(user.id),
				enabled: FeatureConfig.products.enabled,
			},
			{
				name: 'total-orders',
				title: 'Orders',
				amount: orders.length,
				href: () => TextContent.href.orders_f(user.id),
				enabled: FeatureConfig.orders.enabled,
			},
		];
		return keyIndicatorsList
			.filter((item) => item.enabled)
			.map((item) => (
				<Link href={item.href()} key={`key-indicator-${item.title}`}>
					<Card
						className="col-span-auto md:!w-full lg:!w-full"
						amountClassName="text-primary"
						title={item.title}
						amount={item.amount}
					/>
				</Link>
			));
	}

	return (
		<Page className={twMerge('sm:px-4')}>
			<PageHeader
				iconColor={'primary'}
				title={`${organization.name}`}
				subTitle={`Dispensary`}
				Icon={Icons.Home}
			/>

			<H6 className="pb-2">{`Welcome, ${user.firstName}`}</H6>

			<Grid className="grid-cols-2 gap-4 md:grid-cols-3">
				{getKeyIndicators()}
			</Grid>

			{FeatureConfig.orders.enabled ? (
				<Grid title="Recent Orders">
					{recentOrders.length > 0 ? (
						recentOrders.map((order) => (
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
			) : null}

			{FeatureConfig.products.enabled ? (
				<Grid title="Low Stock Products" className="gap-2">
					{lowStockVariants.length > 0 ? (
						lowStockVariants.map((variant) => (
							<VariantRow key={variant.id} variant={variant} />
						))
					) : (
						<Card>There are no low stock products</Card>
					)}
				</Grid>
			) : null}
		</Page>
	);
}

function useProductVariants(products: ProductWithDashboardDetails[]) {
	const lowStockThreshold = 7;

	const _totalVariants = products
		.map((product: ProductWithDashboardDetails) => product.variants)
		.flat();

	const _lowStockVariants = _totalVariants.filter(
		(variant) => variant.stock < lowStockThreshold,
	);

	return {
		totalVariants: _totalVariants,
		lowStockVariants: _lowStockVariants,
	};
}

Dashboard.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: RootState) {
	const { user, dispensary } = state;
	return {
		user: user.user,
		organization: dispensary.dispensary,
		products: dispensary.products,
		orders: dispensary.orders,
	};
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query }: any) => {
			try {
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
				console.log('Dashboard', error);
				return {
					notFound: true,
				};
			}
		},
);

export default connect(mapStateToProps)(Dashboard);
