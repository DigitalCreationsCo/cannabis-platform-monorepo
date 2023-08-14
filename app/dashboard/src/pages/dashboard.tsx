import { dateToString } from '@cd/core-lib';
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
import { twMerge } from 'tailwind-merge';
import {
	orders,
	organization,
	products,
	userDispensaryAdmin,
} from '../data/dummyData';
import { wrapper } from '../redux/store';

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

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context) => {
		try {
			context.res.setHeader(
				'Cache-Control',
				'public, s-maxage=10, stale-while-revalidate=59',
			);

			// call Promise.allSettled for all the data from server-main
			// (products, orders, site-settings)
			// OR handle it all async thunk, and insert in redux state? ;P

			return {
				props: {
					user: dateToString(userDispensaryAdmin),
					organization: dateToString(organization),
					products: dateToString(products) || [],
					orders: dateToString(orders) || [],
				},
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},
);

// export async function getServerSideProps(context) {
// 	try {
// 		context.res.setHeader(
// 			'Cache-Control',
// 			'public, s-maxage=10, stale-while-revalidate=59',
// 		);
// 		const response = await axios(urlBuilder.main.organizationById(user));

// 		// return res.status(response.status).json(response.data);
// 		// const order = await (
// 		//     await axios(urlBuilder.dashboard + `/api/orders/${params.id}`, {
// 		//         headers: {
// 		//             Cookie: req.headers.cookie
// 		//         }
// 		//     })
// 		// ).data;
// 		// if (!order) return { notFound: true };
// 		return {
// 			props: {
// 				user: dateToString(userDispensaryAdmin),
// 				organization: dateToString(organization),
// 				products: dateToString(products) || [],
// 				orders: dateToString(orders) || [],
// 			},
// 		};
// 	} catch (error: any) {
// 		console.info('Orders/[id] SSR error: ', error.message);
// 		throw new Error(error);
// 	}
// }

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

// export async function getServerSideProps() {
// 	try {
// 		// const order = await (
// 		//     await axios(urlBuilder.dashboard + `/api/orders/${params.id}`, {
// 		//         headers: {
// 		//             Cookie: req.headers.cookie
// 		//         }
// 		//     })
// 		// ).data;
// 		// if (!order) return { notFound: true };
// 		return {
// 			props: {
// 				user: dateToString(user),
// 				organization: dateToString(organization),
// 				products: dateToString(products) || [],
// 				orders: dateToString(orders) || [],
// 			},
// 		};
// 	} catch (error: any) {
// 		console.info('Orders/[id] SSR error: ', error.message);
// 		throw new Error(error);
// 	}
// }

Dashboard.getLayoutContext = (): LayoutContextProps => ({
	showHeader: true,
	showSideNav: true,
});
