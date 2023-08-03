import { dateToString } from '@cd/core-lib';
import {
	OrderWithDashboardDetails,
	OrganizationWithDashboardDetails,
	ProductWithDashboardDetails,
	UserDispensaryAdmin,
} from '@cd/data-access';
import {
	Card,
	Grid,
	Icons,
	LayoutContextProps,
	OrderRow,
	Page,
	PageHeader,
	Paragraph,
	VariantRow,
} from '@cd/ui-lib';
import {
	orders,
	organization,
	products,
	userDispensaryAdmin as user,
} from 'data/dummyData';
import { NextRequest, NextResponse } from 'next/server';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryAdmin;
	products: ProductWithDashboardDetails[];
	orders: OrderWithDashboardDetails[];
}

export default function Dashboard({
	user,
	organization,
	products,
	orders,
}: DashboardProps) {
	const todaysOrders = useMemo(
		() =>
			orders.filter((order) => {
				return (
					new Date(order.createdAt).getFullYear === new Date().getFullYear &&
					new Date(order.createdAt).getMonth() === new Date().getMonth() &&
					new Date(order.createdAt).getDate() === new Date().getDate()
				);
			}),
		[],
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
				subTitle={`storefront dashboard`}
				Icon={Icons.ShoppingCartArrowUp}
			/>

			<Paragraph>{`Welcome, ${user.firstName}`}</Paragraph>

			<Grid className="grid-cols-2 md:grid-cols-3 gap-4">
				{keyIndicatorsList.map((item, ind) => (
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

export async function getServerSideProps({
	req,
	res,
}: {
	req: NextRequest;
	res: NextResponse;
}) {
	try {
		// const order = await (
		//     await axios(urlBuilder.dashboard + `/api/orders/${params.id}`, {
		//         headers: {
		//             Cookie: req.headers.cookie
		//         }
		//     })
		// ).data;
		// if (!order) return { notFound: true };
		return {
			props: {
				user: dateToString(user),
				organization: dateToString(organization),
				products: dateToString(products) || [],
				orders: dateToString(orders) || [],
			},
		};
	} catch (error: any) {
		console.info('Orders/[id] SSR error: ', error.message);
		throw new Error(error);
	}
}

// export async function getServerSideProps({ req, res }) {
//     try {
//         return { redirect: { destination: '/welcome', permanent: false } };

//         const { session, user } = await getSession({ req, res });
//         if (!session || !user) {
//             console.info('No session or user');
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

//         console.info('SSR error: ', error.message);

//         if (error.type === Session.Error.TRY_REFRESH_TOKEN)
//         return { props: { fromSupertokens: 'needs-refresh' } }
//         else
//         if (error.type === Session.Error.UNAUTHORISED)
//         console.info('unauthorized error: ', error);
//         return res.status(200).json({ status: false, error });
//         else
//         return { redirect: { destination: '/welcome', permanent: false } };
//     }
// }

// add redux wrapper.getServerSideProps
// seed dispensary data
// handle dispensary data in dashboard using redux ( use redux to store only data that is needed for server requests (org data))
// fix dispensary create and sign in

Dashboard.getLayoutContext = (): LayoutContextProps => ({
	showHeader: true,
	showSideNav: true,
});
