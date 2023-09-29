/* eslint-disable sonarjs/cognitive-complexity */
import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	H2,
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
import { dispensaryCreateTour } from '../../tour';

// ToDo:
// Organization Search for SearchTextField
// Add country picker to set Country and countryCode fields

function DispensaryCreate() {
	function startTour() {
		if (!dispensaryCreateTour.isActivated) dispensaryCreateTour.start();
	}

	useEffect(() => {
		startTour();
	}, []);

	const { prevFormStep, nextFormStep, formValues, setFormValues } =
		useFormContext();
	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		id: formValues.organization?.id || '',
		name: formValues.organization?.name || '',
		address: {
			street1: formValues.organization?.address?.street1 || '',
			street2: formValues.organization?.address?.street2 || '',
			city: formValues.organization?.address?.city || '',
			state: formValues.organization?.address?.state || '',
			zipcode: formValues.organization?.address?.zipcode || 0,
			country: formValues.organization?.address?.country || '',
			countryCode: formValues.organization?.address?.countryCode || 'US',
		},
		dialCode: formValues.organization?.dialCode || '1',
		phone: formValues.organization?.phone || '',
		termsAccepted: false,
		subdomainId: formValues.organization?.subdomainId || '',
		vendorId: formValues.organization?.vendorId || '',
	};

	const updateDispensaryRecord = async () => {
		try {
			const response = await axios.put(
				`${urlBuilder.dashboard}/api/organization`,
				values,
			);
			if (response.data.success == 'false')
				throw new Error(response.data.error);
			toast.success('Dispensary Info is uploaded successfully.');
		} catch (error: any) {
			throw new Error('The Dispensary is not uploaded. Please try again.');
		}
	};

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			setFormValues({ organization: { ...values } });
			await updateDispensaryRecord();
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<form className={'content relative'} onSubmit={handleSubmit}>
			<Grid className="mx-auto max-w-[525px]">
				<FlexBox className="flex-row justify-between space-x-2 pr-2 md:pr-0">
					<FlexBox>
						<H2 id="dispensary-create-step-1">Welcome to Gras</H2>
						<H3>a one stop cannabis marketplace</H3>
					</FlexBox>
					<Image
						className="rounded-btn"
						src={'/logo.png'}
						alt="Gras Cannabis logo"
						height={63}
						width={63}
						priority
					/>
				</FlexBox>
				<Small>{TextContent.ui.FORM_FIELDS}</Small>
				{/* <H6 className="text-primary">What is the name of your Dispensary?</H6> */}
				<TextField
					id="dispensary-create-step-2"
					name="name"
					label="* Dispensary name"
					placeholder="What is the name of your Dispensary?"
					value={values?.name}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.name && !!errors.name}
					helperText={touched.name && errors.name}
				/>
				{/* <TextField
                    name="email"
                    label="Email"
                    placeholder="you@yourdispensary.com"
                    value={values?.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                /> */}
				{/* <H6 className="text-primary">What is your phone number?</H6> */}
				<TextField
					name="phone"
					label="* phone"
					placeholder="Phone"
					value={values?.phone}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.phone && !!errors.phone}
				/>
				{/* <H6 className="text-primary">Where are you located?</H6> */}
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
				{/* <TextField
                    name="address.country"
                    label="* country"
                    placeholder="Country"
                    value={values?.address?.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched?.address?.country && !!errors?.address?.country}
                    helperText={touched?.address?.country && errors?.address?.country}
                /> */}
				<TextField
					name="address.zipcode"
					label="* zipcode"
					placeholder="Zipcode"
					value={values?.address?.zipcode}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.zipcode && !!errors?.address?.zipcode}
					helperText={touched?.address?.zipcode && errors?.address?.zipcode}
				/>
				<TermsAgreement
					name="termsAccepted"
					onChange={handleChange}
					checked={values?.termsAccepted || false}
					helperText={(touched.termsAccepted && errors.termsAccepted) || ''}
					description={
						<div id="dispensary-create-step-3">
							<Paragraph>{TextContent.legal.AGREE_TO_TERMS}</Paragraph>
							<a
								href={TextContent.href.dispensary_tos}
								target="_blank"
								rel="noreferrer noopener"
							>
								<H6 className={'inline-block border-b-2'}>
									{TextContent.legal.DISPENSARY_TERMS_OF_SERVICE}
								</H6>
								.
							</a>
						</div>
					}
					label={TextContent.legal.I_AGREE_TO_THE_DISPENSARY_TERMS}
				/>
				<FlexBox className="m-auto flex-row space-x-4 pb-20">
					<Button onClick={prevFormStep} disabled={loadingButton}>
						back
					</Button>
					<Button
						id="dispensary-create-step-4"
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

const validationSchema = yup.object().shape({
	name: yup.string().required(TextContent.prompt.DISPENSARY_NAME_REQUIRED),
	dialCode: yup.string().required(TextContent.prompt.DIALCODE_REQUIRED),
	phone: yup
		.string()
		.required(TextContent.prompt.PHONE_REQUIRED)
		.length(10, ({ length }) => TextContent.prompt.PHONE_MINIMUM_f(length)),
	termsAccepted: yup
		.bool()
		.test(
			'termsAccepted',
			TextContent.legal.READ_USER_TERMS_OF_SERVICE,
			(value) => value === true,
		),
	address: yup.object().shape({
		street1: yup.string().required(TextContent.prompt.STREET1_REQUIRED),
		street2: yup.string(),
		city: yup.string().required(TextContent.prompt.CITY_REQUIRED),
		state: yup.string().required(TextContent.prompt.STATE_REQUIRED),
		zipcode: yup
			.number()
			.required(TextContent.prompt.ZIPCODE_REQUIRED)
			.test(
				'len',
				TextContent.prompt.ZIPCODE_MINIMUM_f(5),
				(val) => val?.toString().length === 5,
			),
		country: yup.string().required(TextContent.prompt.COUNTRY_REQUIRED),
		countryCode: yup.string().required(TextContent.prompt.COUNTRYCODE_REQUIRED),
	}),
});

export default DispensaryCreate;
