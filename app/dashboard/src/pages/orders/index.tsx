/* eslint-disable @typescript-eslint/no-unused-vars */
import { dateToString, usePagination } from '@cd/core-lib';
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
} from '@cd/ui-lib';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	orders,
	organization,
	products,
	userDispensaryAdmin as user,
} from '../../data/dummyData';

interface OrdersDashboardProps {
	orders: OrderWithDashboardDetails[];
}

export default function Orders({ orders }: OrdersDashboardProps) {
	const [currentPage, setCurrentPage] = useState(1);

	const currentOrders = usePagination(currentPage, orders);

	return (
		<Page className={twMerge('sm:px-4 md:pr-16')}>
			<PageHeader title="Orders" Icon={Icons.DeliveryTruck} />

			<Grid className="gap-2">
				<Row className="h-[44px]">
					<H6 className="w-[100px]">order</H6>
					<H6 className="grow">status</H6>
					<H6 className="justify-left flex w-[99px] sm:w-[168px]">
						date of sale
					</H6>
					<H6 className="justify-left flex w-[80px]">total</H6>
					<div className="hidden w-[15px] sm:block"></div>
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

export async function getServerSideProps({ req }: { req: any }) {
	try {
		// const orders: Order[] = await (
		//     await fetch(urlBuilder.dashboard + '/api/orders', {
		//         headers: {
		//             Cookie: req.headers.cookie
		//         }
		//     })
		// ).json();

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
