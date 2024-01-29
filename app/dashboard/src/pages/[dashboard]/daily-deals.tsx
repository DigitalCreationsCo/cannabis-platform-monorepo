/* eslint-disable sonarjs/no-duplicated-branches */
import {
	axios,
	modalActions,
	modalTypes,
	showDay,
	showTime,
	urlBuilder,
	useAppDispatch,
	type AppState,
	type ResponseDataEnvelope,
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
	FlexBox,
	Grid,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import NodeCache from 'node-cache';
import { connect } from 'react-redux';
import { wrapper } from 'store';
import Supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import { twMerge } from 'tailwind-merge';
import { backendConfig } from 'config/backendConfig';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryStaff;
	products: ProductWithDashboardDetails[];
	orders: OrderWithFullDetails[];
	dailyDeals: DailyDeal[];
}

const cache = new NodeCache({ stdTTL: 30 });

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
			<Grid className="flex grow flex-col md:flex-row gap-2 flex-wrap">
				{dailyDeals?.length ? (
					dailyDeals.map((deal, index) => (
						<div
							key={`daily-deal-${index + 1}`}
							className="border rounded w-[386px] p-2"
						>
							<FlexBox className="w-full flex-row justify-between">
								<Paragraph>
									{deal.title}
									<br />
									{`starts ${showTime(deal.startTime)} ${showDay(
										deal.startTime,
									)}`}
								</Paragraph>
								<FlexBox>
									<Paragraph className="text-red-800">
										{deal.isExpired ? 'expired' : 'active'}
									</Paragraph>
								</FlexBox>
							</FlexBox>
						</div>
					))
				) : (
					<Paragraph>You have no deals. Try adding one.</Paragraph>
				)}
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

			<DailyDeals />
			<hr />
			<SendCustomerReferralLink />
		</Page>
	);
}

function SendCustomerReferralLink() {
	return (
		<div>
			<Paragraph>
				{`Send your customers a referral link to share with their friends. When their friends
				place their first order, your customer will receive a $10 credit to their account.`}
			</Paragraph>
			<Button
				className="px-4 bg-inverse active:bg-accent-soft"
				hover="accent-soft"
			>
				Send Referral Link
			</Button>
		</div>
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
		async ({ query, req, res }: any) => {
			res.setHeader('Cache-Control', 'private, s-maxage=120');

			if (!query.dashboard) throw new Error();

			Supertokens.init(backendConfig());

			let dailyDeals;
			let session;

			try {
				session = await Session.getSession(req, res, {
					overrideGlobalClaimValidators: () => {
						// this makes it so that no custom session claims are checked
						return [];
					},
				});

				if (cache.has(`daily-deals/${query.dashboard}`)) {
					dailyDeals = cache.get(`daily-deals/${query.dashboard}`);
				} else {
					const response = await axios.get<ResponseDataEnvelope<DailyDeal[]>>(
						urlBuilder.dashboard + '/api/daily-deals',
						{
							headers: {
								'organization-id': query.dashboard,
								Authorization: `Bearer ${session.getAccessToken()}`,
							},
						},
					);

					if (!response.data.success || response.data.success === 'false')
						throw new Error(response.data.error);

					dailyDeals = response.data.payload;
					cache.set(`daily-deals/${query.dashboard}`, dailyDeals, 120);
				}
				return {
					props: { dailyDeals },
				};
			} catch (err) {
				console.log('DailyDealsPage: ', err);

				if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
					// in this case, the session is still valid, only the access token has expired.
					// The refresh token is not sent to this route as it's tied to the /api/auth/session/refresh API paths.
					// So we must send a "signal" to the frontend which will then call the
					// refresh API and reload the page.

					return { props: { fromSupertokens: 'needs-refresh' } };
					// or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
				} else if (err.type === Session.Error.UNAUTHORISED) {
					// in this case, there is no session, or it has been revoked on the backend.
					// either way, sending this response will make the frontend try and refresh
					// which will fail and redirect the user to the login screen.
					return { props: { fromSupertokens: 'needs-refresh' } };
				}

				throw err;

				return {
					notFound: true,
				};
			}
		},
);

export default connect(mapStateToProps)(DailyDealsPage);
