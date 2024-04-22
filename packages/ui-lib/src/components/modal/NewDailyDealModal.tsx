/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { axios, selectDispensaryState, urlBuilder } from '@cd/core-lib';
import { type DailyDealCreateWithSkus } from '@cd/data-access';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { Button } from '../button';
import Center from '../Center';
import CheckBox from '../CheckBox';
import FlexBox from '../FlexBox';
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

	const initialValues: DailyDealCreateWithSkus = {
		title: '',
		message: '',
		doesRepeat: false,
		schedule: '',
		startTime: new Date(),
		endTime: new Date(new Date().setHours(23, 0, 0, 0)),
		organizationId: dispensaryId,
		organization: dispensary,
	};

	const [loadingButton, setLoadingButton] = useState(false);
	const [addProduct, setAddProduct] = useState<{
		sku: string;
		quantity: number;
		isDiscount: boolean;
		discount: number;
		organizationId: string;
	}>({
		sku: '',
		quantity: 1,
		isDiscount: false,
		discount: 0,
		organizationId: dispensaryId,
	});

	const dailyDealSchema = yup.object().shape({
		title: yup.string().required('Add a title'),
		description: yup.string().required('Add a description'),
		startTime: yup.string().required('Add a start time'),
		// endtime must be after the current time
		endTime: yup
			.string()
			.required('Add an end time')
			.test(
				'is-in-the-future',
				'End time must be after current time',
				(value) => {
					const now = new Date();
					const endTime = new Date(value!);
					return endTime > now;
				},
			),
		products: yup.array().required('Add at least one product sku'),
	});

	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		validateForm,
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema: dailyDealSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (errors && Object.values(errors).length > 0) {
				toast.error(
					errors.description! ||
						errors.title! ||
						errors.products![0].toString(),
				);
			}
		});
	}

	async function onSubmit() {
		try {
			setLoadingButton(true);
			const response = await axios.post(
				urlBuilder.dashboard + '/api/daily-deals',
				{ ...values, organization: dispensary },
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
	}

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	console.info('values: ', values);
	return modalVisible ? (
		<Modal
			className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={openModal}
			onClose={closeModalAndReset}
			{...props}
		>
			<Grid className="relative space-y-2 m-auto">
				<Center className="m-auto pb-8">
					<H2>New Daily Deal</H2>
					<Paragraph className="mb-2">
						{`Your customers will get daily deals via text message.`}
					</Paragraph>
					<Grid>
						{values.products.length > 0 ? (
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
						)}
						<FlexBox className="my-4 bg-light rounded shadow-inner border justify-start p-1 border-primary items-start justify-content-start content-start place-content-start">
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
						</FlexBox>
						<TextField
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border text-center"
							autoComplete="off"
							type="text"
							name="title"
							label="title"
							placeholder=""
							value={values.title}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.title && !!errors.title}
						/>
						<TextArea
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border text-center m-auto lg:flex-col lg:items-start"
							autoComplete="off"
							name="description"
							label="description"
							placeholder=""
							value={values?.description}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.description && !!errors.description}
						/>
						<TextField
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
						/>
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
		'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-0 py-8 lg:ml-[200px]',
};
