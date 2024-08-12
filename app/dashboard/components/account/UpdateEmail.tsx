import { Card } from '@/components/shared';
import { updateAccountSchema } from '@/lib/zod';
import { defaultHeaders, type ApiResponse } from '@cd/core-lib';
import type { StaffMember } from '@cd/data-access';
import { TextField, Button } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

interface UpdateEmailProps {
	user: Partial<StaffMember>;
	allowEmailChange: boolean;
}

const UpdateEmail = ({ user, allowEmailChange }: UpdateEmailProps) => {
	const { t } = useTranslation('common');

	const formik = useFormik({
		initialValues: {
			email: user.email,
		},
		validateOnBlur: false,
		enableReinitialize: true,
		validate: (values) => {
			try {
				updateAccountSchema.parse(values);
			} catch (error: any) {
				return error.formErrors.fieldErrors;
			}
		},
		onSubmit: async (values) => {
			const response = await fetch('/api/users', {
				method: 'PUT',
				headers: defaultHeaders,
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				const json = (await response.json()) as ApiResponse;
				toast.error(json.error.message);
				return;
			}

			toast.success(t('successfully-updated'));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<Card.Body>
					<Card.Header>
						<Card.Title>{t('email-address')}</Card.Title>
						<Card.Description>
							{t('email-address-description')}
						</Card.Description>
					</Card.Header>
					<TextField
						type="email"
						name="email"
						placeholder={t('your-email')}
						value={formik.values.email}
						onChange={formik.handleChange}
						className="w-full text-sm max-w-md"
						required
						disabled={!allowEmailChange}
					/>
				</Card.Body>
				<Card.Footer>
					<Button
						type="submit"
						color="primary"
						loading={formik.isSubmitting}
						disabled={!formik.dirty || !formik.isValid}
						size="md"
					>
						{t('save-changes')}
					</Button>
				</Card.Footer>
			</Card>
		</form>
	);
};

export default UpdateEmail;
