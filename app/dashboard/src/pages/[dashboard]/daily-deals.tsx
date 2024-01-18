import { axios, showTime, urlBuilder, type AppState } from '@cd/core-lib';
import {
	type WeedTextDeal,
	type OrderWithFullDetails,
	type OrganizationWithDashboardDetails,
	type ProductWithDashboardDetails,
	type UserDispensaryStaff,
} from '@cd/data-access';
import {
	Button,
	Grid,
	Icons,
	Page,
	PageHeader,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { wrapper } from 'store';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryStaff;
	products: ProductWithDashboardDetails[];
	orders: OrderWithFullDetails[];
	dailyDeals: WeedTextDeal[];
}

function DailyDealsPage({
	user,
	organization,
	products,
	orders,
	dailyDeals,
}: DashboardProps) {
	// const dailyDeals: WeedTextDeal[] = [
	// 	{
	// 		title: 'You dont want to miss this!',
	// 		dealId: '123',
	// 		startTime: new Date(),
	// 		// set date for tomorrow
	// 		endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
	// 		products: [
	// 			{
	// 				name: 'Product 1',
	// 				id: '1',
	// 				sku: 1234567,
	// 				organizationId: '1234',
	// 				organizationName: 'Golden Nugget Dispensary',
	// 				productId: '123',
	// 				rating: 4.3,
	// 				unit: 'g',
	// 				size: 7,
	// 				quantity: 1,
	// 				basePrice: 3599,
	// 				discount: 3,
	// 				isDiscount: true,
	// 				salePrice: 3499,
	// 				currency: 'USD',
	// 				stock: 100,
	// 				createdAt: new Date(),
	// 				updatedAt: new Date(),
	// 			},
	// 		],
	// 		subtotal: 19799,
	// 	},
	// ];

	const DailyDeals = () => (
		<>
			{dailyDeals.length ? (
				dailyDeals.map((deal, index) => (
					<div
						key={`daily-deal-${index + 1}`}
						className="border rounded w-[386px] p-2"
					>
						{deal.title}
						<br />
						{'starts ' + showTime(deal.startTime)}
					</div>
				))
			) : (
				<></>
			)}
		</>
	);

	return (
		<Page className={twMerge('sm:px-4')}>
			<PageHeader
				iconColor={'primary'}
				title={`Daily Deals`}
				subTitle={`Campaigns`}
				Icon={Icons.CalendarAdd}
			>
				<Button
					className="px-4 bg-inverse active:bg-accent-soft place-self-start"
					hover="accent-soft"
				>
					+ new Daily Deal
				</Button>
			</PageHeader>
			<Grid className="mt-2 gap-2">
				<DailyDeals />
			</Grid>
		</Page>
	);
}

DailyDealsPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: true,
});

function mapStateToProps(state: AppState) {
	const { user, dispensary } = state;
	return {
		user: user.user as UserDispensaryStaff,
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
				const response = await axios.get(
					urlBuilder.dashboard + '/api/daily-deals',
					{
						headers: {
							'organization-id': query.dashboard,
						},
					},
				);
				if (!response.data.success || response.data.success === 'false')
					throw new Error(response.data.error);

				return {
					props: { dailyDeals: response.data.data },
				};
			} catch (error) {
				console.log(error);
				return {
					notFound: true,
				};
			}
		},
);

export default connect(mapStateToProps)(DailyDealsPage);
