/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type ApiResponse, axios, fetcher, urlBuilder } from '@cd/core-lib';
import type { DailyDeal, Dispensary } from '@cd/data-access';
import {
	TextField,
	Modal2 as Modal,
	Button,
	CheckBox,
	TextArea,
} from '@cd/ui-lib';
import { Crontab } from 'crontab-react';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import * as yup from 'yup';

const UpdateDailyDeal = ({
	team,
	deal,
	modalVisible,
	onCancel,
}: {
	team: Dispensary;
	deal: Partial<DailyDeal>;
	modalVisible: boolean;
	onCancel?: () => void;
}) => {
	const { t } = useTranslation('common');
	const [loadingButton, setLoadingButton] = useState(false);

	const { mutate: mutateDailyDeals } = useSWR<ApiResponse<DailyDeal[]>>(
		team?.slug ? `/api/dispensaries/${team.slug}/daily-deals` : null,
		fetcher
	);
	const dailyDealSchema = yup.object().shape({
		title: yup.string().required('Add a title'),
		message: yup.string().required('Add a message'),
		// require schedule if doesRepeat is true
		schedule: yup.string().when('doesRepeat', {
			is: true,
			then: yup.string().required('Add a schedule'),
			otherwise: yup.string(),
		}),
		// startTime: yup.string().required('Add a start time'),
		// endtime must be after the current time
		// endTime: yup
		// 	.string()
		// 	.required('Add an end time')
		// 	.test(
		// 		'is-in-the-future',
		// 		'End time must be after current time',
		// 		(value) => {
		// 			const now = new Date();
		// 			const endTime = new Date(value!);
		// 			return endTime > now;
		// 		},
		// 	),
		// products: yup.array().required('Add at least one product sku'),
	});

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
		setFieldValue,
	} = useFormik({
		initialValues: {
			...deal,
		},
		validateOnBlur: false,
		enableReinitialize: true,
		// validate: (values) => {
		// 	try {
		// 		updateAccountSchema.parse(values);
		// 	} catch (error: any) {
		// 		return error.formErrors.fieldErrors;
		// 	}
		// },
		onSubmit: async (values) => {
			try {
				setLoadingButton(true);
				const response = await axios.post(
					urlBuilder.dashboard + `/api/dispensaries/${team.slug}/daily-deals`,
					values
				);

				if (response.data.success === 'false') {
					throw new Error(response.data.error || 'Error creating daily deal');
				}

				toast.success(t('successfully-updated'));
				setLoadingButton(false);
				mutateDailyDeals();
				onCancel && onCancel();
			} catch (error: any) {
				console.error(error);
				setLoadingButton(false);
				toast.error(error.message);
			}
		},
		validationSchema: dailyDealSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (errors && Object.values(errors).length > 0) {
				toast.error(errors.message! || errors.title!);
			}
		});
	}

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	return modalVisible ? (
		<Modal open={openModal} close={onCancel}>
			<Modal.Header>{`Edit Daily Deal`}</Modal.Header>
			<Modal.Body className="h-[540px] text-sm leading-6 flex flex-col text-center gap-y-2">
				<TextField
					className="border"
					autoComplete="off"
					type="text"
					name="title"
					label="Title"
					placeholder=""
					value={values.title}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.title && !!errors.title}
					helperText={touched.title && errors.title}
				/>
				<TextArea
					className="border"
					autoComplete="off"
					name="message"
					label="Message"
					placeholder=""
					value={values?.message}
					onBlur={handleBlur}
					onChange={handleChange}
					rows={6}
					error={!!touched.message && !!errors.message}
					helperText={touched.message && errors.message}
				/>
				<CheckBox
					className="w-full bg-light accent-light px-2"
					name="doesRepeat"
					onChange={handleChange}
					checked={values.doesRepeat}
					label={values.doesRepeat ? 'Does Repeat' : 'Does Not Repeat'}
				/>
				{(values.doesRepeat && (
					<>
						<Crontab
							value={values.schedule || ''}
							onChange={(e: any) => {
								setFieldValue('schedule', e.target.value);
							}}
							shortSelectedOptions={false}
						/>
						<TextField
							className="border"
							autoComplete="off"
							type="datetime-local"
							name="endTime"
							label="Ending date"
							placeholder=""
							onBlur={handleBlur}
							onChange={(e: any) => {
								setFieldValue(
									'endTime',
									new Date(e.target.value)
									// new Date(
									// 	toZonedTime(
									// 		e.target.value,
									// 		Intl.DateTimeFormat().resolvedOptions().timeZone,
									// 	).toISOString(),
									// ),
								);
							}}
							error={!!touched.endTime && !!errors.endTime}
							helperText={touched.endTime && errors.endTime}
						/>
					</>
				)) || <></>}
			</Modal.Body>
			<Modal.Footer className="py-2">
				<Button
					loading={loadingButton}
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						notifyValidation();
						handleSubmit();
					}}
				>
					{t('update')}
				</Button>
			</Modal.Footer>
		</Modal>
	) : (
		<></>
	);
};

export default UpdateDailyDeal;
