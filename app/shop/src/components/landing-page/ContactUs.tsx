import { ResponseDataEnvelope, urlBuilder } from '@cd/core-lib';
import { type USStateAbbreviated } from '@cd/data-access';
import { TextField, Button, Grid } from '@cd/ui-lib';
import axios, { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

function ContactUs() {
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
		city: '',
		state: undefined,
		zipcode: undefined,
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
			// const response = await axios.post<
			// 	ResponseDataEnvelope<DailyStoryData>,
			// 	AxiosResponse<ResponseDataEnvelope<DailyStoryData>>,
			// 	{
			// 		email: string;
			// 		mobilePhone: string;
			// 		firstName: string;
			// 		lastName: string;
			// 		city?: string;
			// 		region?: string;
			// 		postalCode?: number;
			// 	}
			// >(urlBuilder.dashboard + '/api/daily-deals/contact', {
			// 	email: values.email,
			// 	mobilePhone: values.phone,
			// 	firstName: values.firstName,
			// 	lastName: values.lastName,
			// 	city: values.city,
			// 	region: values.state,
			// 	postalCode: values.zipcode,
			// });

			// if (!response.data.success || response.data.success === 'false')
			// 	throw new Error(response.data.error);

			toast.success('');
			setLoadingButton(false);
			resetForm();
		} catch (error: any) {
			console.error('Contact Us: ', error);
			setLoadingButton(false);
			toast.error(error.message);
		}
	}
	return (
		<div>
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

export default ContactUs;
