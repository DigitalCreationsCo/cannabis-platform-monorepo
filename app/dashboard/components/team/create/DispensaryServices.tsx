/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
	type ApiResponse,
	TextContent,
	defaultHeaders,
	useDispensaries,
} from '@cd/core-lib';
import { type Dispensary } from '@cd/data-access';
import {
	useFormContext,
	Button,
	CheckBox,
	FlexBox,
	TermsAgreement,
	Paragraph,
	Modal2 as Modal,
	H6,
	H2,
} from '@cd/ui-lib';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

function DispensaryServices() {
	const { t } = useTranslation('common');
	const { prevFormStep, formValues, setFormValues } = useFormContext();
	const { mutateTeams } = useDispensaries();
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			isSubscribedForDelivery:
				formValues.dispensary?.isSubscribedForDelivery || false,
			isSubscribedForMessaging:
				formValues.dispensary?.isSubscribedForMessaging || false,
			termsAccepted: false,
		},
		validationSchema: yup.object().shape({
			termsAccepted: yup
				.bool()
				.test(
					'termsAccepted',
					TextContent.legal.READ_USER_TERMS_OF_SERVICE,
					(value) => value === true
				),
		}),
		onSubmit: async (values) => {
			try {
				setFormValues({ dispensary: { ...values } });
				console.info('formValues: ', formValues);
				const response = await fetch('/api/dispensaries/', {
					method: 'POST',
					headers: defaultHeaders,
					body: JSON.stringify(formValues.dispensary),
				});

				const json = (await response.json()) as ApiResponse<Dispensary>;

				if (!response.ok) {
					toast.error(json.error.message);
					return;
				}

				formik.resetForm();
				mutateTeams();
				toast.success(t('team-created'));
				router.push(`/teams/${json.data.slug}/settings`);
			} catch (error: any) {
				toast.error(error.message);
			}
		},
	});

	const { handleChange, handleSubmit, validateForm } = formik;

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
		<>
			<NextSeo
				title={t('subscribe-to-services')}
				description={t('dispensary-description')}
			/>
			<form onSubmit={handleSubmit}>
				<Modal.Header>{t('subscribe-to-services')}</Modal.Header>
				<Modal.Body className="flex flex-col relative gap-8">
					<ServiceCard
						title={t('delivery-service')}
						image={'/message-2.png'}
						value={formik.values.isSubscribedForDelivery}
						link={`https://grascannabis.org/services`}
						name={'isSubscribedForDelivery'}
						onClick={() => {
							// check the box
							formik.setFieldValue(
								'isSubscribedForDelivery',
								!formik.values.isSubscribedForDelivery
							);
						}}
						handleChange={handleChange}
					/>
					<ServiceCard
						title={t('message-service')}
						image={'/message-1.png'}
						value={formik.values.isSubscribedForMessaging}
						link={`https://grascannabis.org/messaging`}
						name={'isSubscribedForMessaging'}
						onClick={() => {
							// check the box
							formik.setFieldValue(
								'isSubscribedForMessaging',
								!formik.values.isSubscribedForMessaging
							);
						}}
						handleChange={handleChange}
					/>
					<TermsAgreement
						name="termsAccepted"
						onChange={handleChange}
						checked={formik.values?.termsAccepted || false}
						helperText={
							(formik.touched.termsAccepted && formik.errors.termsAccepted) ||
							''
						}
						description={
							<div id="dispensary-create-step-3">
								<Paragraph>{TextContent.legal.AGREE_TO_TERMS}</Paragraph>
								<a
									href={`https://grascannabis.org${TextContent.href.dispensary_tos}`}
									target="_blank"
									rel="noreferrer noopener"
								>
									<H6 className={'inline-block border-b-2'}>
										{TextContent.legal.DISPENSARY_TERMS_OF_SERVICE}
									</H6>
									.
								</a>
							</div>
						}
						label={TextContent.legal.I_AGREE_TO_THE_DISPENSARY_TERMS}
					/>
				</Modal.Body>
				<Modal.Footer className="justify-center">
					<Button onClick={prevFormStep} disabled={formik.isSubmitting}>
						{t(TextContent.ui.BACK)}
					</Button>
					<Button
						type="submit"
						loading={formik.isSubmitting}
						size="md"
						disabled={!formik.isValid}
						className={twMerge(
							!formik.isValid ? '' : 'bg-secondary-light hover:bg-primary-light'
						)}
					>
						{t('create-team')}
					</Button>
				</Modal.Footer>
			</form>
		</>
	);
}

export default DispensaryServices;

const ServiceCard = ({
	title,
	name,
	image,
	link,
	onClick,
	value,
	handleChange,
}) => {
	const { t } = useTranslation('common');

	return (
		<div
			className={twMerge(
				'border border-gray-300 h-[300px] overflow-hidden shadow rounded cursor-pointer',
				'transition',
				'relative'
			)}
			onClick={onClick}
		>
			<FlexBox className="flex-row items-stretch p-2">
				<H2>{title}</H2>
				<Link
					className="font-encode shrink-0 ml-2 hover:underline place-self-end"
					target="_blank"
					href={link}
				>
					{t('learn-more')}
				</Link>
			</FlexBox>
			<CheckBox
				className="absolute p-4"
				name={name}
				onChange={handleChange}
				checked={value}
			/>
			<Image
				src={image}
				alt={title}
				width={200}
				height={300}
				className="w-full"
			/>
		</div>
	);
};
