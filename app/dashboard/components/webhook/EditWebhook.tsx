import {
	useWebhooks,
	useWebhook,
	defaultHeaders,
	type ApiResponse,
	type WebookFormSchema,
} from '@gras/core';
import { type Dispensary } from '@gras/data-access';
import { LoadingDots } from '@gras/ui';
import type { FormikHelpers } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import toast from 'react-hot-toast';
import type { EndpointOut } from 'svix';
import { Error } from '@/components/shared';
import ModalForm from './Form';

const EditWebhook = ({
	visible,
	setVisible,
	team,
	endpoint,
}: {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	team: Dispensary;
	endpoint: EndpointOut;
}) => {
	const { isLoading, isError, webhook } = useWebhook(team.slug, endpoint.id);
	const { t } = useTranslation('common');
	const { mutateWebhooks } = useWebhooks(team.slug);

	if (isLoading || !webhook) {
		return <LoadingDots />;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	const onSubmit = async (
		values: WebookFormSchema,
		formikHelpers: FormikHelpers<WebookFormSchema>
	) => {
		const response = await fetch(
			`/api/dispensaries/${team.slug}/webhooks/${endpoint.id}`,
			{
				method: 'PUT',
				headers: defaultHeaders,
				body: JSON.stringify(values),
			}
		);

		const json = (await response.json()) as ApiResponse;

		if (!response.ok) {
			toast.error(json.error.message);
			return;
		}

		toast.success(t('webhook-updated'));
		mutateWebhooks();
		setVisible(false);
		formikHelpers.resetForm();
	};

	return (
		<ModalForm
			visible={visible}
			setVisible={setVisible}
			initialValues={{
				name: webhook.description as string,
				url: webhook.url,
				eventTypes: webhook.filterTypes!,
			}}
			onSubmit={onSubmit}
			title={t('edit-webhook-endpoint')}
			editMode={true}
		/>
	);
};

export default EditWebhook;
