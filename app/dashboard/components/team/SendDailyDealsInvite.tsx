import {
	axios,
	urlBuilder,
	type ResponseDataEnvelope,
	usStatesAbbreviationList,
	formatToTimeZone,
	TimeZoneMap,
	getFirstErrorOrNull,
} from '@cd/core-lib';
import { type CustomerSMSInvite } from '@cd/core-lib/src/sms/slicktext';
import { type Dispensary } from '@cd/data-access';
import {
	Button,
	FlexBox,
	Grid,
	Paragraph,
	TextField,
	H2,
	Select,
	TextArea,
} from '@cd/ui-lib';
import { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

interface SendDailyDealsInviteProps {
	team: Dispensary;
	isSubscribedOrThrow: () => void;
	showSubscription: () => void;
	className?: string | string[];
}

/*
 * This entire ocmponent is arguably unnecessary.
 * THe same functionality can be created using Twilio API (Text 'join' to 42424)
 * So, possibly cancel this feature.
 * Use Segment routing to add contacts from sms subscription to FreshSales crm.
 */

function SendDailyDealsInviteForm({
	team,
	isSubscribedOrThrow,
	showSubscription,
	className,
}: SendDailyDealsInviteProps) {
	const [loadingButton, setLoadingButton] = useState(false);

	const {
		resetForm,
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
	} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			city: '',
			state: undefined,
			zipcode: undefined,
			birthdate: '',
			doubleOptInMessage: `Reply YES to join ${team.name}.`,
		},
		onSubmit: async () => {
			try {
				setLoadingButton(true);
				const response = await axios.post<
					ResponseDataEnvelope<any>,
					AxiosResponse<ResponseDataEnvelope<any>>,
					Partial<any>
				>(
					urlBuilder.dashboard +
						`/api/dispensaries/${team.slug}/daily-deals/invite`,
					{
						...values,

						// THIS INPUT IS BROKEN, AND THE COMPONENT IS  NOT NEEDED ATM
						//
						//
						// email: values.email,
						// phone_numbers: [values['phone']],
						// firstName: values.firstName,
						// lastName: values.lastName,
						// city: values.city,
						// state: values.state,
						// zipcode: values.zipcode,
						// birthdate: values.birthdate,
						// doubleOptInMessage: values.doubleOptInMessage,
						// teamSlug: team.slug,
						// isOptInMessages: true,
					}
				);

				if (!response.data.success || response.data.success === 'false') {
					throw new Error(response.data.error);
				}

				toast.success(`Sent invite link to ${values.firstName}!`);
				setLoadingButton(false);
				resetForm();
			} catch (error: any) {
				setLoadingButton(false);
				toast.error('An error occurred. Try again later.');
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
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors) || 'Error sending invite link');
			}
		});
	}
	return (
		<div className={twMerge('space-y-4 max-w-2xl mr-auto', className)}>
			<div className="border w-full xl:hidden"></div>
			<H2 className="text-xl">{`Invite a Customer`}</H2>
			<FlexBox className="">
				<Grid className="grid-cols-2 max-w-lg gap-2">
					<Paragraph className="font-semibold col-span-2 row-span-1">
						{/* {`Send your customers an invite link to share with their friends. When their friends
                place their first order, your customer will receive a $10 credit to their account.`} */}
						{`Subscribe a customer to receive your text messages. The customer will receive a text message invite to join. 
                        * Required`}
					</Paragraph>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
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
						containerClassName="col-span-1"
						className="text-lg"
						name="lastName"
						label="* last name"
						placeholder="last name"
						value={values?.lastName}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.lastName && !!errors.lastName}
					/>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="phone"
						label="* phone"
						placeholder="phone"
						value={values?.phone}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.phone && !!errors.phone}
					/>
					<TextField
						containerClassName="col-span-1"
						className="text-lg"
						name="email"
						label="* email"
						placeholder="email"
						value={values?.email}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.email && !!errors.email}
					/>
					<TextField
						containerClassName={'flex-1'}
						className="text-lg"
						name="city"
						label="city"
						placeholder="City"
						value={values?.city}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.city && !!errors.city}
					/>
					<Select
						name="state"
						containerClassName={'flex-1'}
						label="state"
						placeholder="State"
						defaultValue={values?.state || 'NY'}
						values={usStatesAbbreviationList}
						setOption={handleChange}
					/>
					<TextField
						className="text-lg"
						name="zipcode"
						label="zipcode"
						placeholder="Zipcode"
						maxLength={5}
						type={'number'}
						value={values?.zipcode || ''}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.zipcode && !!errors?.zipcode}
					/>
					<TextField
						className="text-lg"
						name="birthdate"
						label="birthday"
						type="date"
						onChange={(e: any) => {
							const date = formatToTimeZone(
								e.target.value,
								TimeZoneMap[values.state || 'NY']
							);
							setFieldValue('birthdate', date);
						}}
					/>
					<Paragraph className="font-medium col-span-2 pt-4">
						{`Invited customers will receive this message. 
                        The customer must reply YES to join.`}
					</Paragraph>
					<TextArea
						containerClassName={'flex-1 col-span-2'}
						className="text-lg"
						name="doubleOptInMessage"
						label="Customize Your Message"
						placeholder={values.doubleOptInMessage}
						value={values?.doubleOptInMessage}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.doubleOptInMessage && !!errors.doubleOptInMessage}
					/>
				</Grid>
				<Button
					type="submit"
					loading={loadingButton}
					onClick={(e) => {
						try {
							isSubscribedOrThrow();
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						} catch (error: any) {
							showSubscription();
						}
					}}
					className="border bg-amber-100 hover:bg-amber-200 active:bg-amber-200 mx-2 my-4 px-4 place-self-end justify-self-end"
				>
					{t('send-invite')}
				</Button>
			</FlexBox>
		</div>
	);
}

export default SendDailyDealsInviteForm;
