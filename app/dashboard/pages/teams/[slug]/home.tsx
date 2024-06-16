import { type TeamFeature, useDispensary } from '@cd/core-lib';
import {
	Card,
	Grid,
	LoadingPage,
	H6,
	Icons,
	OrderRow,
	usePagination,
	Page,
	PageHeader,
	VariantRow,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import type { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Error } from '@/components/shared';
import { AccessControl } from '@/components/shared/AccessControl';
import { RemoveTeam, TeamSettings, TeamTab } from '@/components/team';
import env from '@/lib/env';
import { type NextPageWithLayout } from '@/lib/next.types';

const Home: NextPageWithLayout<{
	teamFeatures: TeamFeature;
}> = ({ teamFeatures }: any) => {
	const { query } = useRouter();
	const { slug } = query as { slug: string };
	const { t } = useTranslation('common');
	const { isLoading, isError, team } = useDispensary();

	// const { orders } = useOrders();
	// const { current: latestOrders } = usePagination(orders, 12);
	// const { lowStockVariants, totalVariants } = useProductVariants(products);

	const orders: any[] = [];
	const latestOrders: any[] = [];
	const lowStockVariants: any[] = [];
	const totalVariants: any[] = [];

	const keyIndicators = [
		{
			name: 'todays-orders',
			title: "Today's Orders",
			amount: latestOrders.length,
			href: `/teams/${slug}/orders`,
		},
		{
			name: 'low-stock-variants',
			title: 'Low Stock Variants',
			amount: totalVariants.length,
			href: `/teams/${slug}/products`,
		},
		{
			name: 'total-skus',
			title: 'Products',
			href: `/teams/${slug}/products`,
			amount: lowStockVariants.length,
		},
		{
			name: 'total-orders',
			title: 'Orders',
			amount: orders.length,
			href: `/teams/${slug}/orders`,
		},
	];

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	if (!team) {
		return <Error message={t('team-not-found')} />;
	}

	return (
		<div>
			<PageHeader
				iconColor={'primary'}
				title={team.name}
				Icon={BuildingOfficeIcon}
			/>

			{/* <H6 className="pb-2">{`Welcome, ${user.firstName}`}</H6> */}

			<Grid className="grid-cols-2 gap-4 md:grid-cols-3">
				{keyIndicators.map((item) => (
					<Link href={item.href} key={`key-indicator-${item.title}`}>
						<Card
							className="col-span-auto md:!w-full lg:!w-full"
							amountClassName="text-primary"
							title={item.title}
							amount={item.amount}
						/>
					</Link>
				))}
			</Grid>

			<Grid title="Recent Orders">
				{latestOrders.length > 0 ? (
					latestOrders.map((order) => (
						<OrderRow
							key={order.id}
							order={order}
							orderDetailsRoute="/orders"
						/>
					))
				) : (
					<Card>{`There are no orders today.`}</Card>
				)}
			</Grid>

			<Grid title="Low Stock Products" className="gap-2">
				{lowStockVariants.length > 0 ? (
					lowStockVariants.map((variant) => (
						<VariantRow key={variant.id} variant={variant} />
					))
				) : (
					<Card>{`There are no low stock products`}</Card>
				)}
			</Grid>
		</div>
	);
};

export async function getServerSideProps({
	locale,
}: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			teamFeatures: env.teamFeatures,
		},
	};
}

export default Home;
