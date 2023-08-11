import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	H3,
	H6,
	Paragraph,
	Small,
	TermsAgreement,
	TextField,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { dispensaryAdminCreateTour } from '../../tour/dispensaryAdminCreateTour';

function DispensaryUserCreate() {
	function startTour() {
		if (!dispensaryAdminCreateTour.isActivated)
			dispensaryAdminCreateTour.start();
	}

	useEffect(() => {
		startTour();
	}, []);

	const { prevFormStep, nextFormStep, formValues, setFormValues } =
		useFormContext();
	const [loadingButton, setLoadingButton] = useState(false);

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);

			setFormValues({ newUser: values });

			const response = await axios.post(
				urlBuilder.dashboard + '/api/organization/staff',
				{
					user: values,
					role: 'OWNER',
					dispensaryId: formValues.organization?.id,
				},
				{ validateStatus: () => true },
			);

			console.info('response: ', response);
			if (response.status === 404) {
				throw new Error(response.data);
			}

			if (response.status === 400) {
				throw new Error(response.data);
			}

			toast.success('User is created succesfully.');
			setLoadingButton(false);
			nextFormStep();
		} catch (error: any) {
			console.info('Dispensary User Error: ', error);
			toast.error(error.message);
			setLoadingButton(false);
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<form className={'content relative'} onSubmit={handleSubmit}>
			<Grid className="mx-auto max-w-[525px]">
				<FlexBox className="flex-row justify-between space-x-2 pr-2 md:pr-0">
					<FlexBox>
						<H3 id="dispensary-admin-create-step-1">
							{`Create a Dispensary User Account.`}
						</H3>
					</FlexBox>
					<Image
						src={'/logo.png'}
						alt="Gras Cannabis logo"
						height={63}
						width={63}
						priority
					/>
				</FlexBox>
				<Small id="dispensary-admin-create-step-2">
					{TextContent.ui.FORM_FIELDS}
				</Small>
				<Small className="text-primary">What is your name?</Small>
				<TextField
					name="firstName"
					label="* first name"
					placeholder="First Name"
					value={values?.firstName}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.firstName && !!errors.firstName}
					helperText={touched.firstName && errors.firstName}
				/>
				<TextField
					name="lastName"
					label="* last name"
					placeholder="Last Name"
					value={values?.lastName}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.lastName && !!errors.lastName}
				/>
				<TextField
					name="username"
					label="* username"
					placeholder="UserName"
					value={values?.username}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.username && !!errors.username}
				/>
				<TextField
					name="email"
					type="email"
					label="* email"
					placeholder="Email"
					value={values?.email}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.email && !!errors.email}
				/>
				<FlexBox>
					<TextField
						name="phone"
						label="* phone"
						placeholder="Phone"
						value={values?.phone}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.phone && !!errors.phone}
					/>
				</FlexBox>
				<TextField
					name="address.street1"
					label="* street line 1"
					placeholder="Street Line 1"
					value={values?.address?.street1}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street1 && !!errors?.address?.street1}
					helperText={touched?.address?.street1 && errors?.address?.street1}
				/>
				<TextField
					name="address.street2"
					label="street line 2"
					placeholder="Street Line 2"
					value={values?.address?.street2}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street2 && !!errors?.address?.street2}
					helperText={touched?.address?.street2 && errors?.address?.street2}
				/>{' '}
				<TextField
					name="address.city"
					label="* city"
					placeholder="City"
					value={values?.address?.city}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.city && !!errors?.address?.city}
					helperText={touched?.address?.city && errors?.address?.city}
				/>
				<TextField
					name="address.state"
					label="* state"
					placeholder="State"
					value={values?.address?.state}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.state && !!errors?.address?.state}
					helperText={touched?.address?.state && errors?.address?.state}
				/>
				<TextField
					name="address.zipcode"
					label="* zipcode"
					placeholder="Zipcode"
					type={'number'}
					value={values?.address?.zipcode || ''}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.zipcode && !!errors?.address?.zipcode}
					helperText={touched?.address?.zipcode && errors?.address?.zipcode}
				/>
				<div id="dispensary-admin-create-step-3">
					<TermsAgreement
						name="termsAccepted"
						onChange={handleChange}
						checked={values?.termsAccepted || false}
						error={!!touched.termsAccepted && !!errors.termsAccepted}
						description={
							<>
								<Paragraph>{TextContent.legal.AGREE_TO_TERMS}</Paragraph>
								<a
									href="/termsandconditions/userterms"
									target="_blank"
									rel="noreferrer noopener"
								>
									<H6 className={'inline-block border-b-2'}>
										{TextContent.legal.USER_TERMS_OF_SERVICE}
									</H6>
									.
								</a>
							</>
						}
						label={TextContent.legal.I_AGREE_TO_THE_USER_TERMS}
					/>
				</div>
				<FlexBox className="m-auto flex-row space-x-4 pb-20">
					<Button onClick={prevFormStep} disabled={loadingButton}>
						back
					</Button>
					<Button
						id="dispensary-admin-create-step-4"
						type="submit"
						loading={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
						disabled={values.termsAccepted === false}
					>
						{TextContent.ui.CONTINUE}
					</Button>
				</FlexBox>
			</Grid>
		</form>
	);
}

const initialValues = {
	firstName: '',
	lastName: '',
	username: '',
	email: '',
	emailVerified: false,
	dialCode: '1',
	phone: '',
	address: {
		street1: '',
		street2: '',
		city: '',
		state: '',
		zipcode: null,
		country: 'United States',
		countryCode: 'US',
	},
	isLegalAge: false,
	idVerified: false,
	memberships: [],
	termsAccepted: false,
	imageUser: [],
};

const validationSchema = yup.object().shape({
	firstName: yup.string().required('first name is required'),
	lastName: yup.string().required('last name is required'),
	username: yup.string().required('provide a username'),
	email: yup.string().required('provide an email'),
	address: yup.object().shape({
		street1: yup.string().required('street line 1 is required'),
		street2: yup.string(),
		city: yup.string().required('city is required'),
		state: yup.string().required('state is required'),
		zipcode: yup
			.number()
			.required('zipcode is required')
			.test(
				'len',
				'zipcode is required',
				(val) => val?.toString().length === 5,
			),
		country: yup.string().required('country is required'),
		countryCode: yup.string().required('country code is required'),
	}),
	dialCode: yup.string().required('dialing code is required'),
	phone: yup
		.string()
		.required('phone number is required')
		.length(10, 'phone number must be 10 digits'),
	termsAccepted: yup
		.bool()
		.test(
			'termsAccepted',
			'Please read and agree to our User Terms and Conditions.',
			(value) => value === true,
		),
});

export default DispensaryUserCreate;
