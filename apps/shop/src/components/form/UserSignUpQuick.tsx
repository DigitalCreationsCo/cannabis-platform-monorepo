import { TextContent } from '@cd/core-lib/constants';
import {
    Button,
    FlexBox, Grid, H3, H6, Paragraph, TermsAgreement, TextField
} from '@cd/ui-lib';
import { useFormContext } from 'components';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { userSignUpTour } from 'tour/userSignUpTour';
import * as yup from 'yup';

function UserSignUpQuickForm() {
    
    function startTour () {
        if (!userSignUpTour.isActivated)
        userSignUpTour.start();
    }
    
    useEffect(() => {
        startTour()
    }, [])
    
    const { nextFormStep, prevFormStep, setFormValues, formValues } = useFormContext();
    
    const [loadingButton, setLoadingButton] = useState(false);

    const initialValues = {
        firstName: formValues?.newUser?.firstName || '',
        lastName: formValues?.newUser?.lastName || '',
        username: formValues?.newUser?.username || '',
        email: formValues?.newUser?.email || '',
        phone: formValues?.newUser?.phone || '',
        dialCode: formValues?.newUser?.dialCode || '1',
        termsAccepted: false,
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required').min(3, 'First name is required'),
        lastName: yup.string().required('Last name is required').min(3, 'Last name is required'),
        username: yup.string().required('Username is required').min(6, 'Username is required'),
        email: yup.string().email('invalid email').required('Email is required'),
        phone: yup.string().required('Phone number is required').length(10, 'Phone number must be 10 digits'),
        dialCode: yup.string().required('Dialing code is required'),
        termsAccepted: yup
            .bool()
            .test(
                'termsAccepted',
                'Please read and agree to our User Terms and Conditions.',
                (value) => value === true
            ),
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            setFormValues({ newUser: { ...values }});
            setLoadingButton(false);
            nextFormStep();
        } catch (error: any) {
            console.log('User Create Error: ', error);
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
                console.info('validation errors: ', errors);
                toast.error(Object.values(errors)[0].toString());
            }
        });
    }

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, []);

    return (
            <form onSubmit={(e) => {e.preventDefault();e.stopPropagation();handleSubmit();}}>
                <Paragraph id='user-signup-step-1'>Create your account</Paragraph>
                <H3>{`Get Cannabis Delivered 🌴🔥`}</H3>
                <Grid className="space-y-4">
                <Paragraph>* Please fill the required fields.</Paragraph>
                <FlexBox id='user-signup-step-2' className="flex-row space-x-4">
                    <TextField
                        name="dialCode"
                        label="* dial code"
                        placeholder="+1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.dialCode}
                        error={!!touched.dialCode && !!errors.dialCode}
                        helperText={touched.dialCode && errors.dialCode}
                    />
                    <TextField
                        name="phone"
                        label="* your phone number"
                        placeholder="your phone number"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                    />
                </FlexBox>
                <FlexBox className="flex-row space-x-4">
                    <TextField
                        name="firstName"
                        label="* your first name"
                        placeholder="your first name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                        name="lastName"
                        label="* your last name"
                        placeholder="your last name"
                        value={values.lastName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                    />
                </FlexBox>
                <TextField
                    name="email"
                    type="email"
                    label="* your email address"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="your email address"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />
                <TextField
                    name="username"
                    label="* Choose a username"
                    placeholder="Choose a username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                />
                <TermsAgreement
                        name="termsAccepted"
                        onChange={(e) => handleChange(e)}
                        checked={values.termsAccepted}
                        helperText={touched.termsAccepted && errors.termsAccepted}
                        error={!!touched.termsAccepted && !!errors.termsAccepted}
                        description={
                            <>
                                { TextContent.legal.AGREE_TO_TERMS }
                                <a href="/" target="_blank" rel="noreferrer noopener">
                                    <H6 className={'border-b-2 inline-block'}>{TextContent.legal.USER_TERMS_OF_SERVICE}</H6>.
                                </a>
                            </>
                        }
                        label={`I agree to the User Terms and Conditions`}
                    />
                <FlexBox className='justify-center flex-row space-x-4 py-2'>
                    <Button 
                    loading={loadingButton}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevFormStep();
                    }}
                    >go back</Button>
                    <Button
                    id='user-signup-step-3'
                    type='submit'
                    className="place-self-center"
                    loading={loadingButton}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        notifyValidation();
                        handleSubmit();
                    }}
                    >Next</Button>
                </FlexBox>
            </Grid>
        </form>
    );
}

export default UserSignUpQuickForm;
