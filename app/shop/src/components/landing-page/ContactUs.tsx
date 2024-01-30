import {
	type ResponseDataEnvelope,
	TextContent,
	urlBuilder,
} from '@cd/core-lib';
import { type DailyStoryData } from '@cd/core-lib/lib/DailyStory.api';
import { type USStateAbbreviated } from '@cd/data-access';
import {
	TextField,
	Button,
	Grid,
	Paragraph,
	H2,
	FlexBox,
	TextArea,
	Select,
	CheckBox,
} from '@cd/ui-lib';
import axios, { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

type ContactUsFormResponse = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	city: string;
	state: USStateAbbreviated | undefined;
	zipcode: number | undefined;
	message: string;
	howDidYouHearAboutUs:
		| 'Linkedin'
		| 'recommended by a colleague'
		| 'search'
		| 'other';
	allowProcessResponse: boolean;
};

const howDidYouHearAboutUsOptions: {
	value: ContactUsFormResponse['howDidYouHearAboutUs'];
	label: string;
}[] = [
	{ value: 'Linkedin', label: 'Linkedin' },
	{ value: 'recommended by a colleague', label: 'recommended by a colleague' },
	{ value: 'search', label: 'search' },
	{ value: 'other', label: 'other' },
];

export default function ContactUsForm() {
	const [loadingButton, setLoadingButton] = useState(false);
	const initialValues: ContactUsFormResponse = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		city: '',
		state: undefined,
		zipcode: undefined,
		message: '',
		howDidYouHearAboutUs: 'Linkedin',
		allowProcessResponse: false,
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
			message: yup.string().required('Message is required'),
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
			const response = await axios.post<
				ResponseDataEnvelope<DailyStoryData>,
				AxiosResponse<ResponseDataEnvelope<DailyStoryData>>,
				ContactUsFormResponse
			>(urlBuilder.shop + '/api/contact-us', {
				email: values.email,
				phone: values.phone,
				firstName: values.firstName,
				lastName: values.lastName,
				city: values.city,
				state: values.state,
				zipcode: values.zipcode,
				allowProcessResponse: values.allowProcessResponse,
				howDidYouHearAboutUs: values.howDidYouHearAboutUs,
				message: values.message,
			});

			if (!response.data.success || response.data.success === 'false')
				throw new Error(response.data.error);

			toast.success(
				'Thank you for submitting a request for partnership. You will receive a response from our team within 24 hours.',
			);
			setLoadingButton(false);
			resetForm();
		} catch (error: any) {
			console.error('Contact Us: ', error);
			setLoadingButton(false);
			toast.error(error.message);
		}
	}
	return (
		<div className={twMerge('bg-secondary')}>
			<Grid className="py-24 lg:py-24 px-4 md:px-10 grid-cols-1 xl:grid-cols-2 xl:gap-x-32 auto-cols-max">
				<div
					id="contact-us-header"
					className="pb-16 text-2xl text-light max-w-full md:max-w-2xl col-span-2 lg:col-span-1 xl:ml-auto"
				>
					<Paragraph className="leading-loose tracking-wider mb-2 max-w-md md:max-w-full text-xl md:my-6 md:text-3xl">
						Our goal is to bring your business to people.
					</Paragraph>
					<H2 className="md:text-6xl max-w-2xl lg:max-w-full lg:col-span-2 leading-relaxed">
						<span className="font-bold text-primary-light">
							Partner with Gras
						</span>{' '}
						for home delivery today.
					</H2>
				</div>

				<div
					id="founder-quote"
					className="p-16 border rounded-xl shadow-xl drop-shadow-2xl hidden xl:block text-light xl:max-w-2xl ml-auto row-start-2"
				>
					<FlexBox className="flex-row">
						<Image
							className="rounded-full"
							src={require('../../../public/founder.jpg')}
							alt={'founder'}
						/>
						<FlexBox className="ml-8 flex-col self-stretch justify-center">
							<Paragraph className="text-primary-light text-xl font-semibold mb-3">
								Bryant Mejia
							</Paragraph>
							<Paragraph className="text-xl">Founder of Gras</Paragraph>
						</FlexBox>
					</FlexBox>

					<div className="mt-12">
						<Paragraph className="text-2xl text-light leading-relaxed">
							{`To best serve you, let's get to know your delivery need. Tell us about your business, and we'll arrange a free consultation call to discuss how we can help.`}
						</Paragraph>
					</div>
				</div>

				<form
					id="contact-us-form"
					className="self-end w-full xl:max-w-2xl mr-auto row-start-2"
				>
					<Grid className="grid-cols-2">
						<Paragraph className="col-span-2 px-2 text-light mb-2 md:max-w-full text-xl md:my-8">
							{`Please fill out the form below. 
						Our team will contact you within 24 hours.`}
						</Paragraph>
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
							containerClassName="px-2 xl:col-span-2"
							name="email"
							label="* email address"
							placeholder="email address"
							value={values?.email}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.email && !!errors.email}
						/>
						<TextField
							containerClassName="px-2 xl:col-span-2"
							name="phone"
							label="* phone"
							placeholder="phone"
							value={values?.phone}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.phone && !!errors.phone}
						/>
						<TextArea
							rows={4}
							containerClassName="px-2 col-span-2"
							name="message"
							label="* message"
							placeholder="Tell us about your delivery need"
							value={values?.message}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.message && !!errors.message}
						/>
						<Select
							values={howDidYouHearAboutUsOptions.map(({ value }) => value)}
							containerClassName="p-2 xl:col-span-2"
							name="phone"
							label="How did you hear about Gras?"
							placeholder="phone"
							value={values?.phone}
							onBlur={handleBlur}
							setOption={handleChange}
						/>
						<CheckBox
							className="px-2 pt-4 w-full text-light col-span-full"
							name={'allowProcessResponse'}
							onChange={handleChange}
							checked={values.allowProcessResponse}
							label="The contact information is only used to process your request. By clicking send, you agree to allow us to store the contact information in order to process your request."
						/>
						<div className="mt-16 col-span-2 place-self-center mx-2">
							<Button
								loading={loadingButton}
								size="lg"
								bg="secondary-light"
								hover="primary-light"
								className="p-8 text-2xl place-self-center"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									notifyValidation();
									handleSubmit();
								}}
							>
								{TextContent.account.CTA}
							</Button>
						</div>
					</Grid>
				</form>
			</Grid>

			<div className="w-full px-8 md:px-16 lg:w-4/5 mx-auto">
				<hr className="border-2" />
			</div>
		</div>
	);
}
