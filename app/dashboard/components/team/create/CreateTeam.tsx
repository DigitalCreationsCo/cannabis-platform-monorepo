import {
	useDispensaries,
	type ApiResponse,
	defaultHeaders,
	maxLengthPolicies,
} from '@gras/core';
import type { Dispensary } from '@gras/data-access';
import {
	Button,
	CheckBox,
	FlexBox,
	Paragraph,
	TextField,
	Modal2 as Modal,
} from '@gras/ui';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as Yup from 'yup';

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
				<Modal.Body className="flex flex-col gap-y-2">
					<TextField
						className="my-2"
						label={t('name')}
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
						placeholder={t('team-name')}
						required
					/>
					<FlexBox>
						<Paragraph className="pl-2">{t('subscribe-to-services')}</Paragraph>
						<FlexBox className="flex-row items-center gap-x-4 mx-auto">
							<CheckBox
								className="w-[200px]"
								name={'isSubscribedForDelivery'}
								onChange={formik.handleChange}
								checked={formik.values.isSubscribedForDelivery}
								label={t('delivery-service')}
							/>
							<Link
								className="shrink-0 hover:underline"
								target="_blank"
								href={`${process.env.NEXT_PUBLIC_SHOP_APP_URL}/delivery`}
							>
								{t('learn-more')}
							</Link>
						</FlexBox>
						<FlexBox className="flex-row items-center gap-x-4 mx-auto">
							<CheckBox
								className="w-[200px]"
								name={'isSubscribedForMessaging'}
								onChange={formik.handleChange}
								checked={formik.values.isSubscribedForMessaging}
								label={t('message-service')}
							/>
							<Link
								className="shrink-0 hover:underline"
								target="_blank"
								href={`${process.env.NEXT_PUBLIC_SHOP_APP_URL}/messaging`}
							>
								{t('learn-more')}
							</Link>
						</FlexBox>
					</FlexBox>
				</Modal.Body>
				<Modal.Footer className="justify-center">
					<Button type="button" onClick={onClose} size="md">
						{t('close')}
					</Button>
					<Button
						type="submit"
						loading={formik.isSubmitting}
						size="md"
						disabled={!formik.dirty || !formik.isValid}
						className={twMerge(
							!formik.dirty || !formik.isValid
								? ''
								: 'bg-secondary-light hover:bg-primary-light'
						)}
					>
						{t('create-team')}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default CreateTeam;
