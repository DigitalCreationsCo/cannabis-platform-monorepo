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
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { type RootState } from '../redux/store';

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

	const { lowStockVariants, totalVariants } = useProductVariants(products);

	const keyIndicatorsList = [
		{
			name: 'todays-orders',
			title: "Today's Orders",
			amount: todaysOrders.length,
		},
		{
			name: 'low-stock-variants',
			title: 'Low Stock Variants',
			amount: totalVariants.length,
		},
		{
			name: 'total-skus',
			title: 'Products',
			amount: lowStockVariants.length,
		},
		{ name: 'total-orders', title: 'Orders', amount: orders.length },
	];

	return (
		<Page className={twMerge('sm:px-4 !pt-0')}>
			<PageHeader
				iconColor={'primary'}
				title={`${organization.name}`}
				subTitle={`Dispensary`}
				Icon={Icons.ShoppingCartArrowUp}
			/>

			<H6 className="pb-2">{`Welcome, ${user.firstName}`}</H6>

			<Grid className="grid-cols-2 gap-4 md:grid-cols-3">
				{keyIndicatorsList.map((item) => (
					<Card
						className="col-span-auto md:!w-full lg:!w-full"
						amountClassName="text-primary"
						key={`key-indicator-${item.title}`}
						title={item.title}
						amount={item.amount}
					/>
				))}
			</Grid>

			<Grid title="Recent Orders">
				{todaysOrders.length > 0 ? (
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

			<Grid title="Low Stock Products" className="gap-2">
				{lowStockVariants.length > 0 ? (
					lowStockVariants.map((variant) => (
						<VariantRow key={variant.id} variant={variant} />
					))
				) : (
					<Card>There are no low stock products</Card>
				)}
			</Grid>
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
	showHeader: true,
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

export default connect(mapStateToProps)(Dashboard);
