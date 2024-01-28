import {
	axios,
	modalActions,
	modalTypes,
	showTime,
	urlBuilder,
	useAppDispatch,
	type AppState,
} from '@cd/core-lib';
import {
	type DailyDeal,
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
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { connect } from 'react-redux';
import { wrapper } from 'store';
import { twMerge } from 'tailwind-merge';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryStaff;
	products: ProductWithDashboardDetails[];
	orders: OrderWithFullDetails[];
	dailyDeals: DailyDeal[];
}

// PAGES NEED BETTER ERROR HANDLING WHEN SERVICES ARE NOT AVAILABLE, OR AUTH FAILS

function DailyDealsPage(props: DashboardProps) {
	const { user, organization, products, orders, dailyDeals } = props;

	const dispatch = useAppDispatch();
	async function openNewDailyDealModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.NewDailyDealModal,
			}),
		);
	}
	const DailyDeals = () => (
		<>
			{dailyDeals?.length ? (
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
				<Paragraph>You have no deals. Try adding one.</Paragraph>
			)}
		</>
	);

	return (
		<Page className={twMerge('sm:px-4 pb-4 md:pb-24')}>
			<PageHeader
				iconColor={'primary'}
				title={`Daily Deals`}
				subTitle={`Deals are sent daily via text message`}
				Icon={Icons.Mobile}
			>
				<Button
					className="hidden md:block px-4 bg-inverse active:bg-accent-soft place-self-start"
					hover="accent-soft"
					onClick={openNewDailyDealModal}
				>
					new Daily Deal
				</Button>
			</PageHeader>
			<Grid className="flex grow gap-2">
				<DailyDeals />
			</Grid>
			<div>
				<Button
					className="md:hidden px-4 bg-inverse active:bg-accent-soft place-self-end self-end justify-self-end"
					hover="accent-soft"
					onClick={openNewDailyDealModal}
				>
					new Daily Deal
				</Button>
			</div>
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

				console.info('DailyDealsPage: ', response.data);
				return {
					props: { dailyDeals: response.data },
				};
			} catch (error) {
				console.log('DailyDealsPage: ', error);
				return {
					notFound: true,
				};
			}
		},
);

export default connect(mapStateToProps)(DailyDealsPage);
