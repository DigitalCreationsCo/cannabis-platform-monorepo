import { urlBuilder } from '@cd/core-lib/utils';
import { Button, FlexBox, Grid, H2, Paragraph, TextField } from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { FormStepComponentProps, useFormContext } from '../StepFormProvider';

function ProvideDispensaryKey({ nextFormStep }: FormStepComponentProps) {

    const { resetFormValues, setFormValues } = useFormContext();

    useEffect(() => {
        const createNewFormContext = () => {
            console.info('creating new form context for Dispensary Sign Up Form')
            resetFormValues()
        }
        createNewFormContext()
    }, [])


    const [loadingButton, setLoadingButton] = useState(false);

    const initialValues = {
        dispensaryKey: ''
    }

    const downloadDispensaryData = async (dispensaryKey: string) => {
        try {
            const response = await axios.get
            (urlBuilder.shop + `/api/organization/${dispensaryKey}`, { validateStatus: status => (status >= 200 && status < 300) || status == 404 });

            if (response.status !== 200) 
            throw new Error('Dispensary is not found.');

            setFormValues({ organization: { ...response.data } });

        } catch (error: any) {
            throw new Error('Dispensary is not found.');
            console.log('Error getting Dispensary: ', error);
        }
    }
    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);

            await downloadDispensaryData(values.dispensaryKey);
            nextFormStep();
            
        } catch (error: any) {
            console.log('Provide Dispensary Key Error: ', error);
            toast.error(error.message);
            setLoadingButton(false);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, validateForm } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    function notifyValidation() {
        validateForm().then((errors) => {
            if (Object.values(errors).length > 0) {
                console.log('validation errors: ', errors);
                toast.error(Object.values(errors)[0].toString());
            }
        });
    }

    return (
            <form className={''} onSubmit={handleSubmit}>
            <Grid className='h-[320px] items-center justify-center flex flex-col space-y-4'>
                <FlexBox>
                    <H2>Welcome to Gras</H2>
                    <Paragraph>Please enter the 24-digit Dispensary Key provided by the Gras team.</Paragraph>
                </FlexBox>
                <TextField
                    className='text-center'
                    name="dispensaryKey"
                    maxLength={24}
                    label="Dispensary Key"
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
    dispensaryKey: yup.string().required().length(24, 'Please provide your 24-digit dispensary key.')
});