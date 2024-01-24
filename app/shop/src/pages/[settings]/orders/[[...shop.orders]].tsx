import {
	axios,
	TextContent,
	urlBuilder,
	userActions,
	useAppDispatch,
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
	usePagination,
	type LayoutContextProps,
} from '@cd/ui-lib';
import NextCors from 'nextjs-cors';
import { useEffect } from 'react';
import Supertokens from 'supertokens-node';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { backendConfig } from '../../../config/backendConfig';
import { wrapper } from '../../../store';

if (typeof window === 'undefined') {
	Supertokens.init(backendConfig());
}

interface ShopOrdersProps {
	orders: OrderWithShopDetails[];
	user: { id: string };
}

function ShopOrders({ user, orders }: ShopOrdersProps) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(userActions.updateOrders(orders));
	}, [orders]);

	const { current, PaginationButtons } = usePagination(orders);

	return (
		<Page className="pb-0 md:pb-24">
			<Card className="mx-auto h-full">
				<H2 className="text-primary">{TextContent.account.MY_ORDERS}</H2>
				<Grid className="w-full gap-2">
					<Row className="grid h-[44px] grid-cols-12 border-none shadow-none drop-shadow-none">
						<H6 className="col-span-4">order</H6>
						<H6 className="col-span-4">status</H6>
						<H6 className="col-span-2">date</H6>
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

export const getServerSideProps = wrapper.getServerSideProps(
	() =>
		async ({ query, req, res }: { query: any; req: any; res: any }) => {
			try {
				await NextCors(req, res, {
					methods: ['GET'],
					origin: process.env.NEXT_PUBLIC_SHOP_APP_URL,
					credentials: true,
					allowedHeaders: ['content-type', ...Supertokens.getAllCORSHeaders()],
				});

				await superTokensNextWrapper(
					async (next) => {
						return await verifySession()(req, res, next);
					},
					req,
					res,
				);

				if (!query.settings) throw new Error('no query found');

				const response = await axios(
					urlBuilder.shop + `/api/user/${query.settings}/orders`,
					{ headers: { ...req.headers } },
				);
				if (response.data.success === 'false')
					throw new Error(response.data.error);

				return {
					props: {
						user: { id: query.settings },
						orders: response.data.payload,
					},
				};
			} catch (error) {
				return {
					notFound: true,
				};
			}
		},
);
