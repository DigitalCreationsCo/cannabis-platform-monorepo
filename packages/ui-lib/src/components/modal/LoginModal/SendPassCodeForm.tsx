import { TextContent } from '@cd/core-lib';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { createCode } from 'supertokens-auth-react/recipe/passwordless';
import * as yup from 'yup';
import Button from '../../button/Button/Button';
import FlexBox from '../../FlexBox';
import Grid from '../../Grid';
import TextField from '../../TextField/TextField';
import { type LoginFormComponentProps } from './LoginModal';

export default function SendOTPForm({
	nextFormStep,
	setInputValue,
}: LoginFormComponentProps) {
	const initialValues = { emailOrPhone: '' };
	const [isInputPhone, setIsInputPhone] = useState(false);

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
		// resetForm,
		validateForm,
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema: () =>
			isInputPhone ? phoneValidationSchema : emailValidationSchema,
	});

	useEffect(() => {
		const switchInputEmailOrPhone = () => {
			values.emailOrPhone.match(/^\+?\d+$/g)
				? setIsInputPhone(true)
				: setIsInputPhone(false);
		};
		switchInputEmailOrPhone();
	}, [values.emailOrPhone]);

	useEffect(() => {
		if (isInputPhone && values.emailOrPhone.length === 1) {
			if (values.emailOrPhone === '1') setFieldValue('emailOrPhone', '+1');
			else setFieldValue('emailOrPhone', '+1' + values.emailOrPhone);
		} else setFieldValue('emailOrPhone', values.emailOrPhone);
	}, [isInputPhone]);

	function notifyValidation() {
		validateForm().then((errors) => {
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(Object.values(errors)[0].toString());
			}
		});
	}

	const [loading, setLoading] = useState(false);

	async function onSubmit() {
		try {
			if (!loading) {
				setLoading(true);
				setInputValue(values.emailOrPhone);
				if (isInputPhone) {
					await createCode({ phoneNumber: values.emailOrPhone });
					// await createCode({ phoneNumber: values.emailOrPhone });
					toast.success(
						TextContent.account.ONETIME_PASSCODE_SENT_MOBILE_f(
							values.emailOrPhone,
						),
						{
							duration: 5000,
						},
					);
				} else {
					await createCode({ email: values.emailOrPhone });
					toast.success(
						TextContent.account.ONETIME_PASSCODE_SENT_EMAIL_f(
							values.emailOrPhone,
						),
						{ duration: 5000 },
					);
				}
				nextFormStep();
			}
		} catch (error: any) {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
			console.error(error);
			toast.error(error.message);
		}
	}

	return (
		<form>
			<Grid className="space-y-2">
				<TextField
					containerClassName=""
					className="my-2 border text-center"
					autoComplete="off"
					name="emailOrPhone"
					placeholder="your email or phone #"
					maxLength={isInputPhone ? 12 : 35}
					label={TextContent.account.SIGNIN_EMAIL_OR_PHONE}
					justifyLabel="center"
					value={values.emailOrPhone}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.emailOrPhone && !!errors.emailOrPhone}
				/>
				<FlexBox className="py-2">
					<Button
						type="submit"
						loading={loading}
						className="place-self-center"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						Continue
					</Button>
				</FlexBox>
				{/* <FlexBox className="flex-col mx-auto justify-center">
					<Paragraph className="text-lg mx-auto text-center">
						Are you a dispensary?
					</Paragraph>
					<Link
						className="mx-auto"
						href="/signup/create-dispensary-account"
						onClickCapture={dispatchCloseModal}
					>
						<H4 className="underline text-lg text-center">
							{TextContent.account.CREATE_DISPENSARY_ACCOUNT}
						</H4>
					</Link>
				</FlexBox> */}
			</Grid>
		</form>
	);
}

const emailValidationSchema = yup.object().shape({
	emailOrPhone: yup
		.string()
		.email('Not a valid email.')
		.required(TextContent.account.SIGNIN_EMAIL),
});

const phoneValidationSchema = yup.object().shape({
	emailOrPhone: yup
		.string()
		.length(12, 'Phone number must be 11 digits')
		.required('Sign in with your phone number.'),
});
