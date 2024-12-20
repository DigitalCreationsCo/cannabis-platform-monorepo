/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	axios,
} from '@cd/core-lib/axiosInstance';
import {
	urlBuilder,
	getFirstErrorOrNull,
} from '@cd/core-lib/utils';
import {
	selectDispensaryState,
} from '@cd/core-lib/reducer';
import { Crontab } from 'crontab-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { Button } from '../button';
import Center from '../Center';
import CheckBox from '../CheckBox';
import Grid from '../Grid';
import TextArea from '../TextArea';
import TextField from '../TextField';
import { H2, Paragraph } from '../Typography';
import Modal from './Modal';

interface NewDailyDealModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function NewDailyDealModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: NewDailyDealModalProps) {
	const { dispensary } = useSelector(selectDispensaryState);
	const dispensaryId = dispensary.id;

	const closeModalAndReset = () => {
		dispatchCloseModal();
	};

	const [loadingButton, setLoadingButton] = useState(false);
	// const [addProduct, setAddProduct] = useState<{
	// 	sku: string;
	// 	quantity: number;
	// 	isDiscount: boolean;
	// 	discount: number;
	// 	organizationId: string;
	// }>({
	// 	sku: '',
	// 	quantity: 1,
	// 	isDiscount: false,
	// 	discount: 0,
	// 	organizationId: dispensaryId,
	// });

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
			organizationId: dispensaryId,
		},
		async onSubmit() {
			try {
				setLoadingButton(true);
				const response = await axios.post(
					urlBuilder.dashboard + '/api/daily-deals',
					values
				);

				if (response.data.success === 'false') {
					throw new Error(response.data.error || 'Error creating daily deal');
				}

				toast.success('Saved.');
				setLoadingButton(false);
				closeModalAndReset();
				window.location.reload();
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
			if (getFirstErrorOrNull(errors)) {
				toast.error(getFirstErrorOrNull(errors));
			}
		});
	}

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	return modalVisible ? (
		<Modal
			className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={openModal}
			onClose={closeModalAndReset}
			disableClickOutside={values.doesRepeat}
			{...props}
		>
			<Grid className="relative space-y-2 m-auto">
				<Center className="m-auto pb-8">
					<H2>New Daily Deal</H2>
					<Paragraph className="my-2">
						{`Promote your business via text message.`}
					</Paragraph>
					<Grid>
						{/* {values.products.length > 0 ? (
							values.products.map((sku, index) => (
								<div
									key={`product-${index}`}
									className="border border-b border-primary justify-start p-1"
								>
									<Paragraph className="ml-2 text-left">#{index + 1}</Paragraph>
									<TextField
										key={`product-sku-${index}`}
										containerClassName="lg:flex-col lg:items-start"
										className="my-2 border text-center"
										autoComplete="off"
										type="text"
										name={`products[${index}].sku`}
										label="sku"
										placeholder=""
										value={values.products[index].sku}
										onBlur={handleBlur}
										onChange={handleChange}
										// error={!!touched.products && !!errors.products}
									/>
									<TextField
										containerClassName="w-20 lg:flex-col lg:items-start"
										className="my-2 border text-center"
										autoComplete="off"
										type="number"
										name={`products[${index}].quantity`}
										label="quantity"
										placeholder="1"
										value={values.products[index].quantity}
										onBlur={handleBlur}
										onChange={handleChange}
										// error={!!touched.products && !!errors.products}
									/>
									<CheckBox
										name={`products[${index}].isDiscount`}
										onChange={handleChange}
										checked={values.products[index].isDiscount}
										LabelComponent={Paragraph}
										label="discount"
									/>
									<TextField
										disabled={!values.products[index]['isDiscount']}
										containerClassName="w-20 lg:flex-col lg:items-start"
										className="my-2 border text-center"
										autoComplete="off"
										min={0}
										max={100}
										type="number"
										name={`products[${index}].discount`}
										label="discount %"
										placeholder="1"
										value={values.products[index].discount}
										onBlur={handleBlur}
										onChange={handleChange}
										// error={!!touched.products && !!errors.products}
									/>
								</div>
							))
						) : (
							<Paragraph className="text-left">
								Your deal needs products. Add a sku.
							</Paragraph>
						)} */}

						{/* <FlexBox className="my-4 bg-light rounded shadow-inner border justify-start p-1 border-primary items-start justify-content-start content-start place-content-start">
							<TextField
								containerClassName="lg:flex-col lg:items-start"
								className="my-2 border text-center"
								autoComplete="off"
								type="text"
								name={`addProduct.sku`}
								label="add a sku"
								placeholder=""
								value={addProduct['sku']}
								onBlur={handleBlur}
								onChange={(e: any) =>
									setAddProduct((state) => ({
										...state,
										sku: e.target.value,
									}))
								}
								// error={!!touched.products && !!errors.products}
							/>
							<TextField
								containerClassName="w-20 lg:flex-col lg:items-start"
								className="my-2 border text-center"
								autoComplete="off"
								type="number"
								name={`addProduct.quantity`}
								label="quantity"
								placeholder="1"
								value={addProduct['quantity'] || 1}
								onBlur={handleBlur}
								onChange={(e: any) =>
									setAddProduct((state) => ({
										...state,
										quantity: e.target.value,
									}))
								}
								// error={!!touched.products && !!errors.products}
							/>
							<CheckBox
								name={'addProduct.isDiscount'}
								onChange={() => {
									setAddProduct((state) => ({
										...state,
										isDiscount: !state.isDiscount,
									}));
								}}
								checked={addProduct['isDiscount']}
								LabelComponent={Paragraph}
								label="apply discount?"
							/>
							<FlexBox className="flex-row w-full justify-between items-center">
								<TextField
									disabled={!addProduct['isDiscount']}
									containerClassName="w-20 lg:flex-col lg:items-start"
									className="my-2 border text-center"
									autoComplete="off"
									type="number"
									name={`addProduct.discount`}
									label="discount %"
									min={0}
									max={100}
									placeholder="0"
									value={addProduct['discount'] || 0}
									onBlur={handleBlur}
									onChange={(e: any) =>
										setAddProduct((state) => ({
											...state,
											discount: e.target.value,
										}))
									}
									// error={!!touched.products && !!errors.products}
								/>

								<Button
									size="sm"
									className="self-end w-10 h-10 mb-2"
									onClick={() => {
										values.products.push(addProduct);
										setAddProduct({
											sku: '',
											quantity: 1,
											isDiscount: false,
											discount: 0,
											organizationId: dispensaryId,
										});
									}}
								>
									+
								</Button>
							</FlexBox>
						</FlexBox> */}
						<TextField
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border"
							autoComplete="off"
							type="text"
							name="title"
							label="Title"
							placeholder=""
							value={values.title}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.title && !!errors.title}
						/>
						<TextArea
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border m-auto lg:flex-col lg:items-start"
							autoComplete="off"
							name="message"
							label="Message"
							placeholder=""
							value={values?.message}
							onBlur={handleBlur}
							onChange={handleChange}
							rows={6}
							error={!!touched.message && !!errors.message}
						/>
						<CheckBox
							className="my-2 w-full bg-light accent-light px-2 pt-4"
							name="doesRepeat"
							onChange={handleChange}
							checked={values.doesRepeat}
							label={values.doesRepeat ? 'Does Repeat' : 'Does Not Repeat'}
						/>
						{(values.doesRepeat && (
							<Crontab
								value={values.schedule || ''}
								onChange={(e: any) => {
									setFieldValue('schedule', e.target.value);
								}}
								shortSelectedOptions={false}
							/>
						)) || <></>}

						{/* {(values.doesRepeat && (
							<Cron
								value={values.schedule || ''}
								setValue={(value: string) => {
									setFieldValue('schedule', value);
								}}
								mode="single"
							/>
						)) || <></>} */}

						{/* <TextField
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border text-center"
							autoComplete="off"
							type="date"
							name="startTime"
							label="start time"
							placeholder=""
							value={values.startTime as unknown as string}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.startTime && !!errors.startTime}
						/>
						<TextField
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border text-center"
							autoComplete="off"
							type="date"
							name="endTime"
							label="end time"
							placeholder=""
							value={values.endTime as unknown as string}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.endTime && !!errors.endTime}
						/> */}
						<Button
							loading={loadingButton}
							className="place-self-center mt-2 p-2"
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
					</Grid>
				</Center>
			</Grid>
		</Modal>
	) : (
		<></>
	);
}

export default NewDailyDealModal;

const styles = {
	responsive:
		'w-full md:max-w-2xl min-h-screen sm:!rounded-none md:min-h-min md:!rounded px-0 py-8 xl:ml-[200px] bg-light',
};
