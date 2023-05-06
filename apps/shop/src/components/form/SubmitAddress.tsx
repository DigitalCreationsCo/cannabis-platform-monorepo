import { userActions } from '@cd/core-lib';
import {
    Button, FlexBox, Grid,
    H3, H6, Paragraph, TermsAgreement, TextField
} from '@cd/ui-lib';
import { useFormContext } from 'components';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FormStepComponentProps } from 'pages/quick-delivery';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signUp } from 'supertokens-auth-react/recipe/emailpassword';
import * as yup from 'yup';

function SubmitAddressForm({ prevFormStep }: FormStepComponentProps) {
    
    const [loadingButton, setLoadingButton] = useState(false);
    const dispatch = useDispatch();

    const { setFormValues, formData } = useFormContext();
    
    useEffect(() => {
        setFormValues({ newUser: { ...values }});
    }, [])

    const router = useRouter();
    

    const initialValues = {
        termsAccepted: false,
        address: {
            street1: '123 MLK Ave',
            street2: 'Suite 900',
            city: 'Philadelphia',
            state: 'PA',
            zipcode: '19130',
            country: 'United States',
            countryCode: 'US',
            coordinateId: '',
            userId: '',
        }
    };

    const validationSchema = yup.object().shape({
        termsAccepted: yup
            .bool()
            .test(
                'termsAccepted',
                'Please read and agree to our User Terms and Conditions.',
                (value) => value === true
            ),
        address: yup.object().shape({
            street1: yup.string().required('street line 1 is required'),
            street2: yup.string(),
            city: yup.string().required('city is required'),
            state: yup.string().required('state is required'),
            zipcode: yup.string().required('zipcode is required').length(5, 'zipcode must be 5 digits'),
            country: yup.string().required('country is required'),
            countryCode: yup.string().required('country code is required')
        })
    });



    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);

            const response = await signUpUser();
            dispatch(userActions.signinUserSync({ user: response?.user }));
            // SUBMIT USER FORM HERE TO SIGNUP

            // setLoadingButton(false);
            // router.push('/checkout')

            async function signUpUser() {
                try {
                    if (!loadingButton) {
                        setLoadingButton(true);

                        const response = await signUp({
                            formFields: [
                                { id: 'email', value: formData.newUser.email },
                                { id: 'emailVerified', value: false.toString() },
                                { id: 'password', value: formData.newUser.password },
                                { id: 're_password', value: formData.newUser.re_password },
                                { id: 'username', value: formData.newUser.username },
                                { id: 'firstName', value: formData.newUser.firstName },
                                { id: 'lastName', value: formData.newUser.lastName },
                                { id: 'dialCode', value: formData.newUser.dialCode },
                                { id: 'phone', value: formData.newUser.phone },
                                { id: 'termsAccepted', value: formData.newUser.termsAccepted.toString() },
                                { id: 'isLegalAge', value: formData.newUser.isLegalAge.toString() },
                                { id: 'idVerified', value: formData.newUser.idVerified.toString() },
                                { id: 'street1', value: formData.newUser.address.street1 },
                                { id: 'street2', value: formData.newUser.address.street2 || '' },
                                { id: 'city', value: formData.newUser.address.city },
                                { id: 'state', value: formData.newUser.address.state },
                                { id: 'zipcode', value: formData.newUser.address.zipcode },
                                { id: 'country', value: formData.newUser.address.country },
                                { id: 'countryCode', value: formData.newUser.address.countryCode || '' }
                            ]
                        });
                        if (response.status === 'FIELD_ERROR') {
                            console.log('signup error: ', response.formFields[0].error);
                            throw new Error(response.formFields[0].error);
                        }
                        console.log('signup error: ', response.status);
                        if (response.status === 'OK') {
                            console.log('signup ok');
                            toast.success('Your account is created.', { duration: 5000 });
                            return response;
                        }
                    }
                } catch (error: any) {
                    setLoadingButton(false);
                    console.error('create acount error: ', error);
                    toast.error(error.message);
                    return null;
                }
            }
            
        } catch (error: any) {
            console.log('User Submit Address Error: ', error);
            toast.error(error.response.data.message || error.response.data.errors);
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
            <form onSubmit={handleSubmit}>
                <H3>{`Where is your delivery going?`}</H3>
                <Paragraph>* Please fill the required fields.</Paragraph>
                <Grid className="space-y-2">
                    <TextField
                        name="address.street1"
                        label="* street address line 1"
                        placeholder="Street"
                        value={values?.address?.street1}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.street1 && !!errors?.address?.street1}
                        helperText={touched?.address?.street1 && errors?.address?.street1}
                    />
                    <TextField
                        name="address.street2"
                        label="street address line 2"
                        placeholder="Street Line 2"
                        value={values?.address?.street2 || ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.street2 && !!errors?.address?.street2}
                        helperText={touched?.address?.street2 && errors?.address?.street2}
                    />
                    <TextField
                        name="address.city"
                        label="* city"
                        placeholder="City"
                        value={values?.address?.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.city && !!errors?.address?.city}
                        helperText={touched?.address?.city && errors?.address?.city}
                    />
                    <TextField
                        name="address.state"
                        label="* state"
                        placeholder="State"
                        value={values?.address?.state}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.state && !!errors?.address?.state}
                        helperText={touched?.address?.state && errors?.address?.state}
                    />
                    <TextField
                        name="address.country"
                        label="* country"
                        placeholder="Country"
                        value={values?.address?.country}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.country && !!errors?.address?.country}
                        helperText={touched?.address?.country && errors?.address?.country}
                    />
                    <TextField
                        name="address.zipcode"
                        label="* zipcode"
                        placeholder="Zipcode"
                        value={values?.address?.zipcode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.address?.zipcode && !!errors?.address?.zipcode}
                        helperText={touched?.address?.zipcode && errors?.address?.zipcode}
                    />
                    <TermsAgreement
                        name="termsAccepted"
                        onChange={handleChange}
                        checked={values?.termsAccepted || false}
                        helperText={touched.termsAccepted && errors.termsAccepted || ''}
                        error={!!touched.termsAccepted && !!errors.termsAccepted}
                        description={
                            <>
                                {`Before creating an account for Gras Cannabis Marketplace, you will agree to our `}
                                <a href="/" target="_blank" rel="noreferrer noopener">
                                    <H6 className={'border-b-2 inline-block'}>User Terms and Conditions</H6>.
                                </a>
                            </>
                        }
                        label={`I agree to the User Terms and Conditions`}
                    />

                    <FlexBox className='justify-center flex-row space-x-4 py-2'>
                        <Button 
                        loading={loadingButton}
                        onClick={prevFormStep}
                        >go back</Button>
                        <Button
                            className="place-self-center"
                            loading={loadingButton}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                notifyValidation();
                                handleSubmit();
                            }}
                        >
                            Checkout
                        </Button>
                    </FlexBox>
                </Grid>
            </form>
    );
}

export default SubmitAddressForm;
