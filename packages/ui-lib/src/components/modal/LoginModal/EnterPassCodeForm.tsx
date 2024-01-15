import {
	type ConsumerCodeResponse,
	isLegalAgeAndVerified,
	TextContent,
	userActions,
} from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
	consumeCode,
	resendCode,
} from 'supertokens-auth-react/recipe/passwordless';
import * as yup from 'yup';
import Icons from '../../../icons';
import Button from '../../button/Button/Button';
import FlexBox from '../../FlexBox';
import Grid from '../../Grid';
import IconWrapper from '../../IconWrapper';
import TextField from '../../TextField/TextField';
import { Paragraph } from '../../Typography';
import { type LoginFormComponentProps } from './LoginModal';

export default function EnterOTPForm({
	prevFormStep,
	inputValue,
	dispatchCloseModal,
}: LoginFormComponentProps) {
	const [, setCookie] = useCookies(['yesOver21']);
	const [loadingButton, setLoadingButton] = useState(false);

	const dispatch = useDispatch();

	const initialValues = { passcode: '' };

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
		validationSchema: passcodeValidationSchema,
	});

	// eslint-disable-next-line sonarjs/no-identical-functions
	function notifyValidation() {
		validateForm().then((errors) => {
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(Object.values(errors)[0].toString());
			}
		});
	}

	async function onSubmit() {
		try {
			if (!loadingButton) {
				setLoadingButton(true);
				handleOTPAndSignIn();
			}
		} catch (error: any) {
			setLoadingButton(false);
			console.error(error);
			toast.error(error.message);
		}
	}

	async function handleOTPAndSignIn() {
		try {
			const response = (await consumeCode({
				userInputCode: values.passcode,
			})) as unknown as ConsumerCodeResponse;
			console.info('OTP signin response', response);
			if (response.status === 'OK') {
				const { _user } = response as ConsumerCodeResponse;
				if (isLegalAgeAndVerified(_user.user as UserWithDetails)) {
					setCookie('yesOver21', 'true');
					console.debug('set yesOver21 cookie to true');
				}
				dispatch(
					userActions.signinUserSync({
						token: _user.token,
						user: _user.user as UserWithDetails,
					}),
				);
			}
			toast.success(TextContent.account.SIGNING_IN, { duration: 5000 });
			dispatchCloseModal();
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message, { duration: 10000 });
		}
	}

	const [counter, setCounter] = useState(15);
	const [canSend, setCanSend] = useState(false);

	useEffect(() => {
		let timer: any;
		if (!canSend) {
			if (counter > 0) {
				timer = setTimeout(() => setCounter((c) => c - 1), 1000);
			}
			if (counter <= 0) setCanSend(true);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [canSend, counter]);

	const resendOTP = async (e: any) => {
		e.preventDefault();
		e.stopPropagation();

		if (canSend) {
			setCounter(15);
			setCanSend(false);
			resendCode();
			toast.success(`A one time passcode has been sent to ${inputValue}.`, {
				duration: 5000,
			});
		}
	};

	const showResendOrCountdown = canSend
		? 'Resend Code'
		: `Resend in ${counter}`;

	return (
		<form>
			<Grid className="relative space-y-2 md:w-2/3 m-auto">
				<Paragraph>A one time passcode was sent to {inputValue}.</Paragraph>
				<TextField
					containerClassName="m-auto lg:flex-col lg:items-start"
					className="my-2 border text-center"
					autoComplete="off"
					type="text"
					name="passcode"
					label="passcode"
					placeholder=""
					value={values?.passcode}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.passcode && !!errors.passcode}
				/>
				<FlexBox className="py-2 space-y-8">
					<Button
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
						Sign In
					</Button>

					<FlexBox className="m-auto space-y-2">
						<Button
							className="underline"
							transparent
							onClick={resendOTP}
							disabled={!canSend}
						>
							Resend Code
						</Button>

						<Button
							className="underline"
							bg={'transparent'}
							hover={'transparent'}
							onClick={prevFormStep}
						>
							<IconWrapper Icon={Icons.ArrowLeft} className="text-dark pr-2" />
							Change email
						</Button>
					</FlexBox>
				</FlexBox>
			</Grid>
		</form>
	);
}

const passcodeValidationSchema = yup.object().shape({
	passcode: yup
		.string()
		.required('Invalid passcode.')
		.length(6, 'Invalid passcode.'),
});
