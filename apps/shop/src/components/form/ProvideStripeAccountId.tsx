import { urlBuilder } from '@cd/core-lib/utils';
import { Button, FlexBox, Grid, H3, Small, TextField } from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useFormContext } from '../StepFormProvider';

function ProvideStripeAccountId({ nextFormStep }: { nextFormStep: () => void }) {

    const { resetFormValues, setFormValues } = useFormContext();

    // useEffect(() => {
    //     const createNewFormContext = () => {
    //         console.info('creating new form context for Dispensary Sign Up Form')
    //         resetFormValues()
    //     }
    //     createNewFormContext()
    // }, [])


    const [loadingButton, setLoadingButton] = useState(false);

    const initialValues = {
        stripeAccountId: ''
    }

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            await connectStripeAccountToDispensary()
            nextFormStep();
        } catch (error: any) {
            console.log('Provide Stripe Account Id Error: ', error);
            toast.error(error.message);
            setLoadingButton(false);
        }
    };

    async function connectStripeAccountToDispensary () {
        try {
            const response = await axios.get(urlBuilder.shop + `/api/stripe${values.stripeAccountId}`, { validateStatus: status => (status >= 200 && status < 300) || status == 404 });

            setFormValues({ organization: { stripeAccountId: values.stripeAccountId } });
            
        } catch (error: any) {
            throw new Error(error.message);
            console.log('Error getting stripe account: ', error);
        }
    }

    // const downloadDispensaryData = async (stripeAccountId: string) => {
    //     try {
    //         const { data } = await axios.get(urlBuilder.shop + `/api/organization/${dispensaryKey}`, { validateStatus: status => (status >= 200 && status < 300) || status == 404 });
    //         if (!data || data.name==="AxiosError") throw new Error('Dispensary is not found.');

    //         console.log('set form values: data: ', data)
    //         setFormValues({ organization: { ...data } });
    //     } catch (error: any) {
    //         throw new Error('Dispensary is not found.');
    //         console.log('Error getting Dispensary: ', error);
    //     }
    // }

    function declineStripeIdAndCreateAccount () {
        
    }

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
                    <H3>Connect with your stripe account</H3>
                    <Small>
                        If your dispensary uses a stripe account for payment, you can provide the stripe account id here,
                        to connect with your stripe account.{'\n'}
                        If you don't have an account, Gras will create one for you, and provide your stripe account details.
                    </Small>
                </FlexBox>
                <TextField
                    className='text-center'
                    name="stripeAccountId"
                    maxLength={24}
                    label="stripe id"
                    placeholder="**** **** **** ****"
                    value={values?.stripeAccountId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.stripeAccountId && !!errors.stripeAccountId}
                    // helperText={touched.stripeAccountId && errors.stripeAccountId}
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
                    Connect my stripe
                </Button>

                <Button
                    type="submit"
                    loading={loadingButton}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        declineStripeIdAndCreateAccount()
                    }}
                >
                    I don't have stripe
                </Button>

            </Grid>
        </form>
    );
}

export default ProvideStripeAccountId;

const validationSchema = yup.object().shape({
    stripeAccountId: yup.string().required().length(24, 'Please provide your stripe account id.')
});