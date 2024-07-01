import {
	type AppState,
	axios,
	dispensaryActions,
	urlBuilder,
} from '@cd/core-lib';
import { type Order } from '@cd/data-access';
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
import { DocumentIcon } from '@heroicons/react/24/outline';
import { type GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { twMerge } from 'tailwind-merge';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';
import env from '@/lib/env';

export default function Orders({ orders }: { orders: Order[] }) {
	const { t } = useTranslation();
	const { current, PaginationButtons } = usePagination(orders);
	// const { current: latestOrders } = usePagination(orders, 12);

	return (
		<div className={twMerge('bg-light lg:min-h-[710px] sm:px-4 md:pr-16')}>
			<PageHeader title="Orders" Icon={DocumentIcon} />

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

export async function getServerSideProps({
	query,
	req,
	locale,
	res,
}: GetServerSidePropsContext) {
	(req as any).query = query;
	const teamMember = await throwIfNoDispensaryAccess(req, res);

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
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
			orders: [],
		},
	};
}
