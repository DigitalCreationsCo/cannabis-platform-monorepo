import { TextContent, urlBuilder } from '@cd/core-lib';
import {
	Button,
	Grid,
	H2,
	H5,
	Paragraph,
	TextField,
	useFormContext,
} from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

function ProvideDispensaryKey() {
	const { resetFormValues, nextFormStep, setFormValues } = useFormContext();

	useEffect(() => {
		const createNewFormContext = () => {
			console.info(
				'creating new form context for Dispensary Sign Up Form'
			);
			resetFormValues();
		};
		createNewFormContext();
	}, []);

	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		dispensaryKey: '',
	};

	const downloadDispensaryData = async (dispensaryKey: string) => {
		try {
			const response = await axios(
				urlBuilder.dashboard + `/api/organization/${dispensaryKey}`
			);
			if (response.data.success == false)
				throw new Error(response.data.message);
			setFormValues({ organization: { ...response.data.payload } });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
	const onSubmit = async (values: typeof initialValues) => {
		try {
			setLoadingButton(true);

			await downloadDispensaryData(values.dispensaryKey);
			nextFormStep();
		} catch (error: any) {
			toast.error(error.message);
			setLoadingButton(false);
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

	return (
		<form onSubmit={handleSubmit}>
			<Grid className="min-h-[320px] w-full items-center justify-center flex flex-col text-center space-y-4">
				<H2>Welcome to Gras</H2>

				<H5 className="pt-4">
					{TextContent.account.DISPENSARY_JOINING}
				</H5>
				<Paragraph className="text-primary">
					You'll need a <b>dispensary code</b> to create your
					Dispensary account.
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
					containerClassName="w-[300px]"
					className="mx-auto text-center"
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
	);
}

export default ProvideDispensaryKey;

const validationSchema = yup.object().shape({
	dispensaryKey: yup
		.string()
		.required('Please enter a valid Dispensary Key.')
		.max(25, 'Please enter a valid Dispensary Key.'),
});
