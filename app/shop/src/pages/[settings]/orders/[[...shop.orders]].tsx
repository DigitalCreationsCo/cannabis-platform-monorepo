import {
	axios,
	TextContent,
	urlBuilder,
	usePagination,
	userActions,
} from '@cd/core-lib';
import { type OrderWithShopDetails } from '@cd/data-access';
import {
	Card,
	Grid,
	H2,
	H6,
	OrderRow,
	Page,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { wrapper } from '../../../redux/store';

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query }: any) => {
			try {
				if (!query.settings) throw new Error();
				const response = await axios.get(
					urlBuilder.shop + `/api/user/${query.settings}/orders`,
				);
				console.log('response: ', response.data);
				if (response.data.success === 'false')
					throw new Error(response.data.error);
				return {
					props: {
						user: { id: query.settings },
						orders: response.data.payload,
					},
				};
			} catch (error) {
				console.log(error);
				return {
					notFound: true,
				};
			}
		},
);

interface ShopOrdersProps {
	orders: OrderWithShopDetails[];
	user: { id: string };
}

function ShopOrders({ user, orders }: ShopOrdersProps) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(userActions.updateOrders(orders));
	}, [orders]);

	console.info('page props, orders: ', orders);
	const { current, PaginationButtons } = usePagination(orders);

	return (
		<Page className="pb-0 md:pb-24">
			<Card className="mx-auto">
				<H2 className="text-primary">{TextContent.account.MY_ORDERS}</H2>
				<Grid className="w-full gap-2">
					<Row className="grid h-[44px] grid-cols-12 border-none shadow-none drop-shadow-none">
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
									orderDetailsRoute={TextContent.href.orders_f(user.id)}
									className="border-none shadow-none drop-shadow-none"
								/>
							))}
							<PaginationButtons />
						</>
					) : (
						<Card className="w-full shadow-none drop-shadow-none">
							There are no orders.
						</Card>
					)}
				</Grid>
			</Card>
		</Page>
	);
}

ShopOrders.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ShopOrders;
