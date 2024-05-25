import { Card } from '@/components/shared';
import {
	maxLengthPolicies,
	defaultHeaders,
	passwordPolicies,
} from '@cd/core-lib';
import { Button, TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const schema = Yup.object().shape({
	currentPassword: Yup.string().required().max(maxLengthPolicies.password),
	newPassword: Yup.string()
		.required()
		.min(passwordPolicies.minLength)
		.max(maxLengthPolicies.password),
});

const UpdatePassword = () => {
	const { t } = useTranslation('common');

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
		},
		validationSchema: schema,
		onSubmit: async (values) => {
			const response = await fetch('/api/password', {
				method: 'PUT',
				headers: defaultHeaders,
				body: JSON.stringify(values),
			});

			const json = await response.json();

			if (!response.ok) {
				toast.error(json.error.message);
				return;
			}

			toast.success(t('successfully-updated'));
			formik.resetForm();
		},
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Card>
					<Card.Body>
						<Card.Header>
							<Card.Title>{t('password')}</Card.Title>
							<Card.Description>{t('change-password-text')}</Card.Description>
						</Card.Header>
						<div className="flex flex-col space-y-3">
							<TextField
								type="password"
								label={t('current-password')}
								name="currentPassword"
								placeholder={t('current-password')}
								value={formik.values.currentPassword}
								error={
									formik.touched.currentPassword
										? !!formik.errors.currentPassword
										: undefined
								}
								helperText={
									formik.touched.currentPassword &&
									formik.errors.currentPassword
								}
								onChange={formik.handleChange}
								className="text-sm"
							/>
							<TextField
								type="password"
								label={t('new-password')}
								name="newPassword"
								placeholder={t('new-password')}
								value={formik.values.newPassword}
								error={
									formik.touched.newPassword
										? !!formik.errors.newPassword
										: undefined
								}
								helperText={
									formik.touched.newPassword
										? formik.errors.newPassword
										: undefined
								}
								onChange={formik.handleChange}
								className="text-sm"
							/>
						</div>
					</Card.Body>
					<Card.Footer>
						<div className="flex justify-end">
							<Button
								type="submit"
								color="primary"
								loading={formik.isSubmitting}
								disabled={!formik.dirty || !formik.isValid}
								size="md"
							>
								{t('change-password')}
							</Button>
						</div>
					</Card.Footer>
				</Card>
			</form>
		</>
	);
};

export default UpdatePassword;
