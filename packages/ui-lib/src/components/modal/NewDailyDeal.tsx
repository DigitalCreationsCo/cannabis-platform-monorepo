/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { axios, urlBuilder, type ApiResponse, fetcher } from '@cd/core-lib';
import { type Dispensary, type DailyDeal } from '@cd/data-access';
// import { time} from 'date-fns-tz';
// import cronToHuman from 'cron-to-human';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Cron } from 'react-js-cron';
import useSWR from 'swr';
import * as yup from 'yup';
import { Button } from '../button';
import CheckBox from '../CheckBox';
import TextArea from '../TextArea';
import TextField from '../TextField';
import Modal from './Modal2';
import 'react-js-cron/dist/styles.css';

interface NewDailyDealModalProps {
	dispatchCloseModal?: () => void;
	modalVisible: boolean;
	onSubmit?: () => any;
	title?: string;
	visible?: boolean;
	onConfirm?: () => void | Promise<any>;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
	children?: React.ReactNode;
	modalType?: any;
	team?: Dispensary;
}

function NewDailyDeal({
	team,
	dispatchCloseModal,
	modalVisible,
	...props
}: NewDailyDealModalProps) {
	const { mutate: mutateDailyDeals } = useSWR<ApiResponse<DailyDeal[]>>(
		team?.slug ? `/api/dispensaries/${team.slug}/daily-deals` : null,
		fetcher
	);

	const closeModalAndReset = () => {
		dispatchCloseModal?.();
	};

	const [loadingButton, setLoadingButton] = useState(false);

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
			title: '',
			message: '',
			startTime: null,
			endTime: null,
			doesRepeat: false,
			schedule: '',
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			teamSlug: team.slug,
			weedTextSegmentId: team.weedTextSegmentId,
		} as Partial<DailyDeal>,
		async onSubmit() {
			try {
				console.info(
					'time zone?? ',
					Intl.DateTimeFormat().resolvedOptions().timeZone
				);
				setLoadingButton(true);
				const response = await axios.post(
					urlBuilder.dashboard + `/api/dispensaries/${team.slug}/daily-deals`,
					values
				);

				if (response.data.success === 'false') {
					throw new Error(response.data.error || 'Error creating daily deal');
				}

				toast.success('Saved.');
				setLoadingButton(false);
				mutateDailyDeals();
				props.onCancel ? props.onCancel() : closeModalAndReset();
				// if (props.onSubmit) props.onSubmit();
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
		<Modal open={openModal} close={props.onCancel || closeModalAndReset}>
			<Modal.Header>{`New Text Message`}</Modal.Header>
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
						<Cron
							value={values.schedule || ''}
							setValue={(value: string) => {
								setFieldValue('schedule', value);
							}}
							mode="single"
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
				{/* <TextField
					containerClassName="m-auto lg:flex-col lg:items-start"
					className="my-2 border text-center"
					autoComplete="off"
					type="datetime-local"
					name="startTime"
					label="start time"
					placeholder=""
					onBlur={handleBlur}
					onChange={(e: any) => {
						setFieldValue(
							'startTime',
							new Date(
								toZonedTime(
									e.target.value,
									Intl.DateTimeFormat().resolvedOptions().timeZone,
								).toISOString(),
							),
						);
					}}
					error={!!touched.startTime && !!errors.startTime}
					helperText={touched.startTime && errors.startTime}
				/> */}
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
					Create Daily Deal
				</Button>
			</Modal.Footer>
		</Modal>
	) : (
		<></>
	);
}

export default NewDailyDeal;
