import {
	type ResponseDataEnvelope,
	TextContent,
	usStatesAbbreviationList,
	applicationHeaders,
} from '@cd/core-lib';
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

export type ContactUsFormResponse = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	city: string;
	state: USStateAbbreviated | undefined;
	zipcode: number | undefined;
	whichServiceInterestedIn:
		| ''
		| 'Delivery Management'
		| 'Delivery Service'
		| 'Consumer Messaging';
	howDidYouHearAboutUs:
		| ''
		| 'Linkedin'
		| 'recommended by a colleague'
		| 'search'
		| 'other';
	message: string;
	allowProcessResponse: boolean;
	subscribeCannabisInsiderNewsletter: boolean;
	title: string;
	company: string;
	serviceAreaRange?: number;
	weeklyDeliveries?: number;
};

const howDidYouHearAboutUsOptions: {
	value: ContactUsFormResponse['howDidYouHearAboutUs'];
	label: string;
}[] = [
	{ value: '', label: '' },
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
		howDidYouHearAboutUs: '',
		whichServiceInterestedIn: '',
		allowProcessResponse: false,
		subscribeCannabisInsiderNewsletter: false,
		title: '',
		company: '',
		// How many miles from your store do you want to deliver?*
		// How many orders do you expect to deliver per week?*
		serviceAreaRange: undefined,
		weeklyDeliveries: undefined,
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
			city: yup.string().required('City is required'),
			state: yup.string().required('State is required'),
			zipcode: yup.string().required('Zipcode is required'),
			message: yup.string(),
			howDidYouHearAboutUs: yup
				.string()
				.required('How did you hear about Gras?'),
			allowProcessResponse: yup.boolean().isTrue('Please agree to the terms'),
			title: yup.string().required('Title is required'),
			company: yup.string().required('Company is required'),
			whichServiceInterestedIn: yup
				.string()
				.oneOf(
					['Delivery Management', 'Delivery Service', 'Consumer Messaging'],
					'Which service are you interested in?',
				)
				.required('Which service are you interested in?'),
			serviceAreaRange: yup.number().when('whichServiceInterestedIn', {
				is: (value: any) => {
					value?.includes('Delivery') || false;
				},
				then: yup.number().required('How many miles do you want to deliver?'),
			}),
			weeklyDeliveries: yup.number().when('whichServiceInterestedIn', {
				is: (value: any) => {
					value?.includes('Delivery') || false;
				},
				then: yup
					.number()
					.required('How many orders do you expect to deliver?'),
			}),
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
				ResponseDataEnvelope<any>,
				AxiosResponse<ResponseDataEnvelope<any>>,
				ContactUsFormResponse
			>('/api/contact-us', values, {
				headers: { ...applicationHeaders },
			});

			if (!response.data.success || response.data.success === 'false')
				throw new Error(response.data.error);

			toast.success(
				'Your request is submitted. Our team will reach out within 1 business day.',
				{
					duration: 5000,
				},
			);
			setLoadingButton(false);
			resetForm({ values: initialValues });
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
		}
	}

	const [heading] = [
		'bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline max-w-4xl whitespace-pre-line text-5xl font-bold sm:text-6xl xl:text-7xl',
	];

	return (
		<div id="contact-us-header" className={twMerge('bg-slate-100')}>
			<Grid className="py-12 lg:py-24 px-4 md:px-32 grid-cols-1 xl:grid-cols-2 xl:gap-x-24 auto-cols-max">
				<div className="pb-12 text-2xl text-dark max-w-full col-span-full mx-auto">
					<Paragraph
						className={twMerge(
							'leading-loose mb-2 max-w-md md:max-w-full text-2xl mx-auto md:mx-0 md:my-6',
						)}
					>
						We deliver your business to more people, online and outside.
					</Paragraph>
					<H2 className="text-6xl max-w-2xl lg:max-w-full lg:col-span-2">
						<span className={twMerge(heading)}>Partner with Gras</span> for home
						delivery and retail services.
					</H2>
				</div>

				<div
					id="founder-quote"
					className="p-12 border rounded-xl shadow-xl drop-shadow-2xl hidden xl:block xl:max-w-xl ml-auto row-start-2"
				>
					<FlexBox className="flex-row">
						<Image
							width={170}
							height={170}
							className="rounded-full"
							src={require('../../../public/founder.jpg')}
							alt={'founder'}
						/>
						<FlexBox className="ml-8 flex-col self-center">
							<Paragraph className="text-2xl font-semibold mb-1">
								Bryant Mejia
							</Paragraph>
							<Paragraph className="text-primary text-2xl">
								Founder of Gras
							</Paragraph>
						</FlexBox>
					</FlexBox>

					<div className="mt-12">
						<Paragraph className="text-2xl leading-relaxed">
							{`To best serve you, tell us about your delivery and business needs. We'll arrange a free call to form a working growth strategy. 
							`}
						</Paragraph>
					</div>
				</div>

				<form
					id="contact-us-form"
					className="self-end w-full lg:w-3/4 xl:w-full m-auto xl:max-w-xl lg:mr-auto row-start-2"
				>
					<Grid className="grid-cols-2">
						<Paragraph className="col-span-2 px-2 mb-2 md:max-w-full text-2xl md:my-12">
							{`Contact us using the form below. Our team will reach out within 24 hours.`}
						</Paragraph>
						<TextField
							containerClassName="px-2 col-span-1"
							name="firstName"
							label=" first name"
							value={values?.firstName}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.firstName && !!errors.firstName}
							helperText={touched.firstName && errors.firstName}
						/>
						<TextField
							containerClassName="px-2 col-span-1"
							name="lastName"
							label=" last name"
							value={values?.lastName}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.lastName && !!errors.lastName}
						/>

						<TextField
							type="email"
							containerClassName="px-2 col-span-2 lg:col-span-1"
							name="email"
							label="email"
							value={values?.email}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.email && !!errors.email}
						/>
						<TextField
							containerClassName="px-2 xl:col-span-1"
							name="company"
							label=" company"
							value={values?.company}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.company && !!errors.company}
						/>
						<TextField
							containerClassName="px-2 xl:col-span-1"
							name="title"
							label=" title"
							value={values.title}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.title && !!errors.title}
							helperText={touched.title && errors.title}
						/>
						<TextField
							containerClassName="px-2 xl:col-span-1"
							type="tel"
							name="phone"
							label="phone"
							value={values?.phone}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.phone && !!errors.phone}
						/>
						<TextField
							containerClassName="px-2 xl:col-span-1"
							name="city"
							label=" city"
							value={values.city}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.city && !!errors.city}
							helperText={touched.city && errors.city}
						/>

						<Select
							containerClassName="px-2 xl:col-span-auto"
							name="state"
							label=" state"
							className="rounded border"
							values={usStatesAbbreviationList}
							setOption={handleChange}
						/>

						<TextField
							containerClassName="px-2 xl:col-span-1"
							name="zipcode"
							label=" zipcode"
							type="number"
							value={values.zipcode}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.zipcode && !!errors.zipcode}
							helperText={touched.zipcode && errors.zipcode}
						/>

						<Select
							values={[
								'',
								'Delivery Management',
								'Delivery Service',
								'Consumer Messaging',
							]}
							containerClassName="p-2 xl:col-span-2"
							name="whichServiceInterestedIn"
							label="Which of our services are you most interested in?"
							defaultValue={''}
							value={values?.whichServiceInterestedIn}
							onBlur={handleBlur}
							setOption={handleChange}
						/>
						{values.whichServiceInterestedIn.includes('Delivery') && (
							<>
								<TextField
									containerClassName="px-2 col-span-2"
									name="serviceAreaRange"
									type="number"
									label="How many miles from your store do you want to deliver?"
									value={values.serviceAreaRange as number}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.serviceAreaRange && !!errors.serviceAreaRange
									}
									helperText={
										touched.serviceAreaRange && errors.serviceAreaRange
									}
								/>
								<TextField
									containerClassName="px-2 col-span-2"
									type="number"
									name="weeklyDeliveries"
									label="How many orders do you expect to deliver per week?"
									value={values.weeklyDeliveries as number}
									onBlur={handleBlur}
									onChange={handleChange}
									error={
										!!touched.weeklyDeliveries && !!errors.weeklyDeliveries
									}
									helperText={
										touched.weeklyDeliveries && errors.weeklyDeliveries
									}
								/>
							</>
						)}
						<Select
							values={howDidYouHearAboutUsOptions.map(({ value }) => value)}
							containerClassName="p-2 xl:col-span-2"
							name="howDidYouHearAboutUs"
							label="How did you hear about us?"
							defaultValue={''}
							value={values?.howDidYouHearAboutUs}
							onBlur={handleBlur}
							setOption={handleChange}
						/>
						<TextArea
							rows={4}
							containerClassName="px-2 col-span-2"
							name="message"
							label="Tell us anything else you'd like us to know."
							value={values?.message}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.message && !!errors.message}
						/>
						<CheckBox
							className="px-2 pt-4 w-full col-span-full"
							name={'allowProcessResponse'}
							onChange={handleChange}
							checked={values.allowProcessResponse}
							label={`You allow us to store your contact information. 
							Gras will only use your info to message your business`}
						/>
						<CheckBox
							className="px-2 pt-4 w-full col-span-full"
							name={'subscribeCannabisInsiderNewsletter'}
							onChange={handleChange}
							checked={values.subscribeCannabisInsiderNewsletter}
							label="Subscribe to our business email newsletter for industry trends"
						/>
						<div className="mt-16 col-span-2 place-self-center mx-2">
							<Button
								type="submit"
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
								{TextContent.prompt.CONTACT_US}
							</Button>
						</div>
					</Grid>
				</form>
			</Grid>

			<hr className="border-2" />
		</div>
	);
}
