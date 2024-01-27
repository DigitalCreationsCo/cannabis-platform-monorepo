import { Grid } from '@carbon/icons-react';
import { type DailyDealCreateWithSkus } from '@cd/data-access';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import error from 'supertokens-node/lib/build/error';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { Button } from 'components/button';
import CheckBox from 'components/CheckBox';
import TextField from 'components/TextField';
import { selectDispensaryState } from '../../../../core-lib/src';
import Center from '../Center';
import { H2, H3, Paragraph } from '../Typography';
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
		description: '',
		startTime: new Date(),
		endTime: new Date(new Date().setHours(23, 0, 0, 0)),
		organizationId: dispensaryId,
		products: [
			{
				sku: '',
				quantity: 1,
				isDiscount: false,
				discount: 0,
				organizationId: dispensaryId,
			},
		],
	};

	const [loadingButton, setLoadingButton] = useState(false);
	const [addProduct, setAddProduct] = useState<{
		sku: string;
		quantity: number;
		isDiscount: boolean;
		discount: number;
		organizationId: string;
	}>(initialValues.products[0]);

	const dailyDealSchema = yup.object().shape({
		title: yup.string().required('Add a title'),
		description: yup.string().required('Add a description'),
		startTime: yup.string().required('Add a start time'),
		endTime: yup.string().required('Add an end time'),
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
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(Object.values(errors)[0].toString());
			}
		});
	}

	async function onSubmit() {
		try {
			setLoadingButton(true);
			closeModalAndReset();
		} catch (error: any) {
			console.error(error);
			setLoadingButton(false);
			toast.error(error.message);
		}
	}

	return (
		<Modal
			disableClickOutside
			className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={modalVisible}
			onClose={dispatchCloseModal}
			{...props}
		>
			<Grid className="relative space-y-2 md:w-2/3 m-auto">
				<Center className="w-3/4 m-auto pb-8">
					<H2>New Daily Deal</H2>
					<Paragraph>
						Create a deal. Your customers will receive it daily via sms.
					</Paragraph>
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
					<TextField
						containerClassName="m-auto lg:flex-col lg:items-start"
						className="my-2 border text-center"
						autoComplete="off"
						type="text"
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
						type="datetime-local"
						name="startTime"
						label="start time"
						placeholder=""
						value={values.startTime.toString()}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.startTime && !!errors.startTime}
					/>
					<TextField
						containerClassName="m-auto lg:flex-col lg:items-start"
						className="my-2 border text-center"
						autoComplete="off"
						type="datetime-local"
						name="endTime"
						label="end time"
						placeholder=""
						value={values.endTime.toString()}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.endTime && !!errors.endTime}
					/>
					{values.products.map((sku, index) => (
						<TextField
							key={`product-sku-${index}`}
							containerClassName="m-auto lg:flex-col lg:items-start"
							className="my-2 border text-center"
							autoComplete="off"
							type="text"
							name={`products[${index}].sku`}
							label="sku"
							placeholder=""
							value={values.products[index].sku}
							onBlur={handleBlur}
							onChange={handleChange}
							error={!!touched.products && !!errors.products}
						/>
					))}
					<TextField
						containerClassName="m-auto lg:flex-col lg:items-start"
						className="my-2 border text-center"
						autoComplete="off"
						type="text"
						name={`addProduct.sku`}
						label="add a sku"
						placeholder=""
						value={addProduct['sku']}
						onBlur={handleBlur}
						onChange={(e) =>
							setAddProduct((state) => ({
								...state,
								sku: e.currentTarget.nodeValue as string,
							}))
						}
						// error={!!touched.products && !!errors.products}
					/>
					<TextField
						containerClassName="m-auto lg:flex-col lg:items-start"
						className="my-2 border text-center"
						autoComplete="off"
						type="number"
						name={`addProduct.quantity`}
						label="quantity"
						placeholder="1"
						value={addProduct['quantity']}
						onBlur={handleBlur}
						onChange={(e) =>
							setAddProduct((state) => ({
								...state,
								quantity: e.currentTarget.nodeValue as unknown as number,
							}))
						}
						// error={!!touched.products && !!errors.products}
					/>
					<CheckBox
						name={'isDiscount'}
						onChange={(e) =>
							setAddProduct((state) => ({
								...state,
								isDiscount: e.currentTarget.value as unknown as boolean,
							}))
						}
						checked={addProduct['isDiscount']}
						LabelComponent={H3}
						label="apply discount?"
					/>
					<TextField
						disabled={!addProduct['isDiscount']}
						containerClassName="m-auto lg:flex-col lg:items-start"
						className="my-2 border text-center"
						autoComplete="off"
						type="number"
						name={`addProduct.discount`}
						label="discount"
						placeholder="1"
						value={addProduct['discount']}
						onBlur={handleBlur}
						onChange={(e) =>
							setAddProduct((state) => ({
								...state,
								discount: e.currentTarget.nodeValue as unknown as number,
							}))
						}
						// error={!!touched.products && !!errors.products}
					/>

					<Button
						className="place-self-center"
						onClick={() => {
							values.products.push(addProduct);
							setAddProduct(initialValues.products[0]);
						}}
					>
						<Paragraph>+ add a sku</Paragraph>
					</Button>
					<Button
						loading={loadingButton}
						className="place-self-center"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						<Paragraph>+ add a sku</Paragraph>
					</Button>
				</Center>
			</Grid>
		</Modal>
	);
}

export default NewDailyDealModal;

const styles = {
	responsive:
		'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
};
