import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	Center,
	Grid,
	H1,
	H4,
	LoadingDots,
	Paragraph,
	TextField,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

// dispensaryKey and dispensary code are mentioned interchangeably
// the code refers to the value `dispensaryKey`
function ProvideDispensaryKey() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code') || '';

	const { resetFormValues, nextFormStep, setFormValues } = useFormContext();

	const createNewFormContext = () => {
		resetFormValues();
	};
	useEffect(() => {
		createNewFormContext();
		!code && setLoading(false);
	}, []);

	const [loadingButton, setLoadingButton] = useState(false);
	const [loading, setLoading] = useState(true);

	const initialValues = {
		dispensaryKey: '',
	};

	async function downloadDispensaryData(dispensaryKey: string) {
		try {
			const response = await axios(
				urlBuilder.dashboard + `/api/organization/${dispensaryKey}`,
			);
			if (response.data.success == 'false') {
				throw new Error(response.data.error);
			}
			setFormValues({ organization: { ...response.data.payload } });
			nextFormStep();
		} catch (error: any) {
			console.info('downloadDispensaryData: ', error);
			throw new Error(error.message);
		}
	}
	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);
			await downloadDispensaryData(values.dispensaryKey);
		} catch (error: any) {
			setLoadingButton(false);
			toast.error(error.message);
		}
	};

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

	if (code) downloadDispensaryData(code);
	return (
		(loading && (
			<Center className="h-[430px]">
				<LoadingDots />
			</Center>
		)) || (
			<form onSubmit={handleSubmit}>
				<Grid className="flex min-h-[320px] w-full flex-col items-center justify-center space-y-4 text-center">
					<H1 className="text-primary text-4xl">Welcome to Gras</H1>
					<H4>{TextContent.account.DISPENSARY_JOINING}</H4>
					<Paragraph>
						You'll need a <b>dispensary code</b> to create your Dispensary
						account.
						<br />
						If you don't have one, email our team at{' '}
						<a
							className="underline"
							href="mailto::support@grascannabis.org?subject=Get my Dispensary Code!&body=I want to create a Dispensary account. I'm claiming my Dispensary code. Thank you!"
						>
							support@grascannabis.org
						</a>{' '}
						to claim your <b>dispensary code.</b>
					</Paragraph>
					<br />
					<Paragraph>
						Enter your <b>dispensary code</b> here.
					</Paragraph>
					<TextField
						className="mx-auto max-w-[440px] text-center"
						name="dispensaryKey"
						maxLength={25}
						label="Dispensary Code"
						placeholder="**** **** **** ****"
						value={values?.dispensaryKey}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched.dispensaryKey && !!errors.dispensaryKey}
						// helperText={touched.dispensaryKey && errors.dispensaryKey}
					/>

					<Button
						type="submit"
						loading={loadingButton}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							notifyValidation();
							handleSubmit();
						}}
					>
						Next
					</Button>
				</Grid>
			</form>
		)
	);
}

export default ProvideDispensaryKey;

const validationSchema = yup.object().shape({
	dispensaryKey: yup
		.string()
		.required('Please enter a valid Dispensary Key.')
		.max(25, 'Please enter a valid Dispensary Key.'),
});
