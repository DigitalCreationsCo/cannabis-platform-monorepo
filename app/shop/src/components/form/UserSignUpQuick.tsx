import { selectUserState, shuffle, TextContent } from '@cd/core-lib';
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
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { profilePictures } from '../../data/profilePicture';
import { userSignUpTour } from '../../tour/userSignUpTour';

// test the record create in db
// test the profile picture is appearing

function UserSignUpQuickForm() {
	const user = useSelector(selectUserState).user;

	function startTour() {
		if (!userSignUpTour.isActivated) userSignUpTour.start();
	}

	useEffect(() => {
		startTour();
	}, []);

	const { nextFormStep, prevFormStep, setFormValues, formValues } =
		useFormContext();

	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		firstName: formValues?.newUser?.firstName || '',
		lastName: formValues?.newUser?.lastName || '',
		username: formValues?.newUser?.username || '',
		email: user?.email || formValues?.newUser?.email || '',
		phone: formValues?.newUser?.phone || '',
		dialCode: '1',
		termsAccepted: false,
		profilePicture: {},
	};

	const validationSchema = yup.object().shape({
		firstName: yup
			.string()
			.required('First name is required')
			.min(3, 'First name is required'),
		lastName: yup
			.string()
			.required('Last name is required')
			.min(3, 'Last name is required'),
		username: yup
			.string()
			.required('Username is required')
			.min(6, 'Username is required'),
		email: yup.string().email('invalid email').required('Email is required'),
		phone: yup
			.string()
			.required('Phone number is required')
			.length(10, 'Phone number must be 10 digits'),
		termsAccepted: yup
			.bool()
			.test(
				'termsAccepted',
				'Please read and agree to our User Terms and Conditions.',
				(value) => value === true,
			),
		profilePicture: yup
			.string()
			.required(`You didn't select a profile picture`)
			.typeError(`You didn't select a profile picture`),
	});

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			setFormValues({
				newUser: {
					...values,
					profilePicture: {
						location: values.profilePicture,
					},
				},
			});
			setLoadingButton(false);
			nextFormStep();
		} catch (error: any) {
			console.info('User Create Error: ', error);
			toast.error(error.response.data.message || error.response.data.errors);
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

	const shuffled = useRef(profilePictures);
	useEffect(() => {
		shuffled.current = shuffle(profilePictures);
	}, []);

	const [selected, setSelected] = useState(0);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				handleSubmit();
			}}
		>
			<H4 id="user-signup-step-1">Create your account</H4>

			<Grid className="grid-cols-2 space-y-4">
				<Paragraph className="col-span-2" id="user-signup-step-2">
					* Please fill the required fields.
				</Paragraph>

				<FlexBox className="col-span-2 flex-row space-x-4">
					<TextField
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
				<FlexBox className="col-span-2 flex-row space-x-4">
					<TextField
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
						name="lastName"
						label="* last name"
						placeholder="your last name"
						value={values.lastName}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.lastName && !!errors.lastName}
						helperText={touched.lastName && errors.lastName}
					/>
				</FlexBox>
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

				<Paragraph id="user-signup-step-1" className="col-span-2">
					{TextContent.account.CHOOSE_PROFILE_PICTURE}
				</Paragraph>

				<Grid className="col-span-2 grid-cols-2 space-y-4 sm:grid-cols-3">
					{shuffled.current.map((pic: string, index: number) => {
						return (
							<Button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setSelected(index);
									setFieldValue('profilePicture', pic);
								}}
								id={`avatar-button-${index}`}
								key={`avatar-button-${index}`}
								size="sm"
								bg="transparent"
								className={twMerge(
									styles.BUTTON['highlight'],
									styles.BUTTON['round-image-btn'],
									index === selected
										? ['border-2 border-primary']
										: ['border-2 border-transparent'],
								)}
							>
								<img
									className="rounded-full,  h-32 w-32 object-cover"
									key={`avatar-${index}`}
									src={pic}
									alt={`avatar-${index}`}
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

				<TermsAgreement
					id="user-signup-step-4"
					className="col-span-2"
					name="termsAccepted"
					onChange={(e) => handleChange(e)}
					checked={values.termsAccepted}
					helperText={touched.termsAccepted && errors.termsAccepted}
					error={!!touched.termsAccepted && !!errors.termsAccepted}
					description={
						<>
							{TextContent.legal.AGREE_TO_TERMS}
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
					label={`I agree to the User Terms and Conditions`}
				/>
				<FlexBox className="col-span-2 flex-row justify-center space-x-4 py-2">
					<Button
						loading={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							prevFormStep();
						}}
					>
						go back
					</Button>

					<Button
						id="user-signup-step-5"
						type="submit"
						className="place-self-center"
						loading={loadingButton}
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

export default UserSignUpQuickForm;
