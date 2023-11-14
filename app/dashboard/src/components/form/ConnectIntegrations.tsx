/* eslint-disable sonarjs/cognitive-complexity */
import { TextContent, urlBuilder } from '@cd/core-lib';
import { type Inventory, type POS } from '@cd/data-access';
import {
	Button,
	FlexBox,
	Grid,
	H3,
	Paragraph,
	Select,
	Small,
	TextField,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import {
	inventorySystemList,
	pointOfSaleSystemList,
} from '../../pages/[dashboard]/settings/setup-widget';

function ConnectIntegrations() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [loadingButton, setLoadingButton] = useState(false);
	const [pos, setPos] = useState<POS>('none');
	const [inventory, setInventory] = useState<Inventory>('none');

	const { prevFormStep, nextFormStep, formValues, setFormValues } =
		useFormContext();

	const initialValues = {
		pos: formValues.organization?.pos || 'none',
		inventory: formValues.organization?.inventory || 'none',
		dutchieKey: formValues.organization?.dutchieKey || '',
		blazeKey: formValues.organization?.blazeKey || '',
		weedmapsKey: formValues.organization?.weedmapsKey || '',
		metrcLicenseNumber: formValues.organization?.metrcLicenseNumber || '',
		metrcUserKey: formValues.organization?.metrcUserKey || '',
	};

	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			setFormValues({
				organization: {
					...values,
				},
			});
			await updateDispensaryRecord();
			nextFormStep();
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
		}
	};

	const {
		handleChange,
		handleBlur,
		errors,
		touched,
		values,
		handleSubmit,
		validateForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	function notifyValidation() {
		validateForm().then((errors) => {
			if (Object.values(errors).length > 0) {
				console.info('validation errors: ', errors);
				toast.error(Object.values(errors)[0].toString());
			}
		});
	}

	const updateDispensaryRecord = async () => {
		try {
			const response = await axios.put(
				`${urlBuilder.dashboard}/api/organization`,
				formValues.organization,
			);
			if (response.data.success == 'false')
				throw new Error(response.data.error);
			toast.success('Updated integrations successfully.');
		} catch (error: any) {
			throw new Error('The integration is not updated. Please try again.');
		}
	};

	return (
		<form className={'content relative'} onSubmit={handleSubmit}>
			<Grid className="mx-auto max-w-[525px] gap-4">
				<AnimatePresence>
					<FlexBox className="flex-row justify-between gap-4 pr-2 md:pr-0">
						<FlexBox>
							<H3>Connect Point of Sale Integrations</H3>
							<Paragraph>
								Gras integrates with your point of sale and inventory service,
								to make delivery easy.
							</Paragraph>
						</FlexBox>
						<Image
							className="rounded-btn"
							src={'/logo.png'}
							alt="Gras Cannabis logo"
							height={63}
							width={63}
							priority
						/>
					</FlexBox>
					<Small>{TextContent.ui.FORM_FIELDS}</Small>
					<FlexBox className="flex-row justify-between items-center space-x-4">
						<Paragraph>
							Do you use integrated point of sale in your store?
							{'\n'}(If no choice applies, select none).
						</Paragraph>
						<Select
							name={'pos'}
							className="w-[150px]"
							values={pointOfSaleSystemList}
							defaultValue={'none'}
							setOption={(e: any) => {
								handleChange(e);
								setPos(e.target.value);
								switch (e.target.value) {
									case 'dutchie':
										setFieldValue('weedmapsKey', '');
										setFieldValue('blazeKey', '');
										break;
									case 'blaze':
										setFieldValue('weedmapsKey', '');
										setFieldValue('dutchieKey', '');
										break;
									case 'weedmaps':
										setFieldValue('dutchieKey', '');
										setFieldValue('blazeKey', '');
										break;
								}
							}}
						/>
					</FlexBox>
					{pos === 'dutchie' && (
						<motion.div
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
						>
							<TextField
								name="dutchieKey"
								label="* Dutchie API key"
								placeholder="Enter Dutchie API key"
								value={values?.dutchieKey}
								onBlur={handleBlur}
								onChange={handleChange}
								error={!!touched.dutchieKey && !!errors.dutchieKey}
							/>
						</motion.div>
					)}
					{pos === 'blaze' && (
						<motion.div
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
						>
							<TextField
								name="blazeKey"
								label="* Blaze API key"
								placeholder="Enter Blaze API key"
								value={values?.blazeKey}
								onBlur={handleBlur}
								onChange={handleChange}
								error={!!touched.blazeKey && !!errors.blazeKey}
							/>
						</motion.div>
					)}
					{pos === 'weedmaps' && (
						<motion.div
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
						>
							<TextField
								name="weedmapsKey"
								label="* Weedmaps API key"
								placeholder="Enter Weedmaps API key"
								value={values?.weedmapsKey}
								onBlur={handleBlur}
								onChange={handleChange}
								error={!!touched.weedmapsKey && !!errors.weedmapsKey}
							/>
						</motion.div>
					)}
					<FlexBox className="flex-row justify-between items-center space-x-4">
						<Paragraph>
							Do you use inventory service in your store?
							{'\n'}(If no choice applies, select none).
						</Paragraph>
						<Select
							name={'inventory'}
							className="w-[150px]"
							values={inventorySystemList}
							defaultValue={'none'}
							setOption={(e: any) => {
								handleChange(e);
								setInventory(e.target.value);
								if (e.target.value !== 'metrc') {
									setFieldValue('metrcLicenseNumber', '');
									setFieldValue('metrcUserKey', '');
								}
							}}
						/>
					</FlexBox>
					{inventory === 'metrc' && (
						<motion.div
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
						>
							<TextField
								name="metrcLicenseNumber"
								label="* Metric License Number"
								placeholder="What is the Dispensary License Number?"
								value={values?.metrcLicenseNumber}
								onBlur={handleBlur}
								onChange={handleChange}
								error={
									!!touched.metrcLicenseNumber && !!errors.metrcLicenseNumber
								}
							/>
							<TextField
								name="metrcUserKey"
								label="* Metrc API Key"
								placeholder="What is the Metrc API Key?"
								value={values?.metrcUserKey}
								onBlur={handleBlur}
								onChange={handleChange}
								error={!!touched.metrcUserKey && !!errors.metrcUserKey}
							/>
						</motion.div>
					)}
					<FlexBox className="m-auto flex-row space-x-4 pb-20">
						<Button onClick={prevFormStep} disabled={loadingButton}>
							back
						</Button>
						<Button
							id="dispensary-create-step-4"
							type="submit"
							loading={loadingButton}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								notifyValidation();
								handleSubmit();
							}}
						>
							{TextContent.ui.CONTINUE}
						</Button>
					</FlexBox>
				</AnimatePresence>
			</Grid>
		</form>
	);
}

const validationSchema = yup.object().shape({
	pos: yup.string().required(),
	inventory: yup.string().required(),
	dutchieKey: yup.string().when('pos', {
		is: 'dutchie',
		then: yup.string().required('Enter Dutchie API key'),
		otherwise: yup.string(),
	}),
	blazeKey: yup.string().when('pos', {
		is: 'blaze',
		then: yup.string().required('Enter Blaze API key'),
		otherwise: yup.string(),
	}),
	weedmapsKey: yup.string().when('pos', {
		is: 'weedmaps',
		then: yup.string().required('Enter Weedmaps API key'),
		otherwise: yup.string(),
	}),
	metrcLicenseNumber: yup.string().when('inventory', {
		is: 'metrc',
		then: yup.string().required('Enter Metrc License Number'),
		otherwise: yup.string(),
	}),
	metrcUserKey: yup.string().when('inventory', {
		is: 'metrc',
		then: yup.string().required('Enter Metrc API Key'),
		otherwise: yup.string(),
	}),
});

export default ConnectIntegrations;
