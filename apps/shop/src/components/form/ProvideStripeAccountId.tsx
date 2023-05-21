import { urlBuilder } from '@cd/core-lib/utils';
import { Button, FlexBox, Grid, H3, Small, TextField } from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useFormContext } from '../StepFormProvider';

function ProvideStripeAccountId({ nextFormStep }: { nextFormStep: () => void }) {

    const { formData, setFormValues } = useFormContext();

    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButton2, setLoadingButton2] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const initialValues = {
        stripeAccountId: ''
    }

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);

            await 
            connectStripeAccountToDispensary()

            setLoadingButton(false);
            nextFormStep();

        } catch (error: any) {
            console.log('Provide Stripe Account Id Error: ', error);
            toast.error(error.message);
            setLoadingButton(false);
        }
    };

    async function connectStripeAccountToDispensary () {
        try {
            let 
            organization = formData?.organization;

            if (!organization) 
            throw new Error('Dispensary is not found.');

            const response = await axios.post(
                urlBuilder.shop + `/api/stripe/connect`, { 
                organization, 
                stripeAccountId: values.stripeAccountId
            }, { validateStatus: status => (status >= 200 && status <= 302) || status == 404 });

            console.log('response: ', response)

            if (response.status === 404)
            throw new Error('The stripe account is not found.')

            // if (response.status === 200)
            // setFormValues({ organization: { stripeAccountId: values.stripeAccountId } });
            
            toast.success(`Stripe account connected to ${formData?.organization?.name}.`)
            
        } catch (error: any) {
            console.log('Error getting stripe account: ', error);
            
            toast.error(error.message);

            setLoadingButton(false);
        }
    }

    async function declineStripeIdAndCreateAccount () {
        try {
            setLoadingButton2(true);

            let 
            organization = formData?.organization;

            if (!organization) 
            throw new Error('Dispensary is not found.'); // should never happen
            
            const response = await axios.post(
                urlBuilder.shop + `/api/stripe/create`, { 
                organization, 
                stripeAccountId: values.stripeAccountId }, 
            { validateStatus: status => (status >= 200 && status <= 302) || status == 404 });

            console.log('response: ', response)

            if (response.status === 302) {
                setIsRedirecting(true);
                if (response.data.success)
                window.location.href = response.data.redirect
            }
            // if (response.status !== 201) throw new Error('Error creating stripe account.')

            // let {stripeAccountId} = response.data;
            
            // setFormValues({ organization: { stripeAccountId } });
            
            setLoadingButton2(false);

            // toast.success(`Stripe account connected to ${formData?.organization?.name}.`)
            
        } catch (error: any) {
            console.log('Error getting stripe account: ', error);
            
            setLoadingButton2(false);

            toast.error(error.message);
        }
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
            <form onSubmit={handleSubmit}>
            <Grid className='h-[320px] items-center justify-center flex flex-col space-y-4'>
                <FlexBox>
                    <H3>Connect your stripe account</H3>
                    <Small>
                        If your dispensary uses a stripe account for payment, you can provide the stripe account id here,
                        to connect with your stripe account.{'\n'}
                        If you don't have an account, Gras will create one for you, and provide your stripe account details.
                    </Small>
                </FlexBox>
                <TextField
                    containerClassName='w-[320px]'
                    className='text-center'
                    name="stripeAccountId"
                    maxLength={24}
                    label="Stripe Id"
                    placeholder="**** **** **** ****"
                    value={values?.stripeAccountId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.stripeAccountId && !!errors.stripeAccountId}
                    // helperText={touched.stripeAccountId && errors.stripeAccountId}
                />

                <Button
                className='w-[220px]'
                    type="submit"
                    disabled={loadingButton || loadingButton2 || isRedirecting}
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
                className='w-[220px]'
                    disabled={loadingButton || loadingButton2 || isRedirecting}
                    loading={loadingButton2}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        declineStripeIdAndCreateAccount()
                    }}
                >
                    { isRedirecting ? <div className='animate-pulse'>connecting to stripe...</div> : `I don't have stripe` }
                </Button>

            </Grid>
        </form>
    );
}

export default ProvideStripeAccountId;

const validationSchema = yup.object().shape({
    stripeAccountId: yup.string().required('Please enter your stripe Id').length(21, 'The id is not valid.')
});