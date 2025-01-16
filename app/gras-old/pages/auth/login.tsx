import GithubButton from '@/components/auth/GithubButton';
import GoogleButton from '@/components/auth/GoogleButton';
import { Alert } from '@/components/shared';
import { authProviderEnabled } from '@/lib/auth';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';
import seoConfig from '@/lib/seo.config';
import { maxLengthPolicies } from '@gras/core/utils';
import {
	Button,
	FlexBox,
	GrasSignature,
	H2,
	LoadingPage,
	Page,
	Paragraph,
	styles,
	TextField,
	AgreeMessage,
	TogglePasswordVisibility,
	GoogleReCAPTCHA,
} from '@gras/ui';
import { useFormik } from 'formik';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';

import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
	type ReactElement,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import type { ComponentStatus } from 'react-daisyui/dist/types';
import type ReCAPTCHA from 'react-google-recaptcha';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';
import backdrop from '../../public/events-3.png';
import logo from '../../public/logo.png';

interface Message {
	text: string | null;
	status: ComponentStatus | null;
}

const Login: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken, authProviders, recaptchaSiteKey }) => {
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

	const redirectUrl = token
		? `/invitations/${token}`
		: env.redirectIfAuthenticated;

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
				csrfToken,
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

	const ImageBackdrop = useCallback(() => {
		return (
			<div className="absolute bg-secondary w-full h-full -z-20">
				<Image
					className="opacity-50 absolute w-full h-full object-cover"
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						zIndex: -1,
						objectFit: 'cover',
						objectPosition: '50% 40%',
					}}
					src={backdrop}
					alt={'Find Cannabis Events near you'}
				/>
			</div>
			// 	<div
			// 		className="flex h-full grow"
			// 		style={{
			// 			zIndex: -1,
			// 			backgroundColor: 'rgba(155,155,125,.25)',
			// 			position: 'absolute',
			// 			height: '100%',
			// 			width: '100%',
			// 			left: '0',
			// 			top: '0',
			// 		}}
			// 	></div>
			// </div>
		);
	}, [backdrop]);

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'authenticated') {
		router.push(redirectUrl);
	}

	const params = token ? `?token=${token}` : '';

	return (
		<>
			<NextSeo {...seoConfig} title={t('login-title')} />
			<Page className="bg-transparent m-0 p-0 md:p-0 lg:p-0">
				{/* <AuthLayout heading="welcome-back" description="log-in-to-account"> */}

				<ImageBackdrop />
				<FlexBox
					className={twMerge(
						styles.padd,
						'max-w-sm',
						'justify-self-center self-center place-self-center text-light px-8 m-auto'
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
					{message.text && message.status && (
						<Alert status={message.status} className="mb-5">
							{t(message.text)}
						</Alert>
					)}
					{/* <div className="rounded p-6 bg-inverse drop-shadow"> */}
					<div className="flex gap-2 flex-wrap">
						{authProviders.github && <GithubButton />}
						{authProviders.google && <GoogleButton />}
					</div>

					{(authProviders.github || authProviders.google) &&
						authProviders.credentials && (
							<div className="divider">{t('or')}</div>
						)}

					{authProviders.credentials && (
						<form onSubmit={formik.handleSubmit} className="mx-auto">
							<div className="space-y-3">
								<TextField
									type="email"
									label={t('sign-in-to-your-account')}
									name="email"
									placeholder={t('email')}
									value={formik.values.email}
									error={
										formik.touched.email ? !!formik.errors.email : undefined
									}
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
											formik.touched.password
												? !!formik.errors.password
												: undefined
										}
										helperText={
											formik.touched.password && formik.errors.password
										}
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
									siteKey={recaptchaSiteKey}
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
							</div>
						</form>
					)}

					{(authProviders.email || authProviders.saml) && (
						<div className="divider"></div>
					)}

					<div className="space-y-3">
						{authProviders.email && (
							<Link
								href={`/auth/magic-link${params}`}
								className="btn btn-outline w-full"
							>
								&nbsp;{t('sign-in-with-email')}
							</Link>
						)}

						{authProviders.saml && (
							<Link href="/auth/sso" className="btn btn-outline w-full">
								&nbsp;{t('continue-with-saml-sso')}
							</Link>
						)}
					</div>
					{/* </div> */}
					<Paragraph className="mt-3 mx-auto text-center text-sm">
						{t('dont-have-an-account')}
						<Link
							href={`/auth/join${params}`}
							className="font-semibold underline block text-light hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
						>
							&nbsp;{t('create-a-free-account')}
						</Link>
					</Paragraph>
				</FlexBox>
				{/* </AuthLayout> */}
			</Page>
		</>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { locale } = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			csrfToken: (await getCsrfToken(context)) || null,
			authProviders: authProviderEnabled(),
			recaptchaSiteKey: env.recaptcha.siteKey,
		},
	};
};

export default Login;
