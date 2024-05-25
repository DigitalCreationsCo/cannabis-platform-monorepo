import {
	availableRoles,
	type ApiResponse,
	defaultHeaders,
	maxLengthPolicies,
} from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import { TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from '@cd/ui-lib';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import * as Yup from 'yup';

interface InviteViaEmailProps {
	team: Dispensary;
	setVisible: (visible: boolean) => void;
}

const InviteViaEmail = ({ setVisible, team }: InviteViaEmailProps) => {
	const { t } = useTranslation('common');

	const FormValidationSchema = Yup.object().shape({
		email: Yup.string()
			.email()
			.max(maxLengthPolicies.email)
			.required(t('require-email')),
		role: Yup.string()
			.required(t('required-role'))
			.oneOf(availableRoles.map((r) => r.id)),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			role: availableRoles[0].id,
			sentViaEmail: true,
		},
		validationSchema: FormValidationSchema,
		onSubmit: async (values) => {
			const response = await fetch(
				`/api/dispensaries/${team.slug}/invitations`,
				{
					method: 'POST',
					headers: defaultHeaders,
					body: JSON.stringify(values),
				},
			);

			if (!response.ok) {
				const result = (await response.json()) as ApiResponse;
				toast.error(result.error.message);
				return;
			}

			toast.success(t('invitation-sent'));
			mutate(`/api/dispensaries/${team.slug}/invitations?sentViaEmail=true`);
			setVisible(false);
			formik.resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} method="POST" className="pb-6">
			<h3 className="font-medium text-[14px] pb-2">{t('invite-via-email')}</h3>
			<div className="flex gap-1">
				<TextField
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					placeholder="jackson@boxyhq.com"
					required
					className="text-sm w-1/2"
					type="email"
				/>
				<select
					className="select-bordered select rounded"
					name="role"
					onChange={formik.handleChange}
					value={formik.values.role}
					required
				>
					{availableRoles.map((role) => (
						<option value={role.id} key={role.id}>
							{role.name}
						</option>
					))}
				</select>
				<Button
					type="submit"
					color="primary"
					loading={formik.isSubmitting}
					disabled={!formik.isValid || !formik.dirty}
					className="grow"
				>
					{t('send-invite')}
				</Button>
			</div>
		</form>
	);
};

export default InviteViaEmail;
