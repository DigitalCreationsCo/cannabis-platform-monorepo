import { InputWithLabel } from '@/components/shared';
import {
	type ApiResponse,
	defaultHeaders,
	maxLengthPolicies,
	passwordPolicies,
} from '@cd/core-lib';
import { Button, TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { track } from 'mixpanel-browser';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import GoogleReCAPTCHA from '../shared/GoogleReCAPTCHA';
import TogglePasswordVisibility from '../shared/TogglePasswordVisibility';
import AgreeMessage from './AgreeMessage';

interface JoinProps {
	recaptchaSiteKey: string | null;
}

const JoinUserSchema = Yup.object().shape({
	name: Yup.string().required().max(maxLengthPolicies.name),
	email: Yup.string().required().email().max(maxLengthPolicies.email),
	password: Yup.string()
		.required()
		.min(passwordPolicies.minLength)
		.max(maxLengthPolicies.password),
	team: Yup.string().required().min(3).max(maxLengthPolicies.team),
});

const Join = ({ recaptchaSiteKey }: JoinProps) => {
	const router = useRouter();
	const { t } = useTranslation('common');
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [recaptchaToken, setRecaptchaToken] = useState<string>('');
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			team: '',
		},
		validationSchema: JoinUserSchema,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			const response = await fetch('/api/auth/join', {
				method: 'POST',
				headers: defaultHeaders,
				body: JSON.stringify({
					...values,
					recaptchaToken,
				}),
			});

			const json = (await response.json()) as ApiResponse<{
				confirmEmail: boolean;
			}>;

			recaptchaRef.current?.reset();

			if (!response.ok) {
				toast.error(json.error.message);
				return;
			}

			formik.resetForm();

			if (json.data.confirmEmail) {
				router.push('/auth/verify-email');
			} else {
				toast.success(t('successfully-joined'));
				router.push('/auth/login');
			}

			track('User Signed Up', {
				signup_method: 'email',
				user_age: 25,
				user_location: 'California',
			});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="space-y-1">
				<TextField
					type="text"
					label={t('name')}
					name="name"
					placeholder={t('your-name')}
					value={formik.values.name}
					error={formik.touched.name ? !!formik.errors.name : undefined}
					helperText={formik.touched.name && formik.errors.name}
					onChange={formik.handleChange}
				/>
				<TextField
					type="text"
					label={t('team')}
					name="team"
					placeholder={t('team-name')}
					value={formik.values.team}
					error={!!formik.errors.team}
					helperText={formik.errors.team}
					onChange={formik.handleChange}
				/>
				<TextField
					type="email"
					label={t('email')}
					name="email"
					placeholder={t('email-placeholder')}
					value={formik.values.email}
					error={!!formik.errors.email}
					helperText={formik.errors.email}
					onChange={formik.handleChange}
				/>
				<div className="relative flex">
					<TextField
						type={isPasswordVisible ? 'text' : 'password'}
						label={t('password')}
						name="password"
						placeholder={t('password')}
						value={formik.values.password}
						error={!!formik.errors.password}
						helperText={formik.errors.password}
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
					className="w-full font-bold bg-primary hover:bg-primary-light"
					type="submit"
					color="primary"
					loading={formik.isSubmitting}
				>
					{t('create-account')}
				</Button>
				<AgreeMessage text={t('create-account')} />
			</div>
		</form>
	);
};

export default Join;
