import {
    Button,
    FlexBox, Grid, H3, Paragraph, TextField
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
        username: formValues?.newUser?.username,
        email: formValues?.newUser?.email || '',
        phone: formValues?.newUser?.phone || '',
        dialCode: formValues?.newUser?.dialCode || '1',
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('invalid email').required('Email is required'),
        phone: yup.string().required('Phone number is required').length(10, 'Phone number must be 10 digits'),
        dialCode: yup.string().required('Dialing code is required'),
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
                <Grid id='user-signup-step-2' className="space-y-4">
                <Paragraph>* Please fill the required fields.</Paragraph>
                <FlexBox className="flex-row space-x-4">
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
                        label="* phone"
                        placeholder="phone"
                        value={values?.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                    />
                </FlexBox>
                <TextField
                    name="username"
                    label="* username"
                    placeholder="Choose a username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                />
                <TextField
                    name="email"
                    type="email"
                    label="* email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="email address"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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
