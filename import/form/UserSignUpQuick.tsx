import {
	axios,
	getFirstErrorOrNull,
	selectUserState,
	shuffle,
	TextContent,
	urlBuilder,
} from '@gras/core';
import {
	Button,
	FlexBox,
	Grid,
	H4,
	H6,
	Paragraph,
	styles,
	TermsAgreement,
	TextField,
	useFormContext,
} from '@gras/ui';
import { createId } from '@paralleldrive/cuid2';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { profilePictures } from '../../data/profilePicture';
import { userSignUpTour } from '../../tour/userSignUpTour';

function UserSignUpQuickForm() {
	const userState = useSelector(selectUserState);
	const user = useSelector(selectUserState).user;

	function startTour() {
		if (!userSignUpTour.isActivated) userSignUpTour.start();
	}

	useEffect(() => {
		if (window.location.pathname != '/') startTour();
	}, []);

	const { nextFormStep, prevFormStep, setFormValues, formValues } =
		useFormContext();

	useEffect(() => {
		console.debug('user signup formvalues: ', formValues);
	});

	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		id: user.id || createId(),
		firstName: formValues?.newUser?.firstName || '',
		lastName: formValues?.newUser?.lastName || '',
		username: formValues?.newUser?.username || '',
		email: user?.email || formValues?.newUser?.email || '',
		emailVerified: true,
		phone: formValues?.newUser?.phone || '',
		dialCode: '1',
		termsAccepted: false,
		profilePicture: { location: '' },
	};

	const validationSchema = yup.object().shape({
		id: yup.string().required('Id is required').min(3, 'Id is required'),
		firstName: yup
			.string()
			.required(TextContent.prompt.FIRST_NAME_REQUIRED)
			.min(3, ({ min }) => TextContent.prompt.FIRST_NAME_MINIMUM_f(min)),
		lastName: yup
			.string()
			.required(TextContent.prompt.LAST_NAME_REQUIRED)
			.min(3, ({ min }) => TextContent.prompt.LAST_NAME_MINIMUM_f(min)),
		username: yup
			.string()
			.required(TextContent.prompt.USERNAME_REQUIRED)
			.min(5, ({ min }) => TextContent.prompt.USERNAME_MINIMUM_f(min)),
		email: yup
			.string()
			.email(TextContent.prompt.EMAIL_INVALID)
			.required(TextContent.prompt.EMAIL_REQUIRED),
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
		profilePicture: yup.object().shape({
			location: yup
				.string()
				.required(TextContent.prompt.PROFILE_PICTURE_REQUIRED)
				.typeError(TextContent.prompt.PROFILE_PICTURE_REQUIRED),
		}),
	});

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			const response = await axios.post(urlBuilder.shop + '/api/user', {
				...values,
				...formValues.newUser,
			});
			console.log('signup response: ', response);

			if (!response.data.success || response.data.success === 'false')
				throw new Error(response.data.message || response.data.error);

			setFormValues({
				newUser: {
					...response.data.payload,
				},
			});
			setLoadingButton(false);
			nextFormStep();
		} catch (error: any) {
			console.info('User Create Error: ', error);
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
		setFieldValue,
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors));
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

	const shuffledAvatarImages = useRef(profilePictures);
	useEffect(() => {
		shuffledAvatarImages.current = shuffle(profilePictures);
	}, []);

	const [selectedProfilePicture, setSelectedProfilePicture] = useState(0);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleSubmit();
			}}
		>
			<H4 id="user-signup-step-1">Create your account</H4>

			<Grid className="grid-cols-2 gap-4">
				<Paragraph className="col-span-2">
					* Please fill the required fields.
				</Paragraph>

				<FlexBox className="col-span-2 flex-row space-x-4">
					<TextField
						id="user-signup-step-2"
						name="phone"
						label="* phone number"
						placeholder="your phone number"
						value={values.phone}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.phone && !!errors.phone}
						helperText={touched.phone && errors.phone}
					/>
				</FlexBox>
				<TextField
					containerClassName="col-span-1 md:col-span-2"
					name="firstName"
					label="* first name"
					placeholder="your first name"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.firstName}
					error={!!touched.firstName && !!errors.firstName}
					helperText={touched.firstName && errors.firstName}
				/>
				<TextField
					containerClassName="col-span-1 md:col-span-2"
					name="lastName"
					label="* last name"
					placeholder="your last name"
					value={values.lastName}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.lastName && !!errors.lastName}
					helperText={touched.lastName && errors.lastName}
				/>
				<TextField
					containerClassName="col-span-2"
					name="email"
					type="email"
					label="* email address"
					onBlur={handleBlur}
					value={values.email}
					onChange={handleChange}
					disabled={!!user?.email}
					placeholder="your email address"
					error={!!touched.email && !!errors.email}
					helperText={touched.email && errors.email}
				/>

				<Paragraph id="avatar-button-0" className="col-span-2">
					{TextContent.account.CHOOSE_PROFILE_PICTURE}
				</Paragraph>

				<Grid className="col-span-2 grid-cols-2 space-y-4 sm:grid-cols-3">
					{shuffledAvatarImages.current.map((img: string, index: number) => {
						return (
							<Button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setSelectedProfilePicture(index);
									setFieldValue('profilePicture.location', img);
								}}
								id={`avatar-button-${index}`}
								key={`avatar-button-${index}`}
								size="sm"
								bg="transparent"
								className={twMerge(
									styles.BUTTON['highlight'],
									styles.BUTTON['round_image_btn'],
									index === selectedProfilePicture
										? ['border-2 border-primary']
										: ['border-2 border-transparent'],
								)}
							>
								<Image
									className="rounded-full,  h-32 w-32 object-cover"
									key={`avatar-${index}`}
									alt={`avatar-${index}`}
									src={img}
									width={100}
									height={100}
									unoptimized
									loader={({ src }) => src}
								/>
							</Button>
						);
					})}
				</Grid>

				<TextField
					id="user-signup-step-3"
					containerClassName="col-span-2"
					name="username"
					label="* Choose a username"
					placeholder="Choose a username"
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.username}
					error={!!touched.username && !!errors.username}
					helperText={touched.username && errors.username}
				/>
				<div id="user-signup-step-4" className="col-span-2 w-full">
					<TermsAgreement
						className="col-span-2 w-full"
						name="termsAccepted"
						onChange={(e) => handleChange(e)}
						checked={values.termsAccepted}
						helperText={touched.termsAccepted && errors.termsAccepted}
						error={!!touched.termsAccepted && !!errors.termsAccepted}
						description={
							<>
								<div id="dispensary-create-step-3" className="inline-block">
									<Paragraph className="inline">
										{TextContent.legal.AGREE_TO_TERMS}{' '}
									</Paragraph>
									<a
										href={TextContent.href.user_tos}
										target="_blank"
										rel="noreferrer noopener"
										className="inline-block"
									>
										<H6 className={'inline-block border-b-2'}>
											{TextContent.legal.USER_TERMS_OF_SERVICE}
										</H6>
										.
									</a>
								</div>
							</>
						}
						label={TextContent.legal.I_AGREE_TO_THE_USER_TERMS}
					/>
				</div>
				<FlexBox className="col-span-2 flex-row justify-evenly space-x-8 py-4">
					<Button
						disabled={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							prevFormStep();
						}}
					>
						{TextContent.ui.BACK}
					</Button>

					<Button
						id="user-signup-step-5"
						type="submit"
						loading={loadingButton}
						disabled={loadingButton}
						className="place-self-center"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						{TextContent.ui.CONTINUE}
					</Button>
				</FlexBox>
			</Grid>
		</form>
	);
}

export default UserSignUpQuickForm;
