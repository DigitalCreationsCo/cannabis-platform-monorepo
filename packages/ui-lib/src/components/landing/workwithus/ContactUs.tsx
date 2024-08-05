import Cal, { getCalApi } from '@calcom/embed-react';
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
import React, { type HTMLAttributes, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import founder from '../../../../public/founder.png';
import { styles } from '../../../styleClassNames';
import CTA from '../../button/CTA';
import CheckBox from '../../CheckBox';
import Grid from '../../Grid';
import Select from '../../Select';
import TextArea from '../../TextArea';
import TextField from '../../TextField';
import { Paragraph, H2, H3 } from '../../Typography';

export interface ContactUsFormResponse {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zipcode: string;
	ecommerceUrl: string;
	whichServiceInterestedIn: (typeof serviceOptions)[number] | '';
	howDidYouHearAboutUs:
		| 'Linkedin'
		| 'Recommended'
		| 'Online Search'
		| 'Social Media'
		| 'Other'
		| '';
	message: string;
	allowProcessResponse: boolean;
	subscribeCannabisInsiderNewsletter: boolean;
	title: string;
	company: string;
	serviceAreaRange?: number;
	weeklyDeliveries?: number;
	teamMember: TeamMember;
}

interface TeamMember {
	name: string;
	email: string;
	role: string;
	id: string;
}

const howDidYouHearAboutUsOptions: string[] = [
	'',
	'Linkedin',
	'Recommended',
	'Online Search',
	'Social Media',
	'Other',
];

const serviceOptions = [
	`I'm here to optimize my delivery service.`,
	'I want to use text messaging to promote my business.',
	`I'm here to automate my records and stay compliant.`,
	'I want to promote my business events. 🔥',
];

// const serviceOptions = [
// 	'Delivery Management',
// 	'Delivery Service',
// 	'Messaging Service',
// 	'Promotional Events🔥',
// ];

// const serviceOptions = [
// 	{ value:'Delivery Management', label: 'I want to optimize my delivery service.'},
// 	{value: 'Delivery Service', label: "I want to automate my record-keeping."},
// 	{value: 'Messaging Service', label: "I want to use text messaging to promote my business."},
// 	{value: 'Promotional Events🔥', label: "I want to promote my business events. 🔥"}
// ];

const dataLayer = (typeof window !== 'undefined' && window.dataLayer) || [];

export default function ContactUsForm(props: HTMLAttributes<HTMLDivElement>) {
	const { t } = useTranslation('common');

	const [showScheduler, setShowScheduler] = useState(false);
	const [loadingButton, setLoadingButton] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

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
		ecommerceUrl: '',
		title: '',
		company: '',
		// How many miles from your store do you want to deliver?*
		// How many orders do you expect to deliver per week?*
		serviceAreaRange: undefined,
		weeklyDeliveries: undefined,
		teamMember: {
			name: 'Bryant Mejia',
			email: 'bryantmejia@gras.live',
			role: 'CEO',
			id: '1',
		},
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
				.oneOf(howDidYouHearAboutUsOptions, 'How did you hear about us?')
				.required('How did you hear about us?'),
			allowProcessResponse: yup.boolean().isTrue('Please agree to the terms'),
			title: yup.string().required('Title is required'),
			company: yup.string().required('Company is required'),
			whichServiceInterestedIn: yup
				.string()
				.oneOf(serviceOptions, 'What motivated you to contact us?')
				.required('What motivated you to contact us?'),
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
				toast.error(
					getFirstErrorOrNull(errors) || 'Error sending invite link',
					{ position: 'bottom-center' }
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

			// scroll to element
			const element = document.getElementById('partner-heading');
			element?.scrollIntoView({ behavior: 'smooth' });

			setLoadingButton(false);
			setShowScheduler(true);
			// resetForm({ values: initialValues });
		} catch (error: any) {
			setLoadingButton(false);

			dataLayer.push({
				event: 'formSubmissionError',
				formId: 'contact-us-form',
				formValues: values,
				errorMessage: error.message,
			});

			toast.error(error.message, { position: 'bottom-center' });
		}
	}

	const onSuccess = () => {
		setIsSubmitted(true);

		toast.success(
			'We received your message. Our team will reach out within 1 business day.',
			{
				duration: 5000,
				position: 'bottom-center',
			}
		);

		dataLayer.push({
			event: 'formSubmission',
			formId: 'contact-us-form',
			formValues: values,
		});

		resetForm({ values: initialValues });
	};

	const [heading] = [
		'bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline max-w-4xl whitespace-pre-line text-5xl font-bold sm:text-6xl xl:text-7xl',
	];

	return (
		<div id={props.id} className={twMerge('bg-slate-100')}>
			<Grid className="py-12 lg:!py-24 px-8 md:px-32 grid-cols-1 xl:grid-cols-2 xl:gap-x-24 auto-cols-max">
				<div className="pb-12 text-dark max-w-5xl col-span-full mx-auto">
					<H2
						id="partner-heading"
						className={twMerge(styles.HERO.heading, 'text-dark')}
					>
						<span className={twMerge(heading, styles.shadow.textShadow)}>
							Partner with Gras
						</span>{' '}
						for cannabis delivery and promotional services
					</H2>
				</div>

				<div
					id="founder-quote"
					className="flex flex-col md:flex-row row-start-2 max-w-3xl justify-center items-center mx-auto col-span-full gap-4"
				>
					<aside className="avatar w-24 h-24 shrink-0">
						<Image
							width={50}
							height={50}
							className="rounded-full"
							src={founder}
							alt={'founder'}
							quality={25}
							unoptimized
						/>
					</aside>
					<div className="mb-2 bg-blue-300 drop-shadow">
						<>
							<H3 className="px-4 font-semibold">{`
						Let's 2X Your Cannabis Business in 12 months.
						`}</H3>
							{!showScheduler ? (
								<Paragraph className="px-4 text-justify">
									{`Bryant Mejia, founder of Gras

What is the #1 biggest barrier to growing your cannabis business?
`}
								</Paragraph>
							) : isSubmitted ? (
								<Paragraph className="px-4 text-justify">{`
									Thank you for booking a call with our team.
									Check your inbox for your confirmation email.
									We look forward to working with you to achieve 
									remarkable growth for your business.
						`}</Paragraph>
							) : (
								<Paragraph className="px-4 text-justify">{`
						Book your free Success Call with ${values.teamMember.name}.
						`}</Paragraph>
							)}
						</>
					</div>
				</div>

				<form
					id="contact-us-form"
					className="w-full lg:w-3/4 xl:w-full m-auto xl:max-w-xl row-start-3 col-span-full"
				>
					<Grid className="grid-cols-2">
						{(!showScheduler && (
							<Paragraph className="p-4 text-justify col-span-full mx-auto">
								{`This 4 minute form helps us understand your current business needs. 
								Think of it as an intro to your Success Call with our team. 
								
								On the call, we'll share your personalized blueprint to 2X your revenue in 12 months using messaging, delivery and events promotion to blow customer satisfaction through the roof.
							`}
							</Paragraph>
						)) || <></>}
						{!showScheduler ? (
							<>
								<TextField
									containerClassName="px-2 col-span-1"
									name="firstName"
									label="Your First Name"
									value={values?.firstName}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.firstName && !!errors.firstName}
									helperText={touched.firstName && errors.firstName}
								/>
								<TextField
									containerClassName="px-2 col-span-1"
									name="lastName"
									label="Your Last Name"
									value={values?.lastName}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.lastName && !!errors.lastName}
								/>

								<TextField
									containerClassName="px-2 xl:col-span-1"
									name="company"
									label=" Company name"
									value={values?.company}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.company && !!errors.company}
								/>
								<TextField
									type="email"
									containerClassName="px-2 col-span-2 lg:col-span-1"
									name="email"
									label="Email Address"
									value={values?.email}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.email && !!errors.email}
								/>
								<TextField
									containerClassName="px-2 xl:col-span-1"
									name="title"
									label=" Your Role"
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
									label="Phone Number"
									value={values?.phone}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.phone && !!errors.phone}
								/>
								<TextField
									containerClassName="px-2 col-span-2"
									name="street"
									label=" Business Address"
									value={values.street}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.street && !!errors.street}
									helperText={touched.street && errors.street}
								/>
								<TextField
									containerClassName="px-2 xl:col-span-1"
									name="city"
									label="Business City"
									value={values.city}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.city && !!errors.city}
									helperText={touched.city && errors.city}
								/>

								<Select
									containerClassName="px-2 xl:col-span-auto"
									name="state"
									label="Business State"
									className="rounded border"
									defaultValue={values.state}
									values={usStatesAbbreviationList}
									setOption={handleChange}
								/>

								<TextField
									containerClassName="px-2 xl:col-span-1"
									name="zipcode"
									label="Business Zipcode"
									type="number"
									value={values.zipcode}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.zipcode && !!errors.zipcode}
									helperText={touched.zipcode && errors.zipcode}
								/>

								<Select
									values={['', ...serviceOptions]}
									containerClassName="px-2 col-span-2"
									name="whichServiceInterestedIn"
									label="What motivated you to contact us?"
									defaultValue={''}
									value={values?.whichServiceInterestedIn}
									onBlur={handleBlur}
									setOption={handleChange}
								/>

								<TextField
									containerClassName="px-2 col-span-2"
									name="serviceAreaRange"
									type="number"
									label="How many miles from your store location do you deliver?"
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
									label="On average, how many deliveries do you complete per week?"
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

								<TextField
									containerClassName="px-2 col-span-2"
									name="ecommerceUrl"
									label="Your Ecommerce Website"
									value={values.ecommerceUrl}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.ecommerceUrl && !!errors.ecommerceUrl}
									helperText={touched.ecommerceUrl && errors.ecommerceUrl}
								/>

								<TextArea
									rows={4}
									containerClassName="px-2 col-span-2"
									name="message"
									label="Additional Notes"
									placeholder={`Please share any goals, interests or inquires you have about 2X'ing your business.`}
									value={values?.message}
									onBlur={handleBlur}
									onChange={handleChange}
									error={!!touched.message && !!errors.message}
								/>

								{/* {values.whichServiceInterestedIn.includes('Delivery') && (
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
								)} */}
								<Select
									values={howDidYouHearAboutUsOptions}
									containerClassName="px-2 col-span-2"
									name="howDidYouHearAboutUs"
									label="How did you hear about us?"
									defaultValue={''}
									value={values?.howDidYouHearAboutUs}
									onBlur={handleBlur}
									setOption={handleChange}
								/>

								{/* <CheckBox
									className="px-2 pt-4 w-full col-span-full"
									name={'allowProcessResponse'}
									onChange={handleChange}
									checked={values.allowProcessResponse}
									label={`You allow us to store your contact information. 
							Gras will only use your information to contact your business.`}
								/> */}
								<CheckBox
									className="px-2 w-full col-span-full"
									name={'subscribeCannabisInsiderNewsletter'}
									onChange={handleChange}
									checked={values.subscribeCannabisInsiderNewsletter}
									label="Subscribe to our email newsletter for trends, culture and events."
								/>

								<Paragraph className="px-2 col-span-full mx-auto">{`Gras uses your information to support your business. 
								We will never sell your information.`}</Paragraph>

								<div className="mt-16 mb-8 lg:mb-0 col-span-2 place-self-center mx-2">
									<CTA
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
										cta={`Book your Success Call`}
									/>
								</div>
							</>
						) : (
							<div className="mt-4 mb-8 col-span-full">
								<CalInlineEmbed values={values} onSuccess={onSuccess} />
							</div>
						)}
					</Grid>
				</form>
				{/* <TypeFormEmbed /> */}
			</Grid>

			<hr className="border-2" />
		</div>
	);
}

// function TypeFormEmbed() {
// 	return (
// 		<Widget
// 			id="kOE4cSUn"
// 			className="h-full"
// 			hidden={{
// 				meetingLengthSeconds: '1800',
// 				ownerEmail: 'bryantmejia@gras.live',
// 			}}
// 		/>
// 	);
// }

const CalInlineEmbed = ({
	onSuccess,
	values,
}: {
	onSuccess: any;
	values: ContactUsFormResponse;
}) => {
	useEffect(() => {
		(async function () {
			const cal = await getCalApi({ namespace: 'success-call' });
			cal('ui', {
				styles: {
					branding: { brandColor: '#4BBE6E' },
				},
				hideEventTypeDetails: true,
				layout: 'month_view',
			});

			cal('preload', { calLink: 'bryant-mejia-gras/success-call' });

			cal('on', {
				action: 'bookingSuccessful',
				callback: () => {
					onSuccess?.();
				},
			});
		})();
	}, []);
	return (
		<Cal
			className="-mb-0 mx-auto"
			namespace="success-call"
			calLink="bryant-mejia-gras/success-call"
			style={{ width: '100%', height: '100%', overflow: 'hidden' }}
			config={{
				layout: 'month_view',
				name: `${values.firstName} ${values.lastName}`,
				company: values.company,
				email: values.email,
				phone: `+1-${values.phone}`,
				title: `Your 2X Success Call With Gras`,
				notes: `${values.message}
---
You're meeting with ${values.teamMember.name}, ${values.teamMember.role} to go over the #1 barrier to 2X the revenue of ${values.company || 'your cannabis business'} in the next 12 months with customer text messaging, event promotion and automation.
We look forward to working with you.
`,
			}}
		/>
	);
};
