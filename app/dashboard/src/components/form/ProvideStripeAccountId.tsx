import {
	axios,
	TextContent,
	urlBuilder,
	type DispensaryConnectStripeAccountPayload,
<<<<<<< HEAD
	type DispensaryCreateStripeAccountPayload,
} from '@cd/core-lib';
import { type OrganizationCreateType } from '@cd/data-access';
=======
} from '@cd/core-lib';
>>>>>>> 538ee1f09 (chore(dashboard): review Dispensary Stripe account code, api connect, server-payments account routes, account.controller, Stripe Service)
import {
	Button,
	FlexBox,
	Grid,
	H3,
	Small,
	TextField,
	Tiny,
	useFormContext,
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

function ProvideStripeAccountId() {
	const { nextFormStep, setCanProceed, formValues, setFormValues } =
		useFormContext();

	useEffect(() => {
		setCanProceed(true);
	}, [setCanProceed]);

	const [loadingButton, setLoadingButton] = useState(false);
	const [loadingButton2, setLoadingButton2] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);

	const initialValues = {
		stripeAccountId: '',
	};

	// test redirect from dashboard api
	// test redirect from component
	async function connectStripeAccountToDispensary() {
		try {
<<<<<<< HEAD
			setLoadingButton(true);
			const organization = formValues?.organization as OrganizationCreateType;
			if (!organization)
				throw new Error(TextContent.error.DISPENSARY_NOT_FOUND); // should never happen
=======
			const organization = formValues?.organization;
			if (!organization)
				throw new Error(TextContent.error.DISPENSARY_NOT_FOUND); // should never happen

>>>>>>> 538ee1f09 (chore(dashboard): review Dispensary Stripe account code, api connect, server-payments account routes, account.controller, Stripe Service)
			const response = await axios.post<
				any,
				any,
				DispensaryConnectStripeAccountPayload
			>(urlBuilder.dashboard + `/api/stripe/connect`, {
				organization,
				stripeAccountId: values.stripeAccountId,
			});
			if (response.data.success == 'false')
				throw new Error(response.data.error);
<<<<<<< HEAD
			// allow form navigation after submitting ( to review and make any changes )
			setCanProceed(true);
			setFormValues({
				organization: {
					stripeAccountId: values.stripeAccountId,
					stripeOnboardingComplete: true,
				},
			});
			toast.success(response.data.message);
		} catch (error: any) {
			setLoadingButton(false);
			throw new Error(error.message);
=======

			// allow form navigation after submitting ( to review and make any changes )
			setCanProceed(true);
			setFormValues({
				organization: { stripeAccountId: values.stripeAccountId },
			});
			toast.success(
				`Stripe account connected to ${formValues?.organization?.name}.`,
			);
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
>>>>>>> 538ee1f09 (chore(dashboard): review Dispensary Stripe account code, api connect, server-payments account routes, account.controller, Stripe Service)
		}
	}

	// test redirect from dashboard api
	// test redirect from component
	async function declineStripeIdAndCreateAccount() {
		try {
			setLoadingButton2(true);
			const organization = formValues?.organization as OrganizationCreateType;
			if (!organization)
				throw new Error(TextContent.error.DISPENSARY_NOT_FOUND); // should never happen
			const response = await axios.post<
				any,
				any,
				DispensaryCreateStripeAccountPayload
			>(urlBuilder.dashboard + `/api/stripe/create`, {
				organization,
				email: formValues.newUser?.email as string,
				// we can assume the email is submitted at this point
			});
			if (response.status === 302) {
				// allow form navigation after submitting
				setCanProceed(true);
				if (response.data.success) {
					setIsRedirecting(true);
					window.location.href = response.data.redirect;
				}
			}
			if (response.status !== 201)
				throw new Error('Error creating stripe account.');
			const { stripeAccountId } = response.data;
			setFormValues({ organization: { stripeAccountId } });
			setLoadingButton2(false);
			toast.success(response.data.message);
		} catch (error: any) {
			setLoadingButton2(false);
			toast.error(error.message);
		}
	}

	const onSubmit = async () => {
		try {
			await connectStripeAccountToDispensary();
			nextFormStep();
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
		}
	};

	const {
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
		validationSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(Object.values(errors)[0].toString());
			}
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<Grid className="mx-auto flex h-[480px] max-w-[525px] flex-col items-center justify-center space-y-4">
				<FlexBox className="mx-auto">
					<H3 className="mx-auto pb-2">
						{TextContent.account.CONNECT_MY_STRIPE}
					</H3>
					<Small className="mx-auto w-3/4">
						{TextContent.account.DISPENSARY_STRIPE_ACCOUNT}
					</Small>
					<Tiny className="mx-auto pt-2">
						* {TextContent.legal.ACCOUNT_INFORMATION_POLICY}
					</Tiny>
					<a
						className="mx-auto"
						href="/termsandconditions/dispensaryterms"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Tiny className={'border-b-2'}>
							{TextContent.legal.READ_PRIVACY_POLICY}
						</Tiny>
					</a>
				</FlexBox>
				<TextField
					containerClassName="w-[320px]"
					className="text-center"
					name="stripeAccountId"
					maxLength={24}
					label="Stripe Id"
					placeholder="**** **** **** ****"
					value={values?.stripeAccountId}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.stripeAccountId && !!errors.stripeAccountId}
					// helperText={touched.stripeAccountId && errors.stripeAccountId}
				/>

				<Button
					className="w-[220px]"
					type="submit"
					disabled={loadingButton || loadingButton2 || isRedirecting}
					loading={loadingButton}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						notifyValidation();
						handleSubmit();
					}}
				>
					{TextContent.account.CONNECT_MY_STRIPE}
				</Button>

				<Button
					className="w-[220px]"
					disabled={loadingButton || loadingButton2 || isRedirecting}
					loading={loadingButton2}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						declineStripeIdAndCreateAccount();
					}}
				>
					{isRedirecting ? (
						<div className="animate-pulse">
							{TextContent.account.CONNECTING_TO_STRIPE}
						</div>
					) : (
						<>{TextContent.account.I_DONT_HAVE_STRIPE}</>
					)}
				</Button>
			</Grid>
		</form>
	);
}

export default ProvideStripeAccountId;

const validationSchema = yup.object().shape({
	stripeAccountId: yup
		.string()
		.required(TextContent.prompt.STRIPE_ID_REQUIRED)
		.length(21, 'The id is not valid.'),
});
