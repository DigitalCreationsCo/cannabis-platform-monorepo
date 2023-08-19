import { urlBuilder } from '@cd/core-lib';
import { type AddressCreateType } from '@cd/data-access';
import {
	Button,
	FlexBox,
	Grid,
	H3,
	Paragraph,
	TextField,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { submitAddressTour } from '../../tour/submitAddressTour';

function SubmitAddressForm() {
	function startTour() {
		if (!submitAddressTour.isActivated) submitAddressTour.start();
	}

	useEffect(() => {
		startTour();
	}, []);

	const { nextFormStep, prevFormStep, formValues, setFormValues } =
		useFormContext();

	useEffect(() => {
		console.info('formvalues: ', formValues);
	});

	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues: {
		address: AddressCreateType;
	} = {
		address: {
			userId: formValues.newUser?.id,
			street1: '',
			street2: '',
			city: '',
			state: '',
			zipcode: 0,
			country: 'United States',
			countryCode: 'US',
		},
	};

	const validationSchema = yup.object().shape({
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
	});

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			const response = await axios.post<any, any, AddressCreateType>(
				urlBuilder.shop + '/api/user/address',
				values.address,
			);
			if (response.data.success === 'false')
				throw new Error(response.data.error);
			setFormValues({
				newUser: {
					address: {
						...response.data.payload,
					},
				},
			});
			setLoadingButton(false);
			nextFormStep();
		} catch (error: any) {
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
		const keyDownHandler = (event: any) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				handleSubmit();
			}
		};
		document.addEventListener('keydown', keyDownHandler);
		return () => document.removeEventListener('keydown', keyDownHandler);
	}, [handleSubmit]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleSubmit();
			}}
		>
			<H3 id="submit-address-step-1">{`Tell us where to deliver`}</H3>
			<Grid className="space-y-4">
				<Paragraph>* Please fill the required fields.</Paragraph>
				<TextField
					name="address.street1"
					label="* street address line 1"
					placeholder="Street"
					value={values.address.street1}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street1 && !!errors?.address?.street1}
					helperText={touched?.address?.street1 && errors?.address?.street1}
				/>
				<TextField
					name="address.street2"
					label="street address line 2"
					placeholder="Street Line 2"
					value={values.address.street2 || ''}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street2 && !!errors?.address?.street2}
					helperText={touched?.address?.street2 && errors?.address?.street2}
				/>
				<TextField
					name="address.city"
					label="* city"
					placeholder="City"
					value={values.address.city}
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
					type="number"
					value={values?.address?.zipcode || ''}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.zipcode && !!errors?.address?.zipcode}
					helperText={touched?.address?.zipcode && errors?.address?.zipcode}
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
				<FlexBox className="flex-row justify-center space-x-4 py-2">
					<Button
						disabled={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							prevFormStep();
						}}
					>
						go back
					</Button>
					<Button
						id="submit-address-step-2"
						className="place-self-center"
						loading={loadingButton}
						disabled={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						Next
					</Button>
				</FlexBox>
			</Grid>
		</form>
	);
}

export default SubmitAddressForm;
