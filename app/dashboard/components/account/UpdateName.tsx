import { Card } from '@/components/shared';
import { updateAccountSchema } from '@/lib/zod';
import { defaultHeaders, type ApiResponse } from '@cd/core-lib';
import type { StaffMember } from '@cd/data-access';
import { TextField, Button } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const UpdateName = ({ user }: { user: Partial<StaffMember> }) => {
	const { t } = useTranslation('common');
	const { update } = useSession();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: user.name,
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

			await update({
				name: values.name,
			});

			router.replace('/settings/account');
			toast.success(t('successfully-updated'));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<Card.Body>
					<Card.Header>
						<Card.Title>{t('name')}</Card.Title>
						<Card.Description>{t('name-appearance')}</Card.Description>
					</Card.Header>
					<TextField
						type="text"
						name="name"
						placeholder={t('your-name')}
						value={formik.values.name}
						onChange={formik.handleChange}
						className="w-full text-sm max-w-md"
						required
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

export default UpdateName;
