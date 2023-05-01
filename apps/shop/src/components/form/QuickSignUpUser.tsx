import {
    Button,
    FlexBox, Grid,
    H3, Icons, Paragraph, TextField
} from '@cd/ui-lib';
import { useFormContext } from 'components';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

function QuickSignUpUserForm({ nextFormStep }: { nextFormStep: () => void }) {
    const { setFormValues } = useFormContext();

    const [loadingButton, setLoadingButton] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible);
    }, []);

    const initialValues = {
        username: 'bigchiefa1111',
        email: 'bmejia2345@gmail.com',
        password: '12323456',
        re_password: '12323456',
        phone: '1233455678',
        dialCode: '1',
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        re_password: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please re-type password'),
        phone: yup.string().required('Phone number is required').length(10, 'Phone number must be 10 digits'),
        dialCode: yup.string().required('Dialing code is required'),
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            setFormValues({ newUser: { ...values } });
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

    return (
            <form onSubmit={handleSubmit}>
                <H3>{`Sign Up`}</H3>
                <H3>{`Get Cannabis Delivered 🌴🔥`}</H3>
                <Grid className="space-y-2">
                <Paragraph>* Please fill the required fields.</Paragraph>
                <FlexBox className="flex-row space-x-4">
                        <TextField
                            name="dialCode"
                            label="* dial code"
                            placeholder="Dial Code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.dialCode}
                            error={!!touched.dialCode && !!errors.dialCode}
                            helperText={touched.dialCode && errors.dialCode}
                        />
                        <TextField
                            name="phone"
                            label="* phone"
                            placeholder="What is your phone number?"
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
                        name="password"
                        label="* password"
                        placeholder="********"
                        value={values?.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        type={passwordVisibility ? 'text' : 'password'}
                        insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                        onClickIcon={togglePasswordVisibility}
                    />
                    <TextField
                        name="re_password"
                        label="* confirm password"
                        placeholder="********"
                        value={values?.re_password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.re_password && !!errors.re_password}
                        helperText={touched.re_password && errors.re_password}
                        type={passwordVisibility ? 'text' : 'password'}
                        insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                        onClickIcon={togglePasswordVisibility}
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
                        Next
                    </Button>
                </Grid>
            </form>
    );
}

export default QuickSignUpUserForm;
