// import AgreeMessage from '@/components/auth/AgreeMessage';
// import GithubButton from '@/components/auth/GithubButton';
// import GoogleButton from '@/components/auth/GoogleButton';
// import { AuthLayout } from '@/components/layouts';
// import { Alert } from '@/components/shared';
// import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
// import TogglePasswordVisibility from '@/components/shared/TogglePasswordVisibility';
import { maxLengthPolicies } from '@cd/core-lib';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactElement,
} from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';
import logo from '../../../../public/assets/images/logo.png';
// import { Button, LoadingPage, Paragraph, TextField } from '@cd/ui-lib';
import { styles } from '../../../styleClassNames';
import Button from '../../button/Button';
import FlexBox from '../../FlexBox';
import LoadingPage from '../../LoadingPage';
import TextField from '../../TextField';
import { GrasSignature, H2 } from '../../Typography';
import Modal from '../Modal';
import EnterPasscode from './EnterPassCodeForm';
import LoginModalHeader from './LoginHeader';
import SendPasscode from './SendPassCodeForm';

interface LoginModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

export default function LoginModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: LoginModalProps) {
	const [formStep, setFormStep] = useState(0);

	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
	const nextFormStep = () =>
		setFormStep((currentStep) =>
			currentStep <= 1 ? currentStep + 1 : currentStep
		);

	const FormStepComponents: (({
		prevFormStep,
		nextFormStep,
	}: LoginFormComponentProps) => JSX.Element)[] = [SendPasscode, EnterPasscode];

	const FormStepComponent = useMemo<any>(
		() => FormStepComponents[formStep],
		[formStep]
	);

	const [inputValue, setInputValue] = useState('');

	const closeModalAndReset = () => {
		setOpenModal(false);
		setFormStep(0);
		dispatchCloseModal();
	};

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	const router = useRouter();
	const { status } = useSession();
	const { t } = useTranslation('common');
	const [recaptchaToken, setRecaptchaToken] = useState<string>('');
	const [message, setMessage] = useState<Message>({ text: null, status: null });
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const { error, success, token } = router.query as {
		error: string;
		success: string;
		token: string;
	};

	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	useEffect(() => {
		if (error) {
			setMessage({ text: error, status: 'error' });
		}

		if (success) {
			setMessage({ text: success, status: 'success' });
		}
	}, [error, success]);

	const redirectUrl = token ? `/invitations/${token}` : '/browse';

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required().email().max(maxLengthPolicies.email),
			password: Yup.string().required().max(maxLengthPolicies.password),
		}),
		onSubmit: async (values) => {
			const { email, password } = values;

			setMessage({ text: null, status: null });

			const response = await signIn('credentials', {
				email,
				password,
				// csrfToken,
				redirect: false,
				callbackUrl: redirectUrl,
				recaptchaToken,
			});

			formik.resetForm();
			recaptchaRef.current?.reset();

			if (response && !response.ok) {
				setMessage({ text: response.error, status: 'error' });
			}
		},
	});

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'authenticated') {
		router.push(redirectUrl);
	}

	const params = token ? `?token=${token}` : '';

	return modalVisible ? (
		<Modal
			className={twMerge(
				styles.responsiveContainer,
				'text-light relative p-0 m-0'
			)}
			modalVisible={openModal}
			onClose={closeModalAndReset}
			backdrop={require('../../../../public/events-3.png')}
			alt="Find Cannabis Events near you"
			{...props}
		>
			{/* <LoginModalHeader /> */}
			<FlexBox
				className={twMerge(styles.padd, 'p-20', 'w-fit mx-auto text-inverse')}
			>
				<FlexBox className="flex-row items-center gap-x-2 pt-2">
					<GrasSignature className="drop-shadow-lg pt-1 pb-0 mb-0 leading-3">
						Gras
					</GrasSignature>
					<Image
						alt="Gras"
						className="bg-inverse w-[36px] rounded-full"
						src={logo}
						quality={25}
					/>
				</FlexBox>
				<H2>{`Find cannabis events in your city`}</H2>

				<form onSubmit={formik.handleSubmit} className="text-light mx-auto">
					<div className="space-y-3">
						<TextField
							type="email"
							label="Email"
							name="email"
							placeholder={t('email')}
							value={formik.values.email}
							error={formik.touched.email ? !!formik.errors.email : undefined}
							helperText={formik.touched.email && formik.errors.email}
							onChange={formik.handleChange}
						/>
						<div className="relative flex">
							<TextField
								type={isPasswordVisible ? 'text' : 'password'}
								name="password"
								placeholder={t('password')}
								value={formik.values.password}
								label={
									<label className="label">
										<span className="label-text">{t('password')}</span>
										<span className="label-text-alt">
											<Link
												href="/auth/forgot-password"
												className="text-sm text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
											>
												{t('forgot-password')}
											</Link>
										</span>
									</label>
								}
								error={
									formik.touched.password ? !!formik.errors.password : undefined
								}
								helperText={formik.touched.password && formik.errors.password}
								onChange={formik.handleChange}
							/>
							{/* <TogglePasswordVisibility
							isPasswordVisible={isPasswordVisible}
							handlePasswordVisibility={handlePasswordVisibility}
						/> */}
						</div>
						{/* <GoogleReCAPTCHA
						recaptchaRef={recaptchaRef}
						onChange={setRecaptchaToken}
						siteKey={recaptchaSiteKey}
					/> */}
					</div>
					<div className="mt-3 space-y-3">
						<Button
							className="w-full font-bold bg-secondary-light hover:bg-primary-light"
							type="submit"
							color="primary"
							loading={formik.isSubmitting}
						>
							{t('sign-in')}
						</Button>
						{/* <AgreeMessage text={t('sign-in')} /> */}
					</div>
				</form>
			</FlexBox>
		</Modal>
	) : (
		<></>
	);
}

export interface LoginFormComponentProps {
	prevFormStep: () => void;
	nextFormStep: () => void;
	inputValue: string;
	setInputValue: (value: string) => void;
	dispatchCloseModal: () => void;
	signInSyncAction?: any;
}
