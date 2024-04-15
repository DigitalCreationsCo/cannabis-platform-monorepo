/* eslint-disable sonarjs/no-duplicated-branches */
import {
	axios,
	modalActions,
	modalTypes,
	selectDispensaryState,
	showDay,
	showTime,
	urlBuilder,
	useAppDispatch,
	useAppSelector,
	type AppState,
	type ResponseDataEnvelope,
} from '@cd/core-lib';
import {
	type USStateAbbreviated,
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
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import NodeCache from 'node-cache';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { connect } from 'react-redux';
import Supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { backendConfig } from '../../config/backendConfig';
import { wrapper } from '../../store';

interface DashboardProps {
	organization: OrganizationWithDashboardDetails;
	user: UserDispensaryStaff;
	products: ProductWithDashboardDetails[];
	orders: OrderWithFullDetails[];
	dailyDeals: DailyDeal[];
}

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
		<div className="my-4 flex grow">
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
					className="md:hidden mt-2 px-4 bg-inverse active:bg-accent-soft place-self-end self-end justify-self-end"
					hover="accent-soft"
					onClick={openNewDailyDealModal}
				>
					new Daily Deal
				</Button>
			</div>
		</div>
	);

	return (
		<Page
			className={twMerge('bg-light lg:min-h-[710px] sm:px-4 pb-4 lg:pb-24')}
		>
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
	const { dispensary } = useAppSelector(selectDispensaryState);
	const { city, state, zipcode } = dispensary.address;

	const [loadingButton, setLoadingButton] = useState(false);
	const initialValues: {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		city?: string;
		state?: USStateAbbreviated;
		zipcode?: number;
	} = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		city,
		state: state as USStateAbbreviated,
		zipcode,
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
		onSubmit: async () => {
			try {
				setLoadingButton(true);
				const response = await axios.post<
					ResponseDataEnvelope<any>,
					AxiosResponse<ResponseDataEnvelope<any>>,
					{
						email: string;
						mobilePhone: string;
						firstName: string;
						lastName: string;
						city?: string;
						region?: string;
						postalCode?: number;
						subscribed: boolean;
					}
				>(urlBuilder.dashboard + '/api/customer/invite', {
					email: values.email,
					mobilePhone: values.phone,
					firstName: values.firstName,
					lastName: values.lastName,
					city: values.city,
					region: values.state,
					postalCode: values.zipcode,
					subscribed: false,
				});

				if (!response.data.success || response.data.success === 'false')
					throw new Error(response.data.error);

				toast.success(`Sent invite link to ${values.firstName}!`);
				setLoadingButton(false);
				resetForm();
			} catch (error: any) {
				console.error('send invite link: ', error);
				setLoadingButton(false);
				toast.error(error.message);
			}
		},
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

	return (
		<div className="space-y-4 py-2">
			<Paragraph className="font-semibold">
				{/* {`Send your customers an invite link to share with their friends. When their friends
				place their first order, your customer will receive a $10 credit to their account.`} */}
				Invite a customer to Daily Deals. The customer will receive a text
				message to join your program.
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
				type="submit"
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
	(): any =>
		async ({ query, req, res }: any) => {
			try {
				if (!query.dashboard) throw new Error();

				Supertokens.init(backendConfig());

				const session = await Session.getSession(req, res, {
					overrideGlobalClaimValidators: () => {
						return [];
					},
				});

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

				const dailyDeals = response.data.payload;

				return {
					props: { dailyDeals },
				};
			} catch (err) {
				console.log('DailyDealsPage: ', err);
				if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
					return {
						props: {
							fromSupertokens: 'needs-refresh',
							dailyDeals: [],
						},
					};
				} else if (err.type === Session.Error.UNAUTHORISED) {
					return {
						props: { fromSupertokens: 'needs-refresh', dailyDeals: [] },
					};
				}
				throw err;
			}
		},
);

export default connect(mapStateToProps)(DailyDealsPage);
