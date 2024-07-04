import { TextContent } from '@cd/core-lib';
import { useFormContext, Button, TextField, Modal2 as Modal } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

function DispensaryName() {
	const { t } = useTranslation('common');
	const { nextFormStep, formValues, setFormValues } = useFormContext();

	const formik = useFormik({
		initialValues: {
			name: formValues.dispensary?.name || '',
			// isSubscribedForDelivery:
			// 	formValues.dispensary?.isSubscribedForDelivery || false,
			// isSubscribedForMessaging:
			// 	formValues.dispensary?.isSubscribedForMessaging || false,
		},
		onSubmit: async (values) => {
			try {
				setFormValues({ dispensary: { ...values } });
				nextFormStep();
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		validationSchema,
	});
	const { values, handleChange, handleSubmit, validateForm } = formik;
	function notifyValidation() {
		validateForm().then((errors) => {
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(
					Object.values(errors)?.[0]?.toString() || 'An error occurred'
				);
			}
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Modal.Header>{t('create-team')}</Modal.Header>
				<Modal.Description>{t('members-of-a-team')}</Modal.Description>
				<Modal.Body className="flex flex-col gap-y-2">
					<TextField
						className="my-2"
						label={t('name')}
						name="name"
						onChange={handleChange}
						value={values.name}
						placeholder={t('team-name')}
						required
					/>
				</Modal.Body>
				<Modal.Footer className="justify-center">
					<Button
						type="submit"
						disabled={!formik.isValid}
						loading={formik.isSubmitting}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						{TextContent.ui.CONTINUE}
					</Button>
				</Modal.Footer>
			</form>
		</div>
	);
}

const validationSchema = yup.object().shape({
	name: yup.string().required(TextContent.prompt.DISPENSARY_NAME_REQUIRED),
});

export default DispensaryName;
