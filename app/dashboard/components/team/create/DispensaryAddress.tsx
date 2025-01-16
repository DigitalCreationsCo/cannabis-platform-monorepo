/* eslint-disable sonarjs/cognitive-complexity */
import { TextContent, usStatesAbbreviationList } from '@gras/core';
import {
	type CountryCode,
	type Country,
	type USStateAbbreviated,
} from '@gras/data-access';
import {
	Button,
	FlexBox,
	Modal2 as Modal,
	Select,
	TextField,
	useFormContext,
} from '@gras/ui';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

function DispensaryAddress() {
	const { t } = useTranslation('common');
	const { prevFormStep, nextFormStep, formValues, setFormValues } =
		useFormContext();

	const formik = useFormik({
		initialValues: {
			address: {
				street1: formValues.dispensary?.address?.street1 || '',
				street2: formValues.dispensary?.address?.street2 || '',
				city: formValues.dispensary?.address?.city || '',
				state: (formValues.dispensary?.address?.state ||
					'') as USStateAbbreviated,
				zipcode: formValues.dispensary?.address?.zipcode || '',
				country: (formValues.dispensary?.address?.country ||
					'United States') as Country,
				countryCode: (formValues.dispensary?.address?.countryCode ||
					'US') as CountryCode,
			},
			dialCode: formValues.dispensary?.dialCode || '+1',
			phone: formValues.dispensary?.phone || '',
			domain: formValues.dispensary?.domain || '',
		},
		onSubmit: async (values) => {
			try {
				setFormValues({ dispensary: { ...values } });
				nextFormStep();
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		validationSchema,
	});

	const { values, errors, touched, handleBlur, handleChange } = formik;

	// function notifyValidation() {
	// 	formik.validateForm().then((errors) => {
	// 		if (Object.values(errors).length > 0) {
	// 			console.info('validation errors: ', errors);
	// 			toast.error(
	// 				Object.values(errors)[0]?.toString() ?? 'An error occurred'
	// 			);
	// 		}
	// 	});
	// }

	return (
		<form onSubmit={formik.handleSubmit} method="POST">
			<Modal.Header>{t('enter-dispensary-details')}</Modal.Header>
			<Modal.Body className="flex flex-col gap-y-2">
				<TextField
					name="address.street1"
					label="* address"
					value={values?.address?.street1}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street1 && !!errors?.address?.street1}
					helperText={touched?.address?.street1 && errors?.address?.street1}
				/>
				{/* <TextField
					name="address.street2"
					label="street line 2"
					placeholder="Street Line 2"
					value={values?.address?.street2}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.street2 && !!errors?.address?.street2}
					helperText={touched?.address?.street2 && errors?.address?.street2}
				/>{' '} */}
				<FlexBox className="flex-row items-center space-x-4">
					<TextField
						containerClassName={'flex-1'}
						name="address.city"
						label="* city"
						value={values?.address?.city}
						onBlur={handleBlur}
						onChange={handleChange}
						error={!!touched?.address?.city && !!errors?.address?.city}
						helperText={touched?.address?.city && errors?.address?.city}
					/>
					<Select
						name="address.state"
						containerClassName={'flex-1'}
						label="* state"
						defaultValue={'NY'}
						values={usStatesAbbreviationList}
						setOption={handleChange}
					/>
				</FlexBox>
				{/* <TextField
                    name="address.country"
                    label="* country"
                    placeholder="Country"
                    value={values?.address?.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched?.address?.country && !!errors?.address?.country}
                    helperText={touched?.address?.country && errors?.address?.country}
                /> */}
				<TextField
					name="address.zipcode"
					label="* zipcode"
					value={values?.address?.zipcode}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched?.address?.zipcode && !!errors?.address?.zipcode}
					helperText={touched?.address?.zipcode && errors?.address?.zipcode}
				/>
				<TextField
					name="phone"
					label="* phone"
					value={values?.phone}
					onBlur={handleBlur}
					onChange={handleChange}
					error={!!touched.phone && !!errors.phone}
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
						!formik.dirty || !formik.isValid
							? ''
							: 'bg-secondary-light hover:bg-primary-light'
					)}
				>
					{TextContent.ui.CONTINUE}
				</Button>
			</Modal.Footer>
		</form>
	);
}

const validationSchema = yup.object().shape({
	dialCode: yup.string().required(TextContent.prompt.DIALCODE_REQUIRED),
	phone: yup
		.string()
		.required(TextContent.prompt.PHONE_REQUIRED)
		.length(10, ({ length }) => TextContent.prompt.PHONE_MINIMUM_f(length)),

	address: yup.object().shape({
		street1: yup.string().required(TextContent.prompt.STREET1_REQUIRED),
		street2: yup.string(),
		city: yup.string().required(TextContent.prompt.CITY_REQUIRED),
		state: yup.string().required(TextContent.prompt.STATE_REQUIRED),
		zipcode: yup
			.number()
			.required(TextContent.prompt.ZIPCODE_REQUIRED)
			.test(
				'len',
				TextContent.prompt.ZIPCODE_MINIMUM_f(5),
				(val) => val?.toString().length === 5
			),
		country: yup.string().required(TextContent.prompt.COUNTRY_REQUIRED),
		countryCode: yup.string().required(TextContent.prompt.COUNTRYCODE_REQUIRED),
	}),
});

export default DispensaryAddress;
