import { TextContent } from '@cd/core-lib';
import {
	type AddressUserCreateType,
	type UserCreateType,
} from '@cd/data-access';
import {
	Button,
	FlexBox,
	FormCard,
	Grid,
	H3,
	H6,
	Paragraph,
	TermsAgreement,
	TextField,
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

function UserSignUpForm() {
	const [loadingButton] = useState(false);

	const initialValues: Omit<UserCreateType, 'address'> & {
		address: AddressUserCreateType;
	} = {
		firstName: 'Bryant',
		lastName: 'Mejia',
		username: 'bigchiefa1111',
		email: 'bmejia2345@gmail.com',
		phone: '1233455678',
		dialCode: '1',
		termsAccepted: false,
		profilePicture: {
			id: '',
			location: '',
			alt: '',
		},
		address: {
			id: '',
			street1: '123 MLK Ave',
			street2: 'Suite 900',
			city: 'Philadelphia',
			state: 'PA',
			zipcode: 19130,
			country: 'United States',
			countryCode: 'US',
			userId: '',
			coordinateId: '',
		},
		emailVerified: false,
		is_legal_age: false,
		id_verified: false,
		isSignUpComplete: false,
		memberships: [],
	};

	const validationSchema = yup.object().shape({
		username: yup.string().required('Username is required'),
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		email: yup.string().email('invalid email').required('Email is required'),
		password: yup
			.string()
			.required('Password is required')
			.min(8, 'Password must be at least 8 characters'),
		re_password: yup
			.string()
			.oneOf([yup.ref('password'), null], 'Passwords must match')
			.required('Please re-type password'),
		termsAccepted: yup
			.bool()
			.test(
				'termsAccepted',
				'Please read and agree to our User Terms and Conditions.',
				(value) => value === true,
			),
		phone: yup
			.string()
			.required('Phone number is required')
			.length(10, 'Phone number must be 10 digits'),
		dialCode: yup.string().required('Dialing code is required'),
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

	// TEST
	async function onSubmit() {
		// const response = await signUpUser();
		// dispatch(userActions.signinUserSync({ user: response?.user }));
		// router.push('/');
		// async function signUpUser() {
		//     try {
		//         if (!loadingButton) {
		//             setLoadingButton(true);
		//             const response = await signUp({
		//                 formFields: [
		//                     { id: 'email', value: values.email },
		//                     { id: 'emailVerified', value: false.toString() },
		//                     { id: 'password', value: values.password },
		//                     { id: 're_password', value: values.re_password },
		//                     { id: 'username', value: values.username },
		//                     { id: 'firstName', value: values.firstName },
		//                     { id: 'lastName', value: values.lastName },
		//                     { id: 'dialCode', value: values.dialCode },
		//                     { id: 'phone', value: values.phone },
		//                     { id: 'termsAccepted', value: values.termsAccepted.toString() },
		//                     { id: 'street1', value: values.address.street1 },
		//                     { id: 'street2', value: values.address.street2 || '' },
		//                     { id: 'city', value: values.address.city },
		//                     { id: 'state', value: values.address.state },
		//                     { id: 'zipcode', value: values.address.zipcode },
		//                     { id: 'country', value: values.address.country },
		//                     { id: 'countryCode', value: values.address.countryCode || '' },
		//                     { id: 'is_legal_age', value: values.is_legal_age.toString() },
		//                     { id: 'id_verified', value: values.id_verified.toString() },
		//                 ]
		//             });
		//             if (response.status === 'FIELD_ERROR') {
		//                 console.info('signup error: ', response.formFields[0].error);
		//                 throw new Error(response.formFields[0].error);
		//             }
		//             console.info('signup error: ', response.status);
		//             if (response.status === 'OK') {
		//                 console.info('signup ok');
		//                 toast.success('Your account is created.', { duration: 5000 });
		//                 return response;
		//             }
		//         }
		//     } catch (error: any) {
		//         setLoadingButton(false);
		//         console.error('create acount error: ', error);
		//         toast.error(error.message);
		//         return null;
		//     }
		// }
	}

	return (
		<FormCard className="m-auto px-12">
			<form onSubmit={handleSubmit}>
				<H3>{`Create an account`}</H3>
				<H3>{`Get Cannabis Delivered 🌴🔥`}</H3>
				<Paragraph>
					Please fill all the fields and continue to create your dispensary
					account.
				</Paragraph>
				<Grid className="space-y-2">
					<TextField
						name="username"
						label="UserName"
						placeholder="Choose your username"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.username}
						error={!!touched.username && !!errors.username}
						helperText={touched.username && errors.username}
					/>
					{/* <TextField
                        name="password"
                        label="Password"
                        placeholder="********"
                        value={values?.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        type={passwordVisibility ? 'text' : 'password'}
                        insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                        onClickIcon={togglePasswordVisibility}
                    />
                    <TextField
                        name="re_password"
                        label="Confirm Password"
                        placeholder="********"
                        value={values?.re_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.re_password && !!errors.re_password}
                        helperText={touched.re_password && errors.re_password}
                        type={passwordVisibility ? 'text' : 'password'}
                        insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                        onClickIcon={togglePasswordVisibility}
                    /> */}
					<TextField
						name="firstName"
						label="First Name"
						placeholder="first name"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.firstName}
						error={!!touched.firstName && !!errors.firstName}
						helperText={touched.firstName && errors.firstName}
					/>
					<TextField
						name="lastName"
						label="Last Name"
						placeholder="last name"
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.lastName}
						error={!!touched.lastName && !!errors.lastName}
						helperText={touched.lastName && errors.lastName}
					/>
					<TextField
						name="email"
						type="email"
						label="Email"
						onBlur={handleBlur}
						value={values.email}
						onChange={handleChange}
						placeholder="email address"
						error={!!touched.email && !!errors.email}
						helperText={touched.email && errors.email}
					/>
					<FlexBox className="flex-row space-x-4">
						<TextField
							name="dialCode"
							label="Dial Code"
							placeholder="Dial Code"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.dialCode}
							error={!!touched.dialCode && !!errors.dialCode}
							helperText={touched.dialCode && errors.dialCode}
						/>
						<TextField
							name="phone"
							label="Phone"
							placeholder="Phone"
							value={values?.phone}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.phone && !!errors.phone}
							helperText={touched.phone && errors.phone}
						/>
					</FlexBox>
					<Paragraph>What is your address for delivery?</Paragraph>
					<TextField
						name="address.street1"
						label="Street Line 1"
						placeholder="Street Line 1"
						value={values?.address?.street1}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.street1 && !!errors?.address?.street1}
						helperText={touched?.address?.street1 && errors?.address?.street1}
					/>
					<TextField
						name="address.street2"
						label="Street Line 2"
						placeholder="Street Line 2"
						value={values?.address?.street2 || ''}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.street2 && !!errors?.address?.street2}
						helperText={touched?.address?.street2 && errors?.address?.street2}
					/>
					<TextField
						name="address.city"
						label="City"
						placeholder="City"
						value={values?.address?.city}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.city && !!errors?.address?.city}
						helperText={touched?.address?.city && errors?.address?.city}
					/>
					<TextField
						name="address.state"
						label="State"
						placeholder="State"
						value={values?.address?.state}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.state && !!errors?.address?.state}
						helperText={touched?.address?.state && errors?.address?.state}
					/>
					<TextField
						name="address.country"
						label="Country"
						placeholder="Country"
						value={values?.address?.country}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.country && !!errors?.address?.country}
						helperText={touched?.address?.country && errors?.address?.country}
					/>
					<TextField
						name="address.zipcode"
						label="Zipcode"
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
						error={!!touched.termsAccepted && !!errors.termsAccepted}
						description={
							<Paragraph>
								{`Before creating an account with Gras, please read our `}
								<a
									href={TextContent.href.user_tos}
									target="_blank"
									rel="noreferrer noopener"
								>
									<H6 className={'inline-block border-b-2'}>
										User Terms and Conditions
									</H6>
									.
								</a>
							</Paragraph>
						}
						label={TextContent.legal.I_AGREE_TO_THE_USER_TERMS}
					/>

					<Button
						className="place-self-center"
						loading={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
						disabled={values.termsAccepted === false}
					>
						Next
					</Button>
				</Grid>
			</form>
		</FormCard>
	);
}

export default UserSignUpForm;
