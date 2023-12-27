import {
	type ConsumerCodeResponse,
	isLegalAgeAndVerified,
	TextContent,
	userActions,
} from '@cd/core-lib';
import { type UserWithDetails } from '@cd/data-access';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
	consumeCode,
	createCode,
	resendCode,
} from 'supertokens-auth-react/recipe/passwordless';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import logo from '../../../../public/assets/images/logo.png';
import Icons from '../../../icons';
import { styles } from '../../../styleClassNames';
import Button from '../../button/Button/Button';
import FlexBox from '../../FlexBox';
import Grid from '../../Grid';
import IconWrapper from '../../IconWrapper';
import TextField from '../../TextField/TextField';
import { H1, H3, H4, Paragraph, Small } from '../../Typography';
import Modal from '../Modal';

interface LoginModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function LoginModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: LoginModalProps) {
	const [formStep, setFormStep] = useState(0);
	const nextFormStep = () =>
		setFormStep((currentStep) =>
			currentStep <= 1 ? currentStep + 1 : currentStep,
		);
	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

	const FormStepComponents = [SendOTP, EnterOTP];

	const FormStepComponent = useMemo(
		() => FormStepComponents[formStep],
		[formStep],
	);

	const [inputValue, setInputValue] = useState('');

	function SendOTP() {
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

	function EnterOTP() {
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

		const handleOTPAndSignIn = async () => {
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
		};

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

		const checkAndResendOTP = async (e: any) => {
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

		const showResendOrCountdown = canSend ? 'Resend' : `Resend in ${counter}`;

		return (
			<form>
				<Grid className="relative space-y-2 max-w-[300px] md:w-2/3 m-auto">
					<Small>A one time passcode was sent to {inputValue}.</Small>
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
								bg={'transparent'}
								hover={'transparent'}
								onClick={checkAndResendOTP}
							>
								{showResendOrCountdown}
							</Button>

							<Button
								bg={'transparent'}
								hover={'transparent'}
								onClick={prevFormStep}
							>
								<IconWrapper
									Icon={Icons.ArrowLeft}
									className="text-dark pr-2"
								/>
								Change email
							</Button>
						</FlexBox>
					</FlexBox>
				</Grid>
			</form>
		);
	}

	const closeModalAndReset = () => {
		setOpenModal(false);
		setFormStep(0);
		dispatchCloseModal();
	};

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	return modalVisible ? (
		<Modal
			className={twMerge(styles.responsiveContainer, styles.padd)}
			modalVisible={openModal}
			onClose={closeModalAndReset}
			{...props}
		>
			<div className="mx-auto m-0 p-0 h-[400px]">
				<FlexBox className="mx-auto">
					<Image
						src={logo}
						alt="Gras Cannabis logo"
						width={53}
						height={53}
						priority
					/>
					<H3>Welcome to</H3>
					<H1>Gras</H1>
				</FlexBox>

				<H3 className="mx-auto">
					{/* {TextContent.info.CONNECT_WITH_WORLD_OF_CANNABIS} */}
					{TextContent.info.CANNABIS_DELIVERED}
				</H3>

				<FormStepComponent />
			</div>
		</Modal>
	) : (
		<></>
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

const passcodeValidationSchema = yup.object().shape({
	passcode: yup
		.string()
		.required('Invalid passcode.')
		.length(6, 'Invalid passcode.'),
});

export default LoginModal;
