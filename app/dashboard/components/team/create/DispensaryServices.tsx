/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
	type ApiResponse,
	TextContent,
	defaultHeaders,
	fetcher,
	useDispensaries,
} from '@cd/core-lib';
import { type Price, type Dispensary } from '@cd/data-access';
import {
	Button,
	useFormContext,
	CheckBox,
	FlexBox,
	TermsAgreement,
	Paragraph,
	Modal2 as Modal,
	H6,
	H2,
	LoadingPage,
} from '@cd/ui-lib';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { Error } from '@/components/shared';

function DispensaryServices() {
	const { t } = useTranslation('common');
	const { prevFormStep, formValues, setFormValues } = useFormContext();
	const { mutateTeams } = useDispensaries();
	const router = useRouter();

	const { data, isLoading, error: isError } = useSWR(`/api/products`, fetcher);

	const plans = data?.data?.products || [];
	// eslint-disable-next-line import/no-named-as-default-member
	const [selectedPriceIds, setSelectedPriceIds] = React.useState<string[]>([]);

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
					body: JSON.stringify({
						...formValues.dispensary,
						priceIds: selectedPriceIds,
					}),
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

	if (isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		return <Error message={isError.message} />;
	}

	console.info('formik values ', formik.values);
	console.info('plans: ', plans);
	return (
		<>
			<NextSeo
				title={t('subscribe-to-services')}
				description={t('dispensary-description')}
			/>
			<form onSubmit={handleSubmit}>
				<Modal.Header>{t('subscribe-to-services')}</Modal.Header>
				<Modal.Body className="flex flex-col relative gap-8">
					{plans.map((plan) => {
						return (
							<ServiceCard
								key={plan.id}
								plan={plan}
								title={plan.name}
								image={plan.image}
								description={plan.description ?? ''}
								value={formik.values[plan.metadata?.subscription ?? plan.name]}
								link={plan.metadata?.link ?? 'https://gras.live/services'}
								name={plan.metadata?.subscription ?? plan.name}
								onClick={() => {
									// check the box
									formik.setFieldValue(
										plan.metadata?.subscription,
										formik.values[plan.metadata?.subscription ?? plan.name]
									);
									// add the price ids to the list
									plan.prices.forEach((price) => {
										if (selectedPriceIds.includes(price.id)) {
											//  or remove it
											setSelectedPriceIds(
												selectedPriceIds.filter((id) => id !== price.id)
											);
										} else {
											// add the plan id
											setSelectedPriceIds([...selectedPriceIds, price.id]);
										}
									});
								}}
								handleChange={handleChange}
							/>
						);
					})}
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
	description,
	plan,
}) => {
	const { t } = useTranslation('common');

	return (
		<div
			className={twMerge(
				'border border-gray-300 overflow-hidden shadow rounded',
				'transition',
				'relative',
				'mx-auto'
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
				className="absolute w-full p-4 bg-gray-200/75 hover:bg-gray-300/75"
				name={name}
				onChange={handleChange}
				checked={value}
				label={description}
			/>

			<Image
				src={image}
				alt={title}
				width={300}
				height={300}
				className="w-full h-full aspect-square object-cover"
			/>
			<FlexBox className="absolute bottom-0 w-full flex-col sm:flex-row">
				{plan.prices.map((price: Price) => {
					const metadata = price.metadata;
					const currencySymbol = getSymbolFromCurrency(price.currency || 'USD');
					let buttonText = `Get Started for ${currencySymbol}${price.amount}`;
					if (metadata?.interval === 'month') {
						buttonText = price.amount
							? `${currencySymbol}${price.amount} / month`
							: `Monthly`;
					} else if (metadata?.interval === 'year') {
						buttonText = price.amount
							? `${currencySymbol}${price.amount} / year`
							: `Yearly`;
					}
					return (
						<div
							key={`${plan.id}-${price.id}`}
							className="text-center h-full flex-1 p-2 bg-gray-200/75"
						>
							{buttonText}
						</div>
					);
				})}
			</FlexBox>
		</div>
	);
};
