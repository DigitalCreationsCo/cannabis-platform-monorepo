/* eslint-disable @typescript-eslint/no-unused-vars */
import { wrapper } from '@/lib/store';
import {
	type AppState,
	axios,
	dispensaryActions,
	urlBuilder,
} from '@cd/core-lib';
import {
	Grid,
	H6,
	Icons,
	OrderRow,
	usePagination,
	Page,
	PageHeader,
	Row,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

export default function Orders() {
	const { t } = useTranslation();
	// const { orders } = useOrders();
	const orders: any[] = [];
	const { current, PaginationButtons } = usePagination(orders);
	// const { current: latestOrders } = usePagination(orders, 12);

	return (
		<div className={twMerge('bg-light lg:min-h-[710px] sm:px-4 md:pr-16')}>
			<PageHeader title="Orders" Icon={Icons.WatsonHealthDicomOverlay} />

			<Grid className="gap-2">
				<Row className="grid h-[44px] grid-cols-12">
					<H6 className="col-span-4">{t('order')}</H6>
					<H6 className="col-span-4">{t('status')}</H6>
					<H6 className="col-span-2">{t('date')}</H6>
					<H6 className="col-span-2 justify-self-end">{t('total')}</H6>
				</Row>
				{current.length > 0 ? (
					<>
						{current.map((order) => (
							<OrderRow
								key={order.id}
								order={order}
								orderDetailsRoute="/orders"
							/>
						))}
						<PaginationButtons />
					</>
				) : (
					<Row className="h-[77px]">{`There are no orders.`}</Row>
				)}
			</Grid>
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ query, req, res }: any) => {
			// const response = await axios(urlBuilder.dashboard + '/api/orders', {
			// 	headers: {
			// 		'organization-id': query.dashboard,
			// 		Authorization: `Bearer ${session.getAccessToken()}`,
			// 	},
			// });

			// if (response.data.success === 'false')
			// 	throw new Error(response.data.error);

			// store.dispatch(
			// 	dispensaryActions.updateDispensaryOrders(response.data.payload),
			// );

			return {
				props: {},
			};
		},
);
