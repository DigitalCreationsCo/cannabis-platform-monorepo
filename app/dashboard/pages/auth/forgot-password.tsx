import { AuthLayout } from '@/components/layouts';
import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
import env from '@/lib/env';
import type { NextPageWithLayout } from '@/lib/next.types';
import {
	defaultHeaders,
	type ApiResponse,
	maxLengthPolicies,
} from '@cd/core-lib';
import { Button, Paragraph, TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useRef, type ReactElement, useState } from 'react';
import type { default as ReCAPTCHA } from 'react-google-recaptcha';
import { default as toast } from 'react-hot-toast';
import * as Yup from 'yup';

const ForgotPassword: NextPageWithLayout<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recaptchaSiteKey }) => {
	const { t } = useTranslation('common');
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [recaptchaToken, setRecaptchaToken] = useState<string>('');

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required().email().max(maxLengthPolicies.email),
		}),
		onSubmit: async (values) => {
			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: defaultHeaders,
				body: JSON.stringify({
					...values,
					recaptchaToken,
				}),
			});

			const json = (await response.json()) as ApiResponse;

			formik.resetForm();
			recaptchaRef.current?.reset();

			if (!response.ok) {
				toast.error(json.error.message);
				return;
			}

			toast.success(t('password-reset-link-sent'));
		},
	});

	return (
		<>
			<Head>
				<title>{t('forgot-password-title')}</title>
			</Head>
			<div className="rounded p-6 border">
				<form onSubmit={formik.handleSubmit}>
					<div className="space-y-2">
						<TextField
							type="email"
							label="Email"
							name="email"
							placeholder="Email"
							value={formik.values.email}
							error={formik.touched.email ? !!formik.errors.email : undefined}
							helperText={formik.touched.email && formik.errors.email}
							onChange={formik.handleChange}
						/>
						<GoogleReCAPTCHA
							recaptchaRef={recaptchaRef}
							onChange={setRecaptchaToken}
							siteKey={recaptchaSiteKey}
						/>
					</div>
					<div className="mt-4">
						<Button
							type="submit"
							color="primary"
							loading={formik.isSubmitting}
							size="md"
						>
							{t('email-password-reset-link')}
						</Button>
					</div>
				</form>
			</div>
			<Paragraph className="text-center text-sm text-gray-600 mt-3">
				{t('already-have-an-account')}
				<Link
					href="/auth/login"
					className="font-medium text-primary hover:text-[color-mix(in_oklab,oklch(var(--p)),black_7%)]"
				>
					&nbsp;{t('sign-in')}
				</Link>
			</Paragraph>
		</>
	);
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout heading="reset-password">{page}</AuthLayout>;
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const { locale }: GetServerSidePropsContext = context;

	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
			recaptchaSiteKey: env.recaptcha.siteKey,
		},
	};
};

export default ForgotPassword;
