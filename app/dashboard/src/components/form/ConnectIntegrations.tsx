/* eslint-disable sonarjs/cognitive-complexity */
import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	FlexBox,
	Grid,
	H3,
	Paragraph,
	Select,
	Small,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
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

	const { prevFormStep, nextFormStep, formValues, setFormValues } =
		useFormContext();

	const initialValues = {
		pos: formValues.organization?.pos || 'none',
		inventory: formValues.organization?.inventory || 'none',
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

	const { handleChange, handleSubmit, validateForm } = useFormik({
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
				<FlexBox className="flex-row justify-between gap-4 pr-2 md:pr-0">
					<FlexBox>
						<H3>Connect Point of Sale Integrations</H3>
						<Paragraph>
							Gras integrates with your point of sale and inventory service, to
							make delivery easy.
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
						setOption={handleChange}
					/>
				</FlexBox>
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
						setOption={handleChange}
					/>
				</FlexBox>
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
			</Grid>
		</form>
	);
}

const validationSchema = yup.object().shape({
	pos: yup.string().required(),
	inventory: yup.string().required(),
});

export default ConnectIntegrations;
