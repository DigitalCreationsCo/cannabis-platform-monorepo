import { maxLengthPolicies } from '@cd/core-lib';
import {
	Button,
	Center,
	FlexBox,
	Footer,
	H1,
	LoadingPage,
	Page,
	Benefit,
	Paragraph,
	TextField,
	PlainTopBar,
} from '@cd/ui-lib';
import { unlockYourGrowth } from '@cd/ui-lib/src/components/landing/benefits/benefit-data';
import { useFormik } from 'formik';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
	type ReactElement,
	useEffect,
	useState,
	useRef,
	type PropsWithChildren,
} from 'react';
import type { ComponentStatus } from 'react-daisyui/dist/types';
// eslint-disable-next-line import/no-named-as-default
import type ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import AgreeMessage from '@/components/auth/AgreeMessage';
import GithubButton from '@/components/auth/GithubButton';
import GoogleButton from '@/components/auth/GoogleButton';
import { Alert } from '@/components/shared';
import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
import TogglePasswordVisibility from '@/components/shared/TogglePasswordVisibility';
import { authProviderEnabled } from '@/lib/auth';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';
import SEOMetaTags from '@/lib/SEOMetaTags';
import backdrop from 'public/marijuana-backdrop.png';

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

	if (status === 'loading') {
		return <LoadingPage />;
	}

	if (status === 'authenticated') {
		router.push(redirectUrl);
	}

	const params = token ? `?token=${token}` : '';

	return (
		<>
			<SEOMetaTags
				title={`${t('log-in-to-business-account')} | ${t('dispensary-success-services')}`}
			/>
			<Page className="bg-transparent border-b m-0 flex grow p-0 md:p-0 lg:p-0">
				<ImageBackDrop src={backdrop}>
					<PlainTopBar className={'!bg-transparent'} />
					<Center className="gap-8 pb-12">
						<FlexBox className="lg:flex-row gap-x-24 gap-y-8">
							<div className="flex flex-col gap-y-6 mx-auto md:mt-20">
								{unlockYourGrowth.bullets.map((item, index) => (
									<Benefit
										key={index}
										title={item.title || ''}
										icon={item.icon}
										description={item.description}
										valueColor={'text-light'}
									/>
								))}
							</div>
							<FlexBox className="items-center space-y-2 mx-auto">
								<H1 className="text-light !text-lg lg:!text-xl !font-normal text-center">
									{t('log-in-to-business-account')}
								</H1>
								{message.text && message.status && (
									<Alert status={message.status} className="mb-5">
										{t(message.text)}
									</Alert>
								)}
								<div className="rounded p-6 pt-0 sm:pt-6 sm:bg-inverse text-light sm:text-dark drop-shadow">
									<div className="flex gap-2 flex-wrap">
										{authProviders.github && <GithubButton />}
										{authProviders.google && <GoogleButton />}
									</div>

									{(authProviders.github || authProviders.google) &&
										authProviders.credentials && (
											<div className="divider">{t('or')}</div>
										)}

									{authProviders.credentials && (
										<form onSubmit={formik.handleSubmit}>
											<div className="space-y-3">
												<TextField
													type="email"
													label="Email"
													name="email"
													placeholder={t('email')}
													value={formik.values.email}
													error={
														formik.touched.email
															? !!formik.errors.email
															: undefined
													}
													helperText={
														formik.touched.email && formik.errors.email
													}
													onChange={formik.handleChange}
												/>
												<div className="relative flex items-center content-center justify-center">
													<TextField
														type={isPasswordVisible ? 'text' : 'password'}
														name="password"
														placeholder={t('password')}
														value={formik.values.password}
														label={
															<>
																<span className="label-text">
																	{t('password')}
																</span>
																<span className="label-text-alt">
																	<Link
																		href="/auth/forgot-password"
																		className="text-sm underline hover:text-light sm:hover:!text-dark text-primary"
																	>
																		{t('forgot-password')}
																	</Link>
																</span>
															</>
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
												<div className="w-fit m-auto">
													<GoogleReCAPTCHA
														recaptchaRef={recaptchaRef}
														onChange={setRecaptchaToken}
														siteKey={recaptchaSiteKey}
													/>
												</div>
												<div className="text-light sm:text-dark mt-3 pt-3 space-y-3">
													<Button
														className="text-light sm:text-dark w-full font-bold bg-secondary-light hover:bg-primary-light"
														type="submit"
														color="primary"
														loading={formik.isSubmitting}
													>
														{t('sign-in')}
													</Button>
													<AgreeMessage text={t('sign-in')} />
												</div>
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
									<Paragraph className="text-center text-sm text-light sm:text-gray-600 mt-3">
										{t('dont-have-an-account')}
										<Link
											href={`/auth/join${params}`}
											className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
										>
											&nbsp;{t('create-a-business-account')}
										</Link>
									</Paragraph>
								</div>
							</FlexBox>
						</FlexBox>
					</Center>
				</ImageBackDrop>
			</Page>
		</>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			{page}
			<Footer />
		</>
	);
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

const ImageBackDrop = ({
	src,
	children,
}: { src: string | StaticImageData } & PropsWithChildren) => {
	return (
		<div className="relative flex flex-col w-full h-full grow">
			<Image
				src={src}
				alt=""
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: -1,
					objectFit: 'cover',
					objectPosition: '80% 40%',
				}}
				priority
				quality={100}
			/>
			<div
				className="flex h-full grow"
				style={{
					zIndex: -1,
					backgroundColor: 'rgba(155,155,125,.25)',
					position: 'absolute',
					height: '100%',
					width: '100%',
					left: '0',
					top: '0',
				}}
			></div>
			{children}
		</div>
	);
};
