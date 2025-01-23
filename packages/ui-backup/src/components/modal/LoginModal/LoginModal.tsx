"use client"
// import AgreeMessage from '@/components/auth/AgreeMessage';
// import GithubButton from '@/components/auth/GithubButton';
// import GoogleButton from '@/components/auth/GoogleButton';
// import { AuthLayout } from '@/components/layouts';
// import { Alert } from '@/components/shared';
import { type AppState } from '../../../../../core/src/types';
import { maxLengthPolicies } from '../../../../../core/src/utils';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ReCAPTCHA } from 'react-google-recaptcha';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';
import logo from '../../../../public/assets/images/logo.png';
import { styles } from '../../../styleClassNames';
import AgreeMessage from '../../AgreeMessage';
import Button from '../../button/Button';
import FlexBox from '../../FlexBox';
import GoogleReCAPTCHA from '../../GoogleReCAPTCHA';
import LoadingPage from '../../LoadingPage';
import TextField from '../../TextField';
import TogglePasswordVisibility from '../../TogglePasswordVisibility';
import { GrasSignature, H2, Paragraph } from '../../Typography';
import Modal from '../Modal';
import EnterPasscode from './EnterPassCodeForm';
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
	const params = useSearchParams();
	const { status } = useSession();
	const t = useTranslations('common');
	const [recaptchaToken, setRecaptchaToken] = useState<string>('');
	const [message, setMessage] = useState<any>({ text: null, status: null });
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const error = params.get("error")
	const success = params.get("success")
	const token = params.get("token")
	
	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const { recaptcha } = useSelector((state: AppState) => state.env);

	useEffect(() => {
		if (error) {
			setMessage({ text: error, status: 'error' });
		}

		if (success) {
			setMessage({ text: success, status: 'success' });
		}
	}, [error, success]);

	const redirectUrl =
		typeof window !== 'undefined' && token
			? `/invitations/${token}`
			: window.location.pathname || '/';

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

	const tokenParams= token ? `?token=${token}` : '';

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
				className={twMerge(
					styles.padd,
					'h-full self-center align-middle justify-center place-self-center justify-self-center max-w-fit px-8 m-auto text-light'
				)}
			>
				<FlexBox className="text-inverse flex-row items-center gap-x-2 pt-2">
					<Image
						alt="Gras"
						className="bg-inverse w-[40px] rounded-full"
						src={logo}
						quality={25}
					/>
					<GrasSignature className="drop-shadow-lg pt-1 pb-0 mb-0 leading-3">
						Gras
					</GrasSignature>
				</FlexBox>
				<H2>{t('find-cannabis-events-in-your-city')}</H2>

				<form onSubmit={formik.handleSubmit} className="text-light mx-auto">
					<div className="space-y-3">
						<TextField
							type="email"
							label={t('sign-in-to-your-account')}
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
									<label className="flex w-full justify-between">
										<span>{t('password')}</span>
										<span className="label-text-alt">
											<Link
												href="/auth/forgot-password"
												className="mx-auto self-center text-sm text-light underline hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
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
							<TogglePasswordVisibility
								isPasswordVisible={isPasswordVisible}
								handlePasswordVisibility={handlePasswordVisibility}
							/>
						</div>
						<GoogleReCAPTCHA
							recaptchaRef={recaptchaRef}
							onChange={setRecaptchaToken}
							siteKey={recaptcha.siteKey}
						/>
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
						<AgreeMessage text={t('sign-in')} />
						<Paragraph className="text-center text-sm">
							{t('dont-have-an-account')}
							<Link
								href={`/auth/join${tokenParams}`}
								className="font-semibold underline block hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
							>
								&nbsp;{t('create-a-free-account')}
							</Link>
						</Paragraph>
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
