import {
	useDispensaries,
	type ApiResponse,
	defaultHeaders,
	maxLengthPolicies,
} from '@cd/core-lib';
import type { Dispensary } from '@cd/data-access';
import { Button, CheckBox, Paragraph, TextField } from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Modal from '../shared/Modal';

interface CreateTeamProps {
	visible: boolean;
	setVisible: (visible: boolean) => void;
}

const CreateTeam = ({ visible, setVisible }: CreateTeamProps) => {
	const { t } = useTranslation('common');
	const { mutateTeams } = useDispensaries();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: '',
			isSubscribedForDelivery: false,
			isSubscribedForPickup: false,
			isSubscribedForMessaging: false,
		} as Partial<Dispensary>,
		validationSchema: Yup.object().shape({
			name: Yup.string().required().max(maxLengthPolicies.team),
		}),
		onSubmit: async (values) => {
			const response = await fetch('/api/dispensaries/', {
				method: 'POST',
				headers: defaultHeaders,
				body: JSON.stringify(values),
			});

			const json = (await response.json()) as ApiResponse<Dispensary>;

			if (!response.ok) {
				toast.error(json.error.message);
				return;
			}

			formik.resetForm();
			mutateTeams();
			setVisible(false);
			toast.success(t('team-created'));
			router.push(`/teams/${json.data.slug}/settings`);
		},
	});

	const onClose = () => {
		setVisible(false);
		router.push(`/teams`);
	};

	return (
		<Modal open={visible} close={onClose}>
			<form onSubmit={formik.handleSubmit} method="POST">
				<Modal.Header>{t('create-team')}</Modal.Header>
				<Modal.Description>{t('members-of-a-team')}</Modal.Description>
				<Modal.Body>
					<TextField
						className="my-2"
						label={t('name')}
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
						placeholder={t('team-name')}
						required
					/>
					<Paragraph>{t('subscribe-to-services')}</Paragraph>
					<CheckBox
						name={'isSubscribedForDelivery'}
						onChange={formik.handleChange}
						checked={formik.values.isSubscribedForDelivery}
						label={t('delivery-service')}
					/>
					<Link
						target="_blank"
						href={`${process.env.NEXT_PUBLIC_SHOP_APP_URL}/delivery`}
					>
						{t('learn-more')}
					</Link>
					<CheckBox
						name={'isSubscribedForMessaging'}
						onChange={formik.handleChange}
						checked={formik.values.isSubscribedForMessaging}
						label={t('message-service')}
					/>
					<Link
						target="_blank"
						href={`${process.env.NEXT_PUBLIC_SHOP_APP_URL}/messaging`}
					>
						{t('learn-more')}
					</Link>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={onClose} size="md">
						{t('close')}
					</Button>
					<Button
						type="submit"
						color="primary"
						loading={formik.isSubmitting}
						size="md"
						disabled={!formik.dirty || !formik.isValid}
					>
						{t('create-team')}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default CreateTeam;
