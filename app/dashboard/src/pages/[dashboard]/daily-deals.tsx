import { showTime, type AppState, type WeedTextDeal } from '@cd/core-lib';
import {
	CurrencyName,
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
import Link from 'next/link';
import { connect } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { boolean, number } from 'yup';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryStaff;
	products: ProductWithDashboardDetails[];
	orders: OrderWithFullDetails[];
}

function DailyDealsPage({
	user,
	organization,
	products,
	orders,
}: DashboardProps) {
	const dailyDeals: WeedTextDeal[] = [
		{
			title: 'You dont want to miss this!',
			dealId: '123',
			startTime: new Date(),
			// set date for tomorrow
			endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
			products: [
				{
					name: 'Product 1',
					id: '1',
					sku: 1234567,
					organizationId: '1234',
					organizationName: 'Golden Nugget Dispensary',
					productId: '123',
					rating: 4.3,
					unit: 'g',
					size: 7,
					quantity: 1,
					basePrice: 3599,
					discount: 3,
					isDiscount: true,
					salePrice: 3499,
					currency: 'USD',
					stock: 100,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			subtotal: 19799,
		},
	];

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
				{dailyDeals.map((deal, index) => (
					<div
						key={`daily-deal-${index + 1}`}
						className="border rounded w-[386px] p-2"
					>
						{deal.title}
						<br />
						{'starts ' + showTime(deal.startTime)}
					</div>
				))}
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

export default connect(mapStateToProps)(DailyDealsPage);
