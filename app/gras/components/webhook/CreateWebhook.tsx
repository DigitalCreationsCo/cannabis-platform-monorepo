import {
	useWebhooks,
	defaultHeaders,
	type ApiResponse,
	type WebookFormSchema,
} from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import type { FormikHelpers } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import toast from 'react-hot-toast';

import ModalForm from './Form';

const CreateWebhook = ({
	visible,
	setVisible,
	team,
}: {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	team: Dispensary;
}) => {
	const { mutateWebhooks } = useWebhooks(team.slug);
	const { t } = useTranslation('common');

	const onSubmit = async (
		values: WebookFormSchema,
		formikHelpers: FormikHelpers<WebookFormSchema>
	) => {
		const response = await fetch(`/api/dispensaries/${team.slug}/webhooks`, {
			method: 'POST',
			headers: defaultHeaders,
			body: JSON.stringify(values),
		});

		const json = (await response.json()) as ApiResponse<Dispensary>;

		if (!response.ok) {
			toast.error(json.error.message);
			return;
		}

		toast.success(t('webhook-created'));
		mutateWebhooks();
		setVisible(false);
		formikHelpers.resetForm();
	};

	return (
		<ModalForm
			visible={visible}
			setVisible={setVisible}
			initialValues={{
				name: '',
				url: '',
				eventTypes: [],
			}}
			onSubmit={onSubmit}
			title={t('create-webhook')}
		/>
	);
};

export default CreateWebhook;
