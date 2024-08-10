import {
	type ApiResponse,
	defaultHeaders,
	maxLengthPolicies,
	passwordPolicies,
} from '@cd/core-lib';
import {
	Button,
	TextField,
	AgreeMessage,
	TogglePasswordVisibility,
	GoogleReCAPTCHA,
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import type ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

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
	// dispensary: Yup.string().required().min(3).max(maxLengthPolicies.team),
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
				{/* <TextField
					type="text"
					label={t('team')}
					name="dispensary"
					placeholder={t('team-name')}
					value={formik.values.dispensary}
					error={!!formik.errors.dispensary}
					helperText={formik.errors.dispensary}
					onChange={formik.handleChange}
				/> */}
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
				<div className="w-fit m-auto">
					<GoogleReCAPTCHA
						recaptchaRef={recaptchaRef}
						onChange={setRecaptchaToken}
						siteKey={recaptchaSiteKey}
					/>
				</div>
			</div>
			<div className="mt-3 space-y-3">
				<Button
					className="w-full font-bold bg-secondary-light hover:bg-primary-light"
					type="submit"
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
