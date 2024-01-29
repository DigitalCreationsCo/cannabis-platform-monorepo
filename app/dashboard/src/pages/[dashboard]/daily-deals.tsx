/* eslint-disable sonarjs/no-duplicated-branches */
import {
	applicationHeaders,
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
	TextField,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { backendConfig } from 'config/backendConfig';
import { useFormik } from 'formik';
import NodeCache from 'node-cache';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import { wrapper } from 'store';
import Supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

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
					className="md:hidden my-4 px-4 bg-inverse active:bg-accent-soft place-self-end self-end justify-self-end"
					hover="accent-soft"
					onClick={openNewDailyDealModal}
				>
					new Daily Deal
				</Button>
			</div>
		</>
	);

	return (
		<Page className={twMerge('lg:min-h-[710px] sm:px-4 pb-4 lg:pb-24')}>
			<PageHeader
				iconColor={'primary'}
				title={`Daily Deals`}
				subTitle={`Daily Deals are sent to customers text message`}
				Icon={Icons.Mobile}
			>
				<Button
					className="hidden my-4 md:block px-4 bg-inverse active:bg-accent-soft place-self-start"
					hover="accent-soft"
					onClick={openNewDailyDealModal}
				>
					new Daily Deal
				</Button>
			</PageHeader>

			<DailyDeals />
			<hr />
			<SendDailyDealsInviteForm />
		</Page>
	);
}

function SendDailyDealsInviteForm() {
	const [loadingButton, setLoadingButton] = useState(false);
	const initialValues: {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
	} = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
	};
	const {
		resetForm,
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema: yup.object().shape({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			phone: yup.string().required('Phone number is required'),
			email: yup.string().email().required('Email is required'),
		}),
	});
	function notifyValidation() {
		validateForm().then((errors) => {
			if (errors && Object.values(errors).length > 0) {
				toast.error(
					Object.values(errors)[0].toString() || 'Error sending invite link',
				);
			}
		});
	}
	async function onSubmit() {
		try {
			setLoadingButton(true);
			const response = await axios.post(
				urlBuilder.dashboard + '/api/daily-deals/contact',
				values,
				{
					headers: { ...applicationHeaders },
				},
			);

			if (!response.data.success || response.data.success === 'false')
				throw new Error(response.data.error);

			toast.success(`Sent invite link to ${values.firstName}`);
			setLoadingButton(false);
			resetForm();
		} catch (error: any) {
			console.error(error);
			setLoadingButton(false);
			toast.error(error.message);
		}
	}
	return (
		<div className="">
			<Paragraph>
				{/* {`Send your customers an invite link to share with their friends. When their friends
				place their first order, your customer will receive a $10 credit to their account.`} */}
				Send a customer an invite link to Daily Deals
			</Paragraph>
			<Grid className="grid-cols-2 max-w-lg">
				<TextField
					containerClassName="px-2 col-span-1"
					name="firstName"
					label="* first name"
					placeholder="first name"
					value={values?.firstName}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.firstName && !!errors.firstName}
					helperText={touched.firstName && errors.firstName}
				/>
				<TextField
					containerClassName="px-2 col-span-1"
					name="lastName"
					label="* last name"
					placeholder="last name"
					value={values?.lastName}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.lastName && !!errors.lastName}
				/>
				<TextField
					containerClassName="px-2 col-span-1"
					name="phone"
					label="* phone"
					placeholder="phone"
					value={values?.phone}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.phone && !!errors.phone}
				/>
				<TextField
					containerClassName="px-2 col-span-1"
					name="email"
					label="* email"
					placeholder="email"
					value={values?.email}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.email && !!errors.email}
				/>
			</Grid>
			<Button
				loading={loadingButton}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					notifyValidation();
					handleSubmit();
				}}
				className="mx-2 my-4 px-4 bg-inverse active:bg-accent-soft"
				hover="accent-soft"
			>
				Send Invite Link
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
	() =>
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

					// return { props: { fromSupertokens: 'needs-refresh' } };
					return { props: { dailyDeals: [] } }; // this works offline
					// or return {fromSupertokens: 'needs-refresh'} in case of getInitialProps
				} else if (err.type === Session.Error.UNAUTHORISED) {
					// in this case, there is no session, or it has been revoked on the backend.
					// either way, sending this response will make the frontend try and refresh
					// which will fail and redirect the user to the login screen.

					// return { props: { fromSupertokens: 'needs-refresh' } };
					return { props: { dailyDeals: [] } }; // this works offline
				}

				throw err;

				// return {
				// 	notFound: true,
				// };
			}
		},
);

export default connect(mapStateToProps)(DailyDealsPage);
