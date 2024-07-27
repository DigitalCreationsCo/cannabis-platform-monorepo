import {
	type ResponseDataEnvelope,
	usStatesAbbreviationList,
	applicationHeaders,
	getFirstErrorOrNull,
} from '@cd/core-lib';
import axios, { type AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { type HTMLAttributes, useState } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import founder from '../../../../public/founder.png';
import { styles } from '../../../styleClassNames';
import Button from '../../button/Button';
import CheckBox from '../../CheckBox';
import FlexBox from '../../FlexBox';
import Grid from '../../Grid';
import Select from '../../Select';
import TextArea from '../../TextArea';
import TextField from '../../TextField';
import { Paragraph, H2, H3, H5 } from '../../Typography';

export interface ContactUsFormResponse {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zipcode: string;
	whichServiceInterestedIn: (typeof serviceOptions)[number] | '';
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
}

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

const serviceOptions = [
	'Delivery Management',
	'Delivery Service',
	'Consumer Messaging',
	'Promotional Events🔥',
];

export default function ContactUsForm(props: HTMLAttributes<HTMLDivElement>) {
	const { t } = useTranslation('common');

	const [loadingButton, setLoadingButton] = useState(false);
	const initialValues: ContactUsFormResponse = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		street: '',
		city: '',
		state: 'NY',
		zipcode: '',
		message: '',
		howDidYouHearAboutUs: '',
		whichServiceInterestedIn: '',
		allowProcessResponse: true,
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
			street: yup.string().required('Street is required'),
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
				.oneOf(serviceOptions, 'Which service are you interested in?')
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
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors) || 'Error sending invite link');
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

			const dataLayer = window.dataLayer || [];
			// push event to GTM with form values
			dataLayer.push({
				event: 'formSubmission',
				formId: 'contact-us-form',
				formValues: values,
			});
			toast.success(
				'We received your message. Our team will reach out in the next business day.',
				{
					duration: 5000,
				}
			);
			setLoadingButton(false);
			resetForm({ values: initialValues });
		} catch (error: any) {
			setLoadingButton(false);
			// get GTM datalayer
			const dataLayer = window.dataLayer || [];
			// push event to GTM with form values
			dataLayer.push({
				event: 'formSubmissionError',
				formId: 'contact-us-form',
				formValues: values,
				errorMessage: error.message,
			});
			toast.error(error.message);
		}
	}

	const [heading] = [
		'bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline max-w-4xl whitespace-pre-line text-5xl font-bold sm:text-6xl xl:text-7xl',
	];

	return (
		<div id={props.id} className={twMerge('bg-slate-100')}>
			<Grid className="py-12 lg:!py-24 px-8 md:px-32 grid-cols-1 xl:grid-cols-2 xl:gap-x-24 auto-cols-max">
				<div className="pb-12 text-dark max-w-5xl col-span-full mx-auto">
					<H2 className={twMerge(styles.HERO.heading, 'text-dark')}>
						<span className={twMerge(heading, styles.shadow.textShadow)}>
							Partner with Gras
						</span>{' '}
						for cannabis delivery and promotional services
					</H2>
				</div>

				<div
					id="founder-quote"
					// className="chat chat-start p-12 border rounded-xl shadow-xl drop-shadow-2xl hidden xl:block mx-auto row-start-2"
					className="chat chat-start row-start-2 max-w-3xl mx-auto col-span-full"
				>
					<div className="chat-image avatar">
						<Image
							width={100}
							height={100}
							className="rounded-full"
							src={founder}
							alt={'founder'}
							quality={25}
							unoptimized
						/>
					</div>
					<div className="chat-bubble ml-2 mb-6 bg-blue-300 drop-shadow">
						<Paragraph>
							{`To 2X your business revenue, tell us about your marketing and delivery needs. Then, schedule a free call with our team to start your growth strategy. 
						Bryant Mejia, Founder`}
						</Paragraph>
					</div>
				</div>

				<form
					id="contact-us-form"
					className="w-full lg:w-3/4 xl:w-full m-auto xl:max-w-xl row-start-3 col-span-full"
				>
					<Grid className="grid-cols-2">
						<H5 className="col-span-2 px-4 my-6 md:mt-12">
							{`Fill out the form to schedule your free call.`}
						</H5>
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
							name="street"
							label=" street"
							value={values.street}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.street && !!errors.street}
							helperText={touched.street && errors.street}
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
							defaultValue={values.state}
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
							values={['', ...serviceOptions]}
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
									value={values.serviceAreaRange!}
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
									value={values.weeklyDeliveries!}
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
							label="Is there anything you'd like us to know?"
							placeholder={
								'Please share any goals, interests or comments to prepare for your success call.'
							}
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
							Gras will only use your information to contact your business.`}
						/>
						<CheckBox
							className="px-2 pt-4 w-full col-span-full"
							name={'subscribeCannabisInsiderNewsletter'}
							onChange={handleChange}
							checked={values.subscribeCannabisInsiderNewsletter}
							label="Subscribe for industry news and trends via our newsletter."
						/>
						<div className="mt-16 mb-8 lg:mb-0 col-span-2 place-self-center mx-2">
							<Button
								type="submit"
								loading={loadingButton}
								size="lg"
								bg="secondary-light"
								hover="primary"
								className="p-8 text-2xl place-self-center uppercase hover:scale-105 transition duration-200"
								onClick={(e: any) => {
									e.preventDefault();
									e.stopPropagation();
									notifyValidation();
									handleSubmit();
								}}
							>
								{t('contact-sales')}
							</Button>
						</div>
					</Grid>
				</form>
			</Grid>

			<hr className="border-2" />
		</div>
	);
}
