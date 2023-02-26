import { UserCreateType } from '@cd/data-access/dist';
import { Button, FlexBox, Grid, H3, H6, Page, Paragraph, TextField } from '@cd/shared-ui';
import {
    DispensaryCreate,
    DispensaryReview,
    DispensarySignUpComplete,
    DispensaryUserCreate,
    FormCard,
    TermsAgreement
} from 'components';
import { useFormik } from 'formik';
import Head from 'next/head';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

function UserSignUp() {
    const [loadingButton, setLoadingButton] = useState(false);
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    const FormStepComponents = [DispensaryCreate, DispensaryUserCreate, DispensaryReview, DispensarySignUpComplete];

    const initialValues: UserCreateType = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        re_password: '',
        phone: '',
        dialCode: '',
        termsAccepted: false,
        imageUser: null,
        address: {
            street1: '123 MLK Ave',
            street2: 'Suite 900',
            city: 'Philadelphia',
            state: 'PA',
            zipcode: '19130',
            country: 'United States',
            countryCode: 'US',
            coordinateId: '',
            userId: ''
        }
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup.string().email('invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        re_password: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please re-type password'),
        agreement: yup
            .bool()
            .test('agreement', 'You have to agree with our Terms and Conditions.', (value) => value === true),
        phone: yup.string().required('Phone number is required').length(10, 'Phone number must be 10 digits'),
        dialCode: yup.string().required('Dialing code is required')
    });

    async function onSubmit(values: UserCreateType) {
        try {
            // if (!loadingButton) {
            //     setLoadingButton(true);
            //     const formData = new FormData();
            //     formData.append('street1', values.street1);
            //     formData.append('street2', values.street2);
            //     formData.append('city', values.city);
            //     formData.append('state', values.state);
            //     formData.append('zipcode', values.zipcode);
            //     formData.append('country', values.country);
            //     formData.append('countryCode', values.countryCode);
            //     formData.append('userId', values.userId);
            //     const { data } = await axios.post(urlBuilder.next + `/api/users/${userId}/address`, formData, {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     });
            //     console.log('address created: ', data);
            //     setLoadingButton(false);
            //     if (setState) setState((prev) => [...prev, data]);
            //     toast.success('Address is created.');
            //     if (onClose) onClose();
            // }
        } catch (error) {
            setLoadingButton(false);
            console.error(error);
            toast.error(error.response.statusText);
            // location.reload();
        }

        // from old user signup flow **
        //     setLoadingButton(true);

        // try {
        //   await axios.post("/api/auth/register", {
        //     email: values.email,
        //     password: values.password,
        //     lastName: values.lastName,
        //     firstName: values.firstName,
        //     username: values.username,
        //     re_password: values.re_password,
        //     termsAccepted: values.agreement,
        //     phone: values.phone,
        //     dialCode: values.dialCode
        //   });
        //   await signIn("credentials", { email: values.email, password: values.password });
        //   toast.success("User signed up successfully");
        //   setLoadingButton(false);
        // } catch (error) {
        //   toast.error(error.response.data.message || error.response.data.errors);
        //   setLoadingButton(false);
        // }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
    return (
        <Page className={twMerge(styles.gradient)}>
            <Head>
                <title>Create an account</title>
            </Head>
            <FormCard currentStep={formStep} totalSteps={FormStepComponents.length}>
                <form onSubmit={handleSubmit}>
                    <H3>{`Create an account`}</H3>
                    <H3>{`Get Cannabis Delivered 🌴🔥`}</H3>
                    <Paragraph>Please fill all the fields and continue to create your dispensary account.</Paragraph>
                    <Grid className="space-y-2">
                        <TextField
                            name="username"
                            label="UserName"
                            placeholder="Choose your username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                        />
                        <TextField
                            name="firstName"
                            label="First Name"
                            placeholder="first name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            error={!!touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <TextField
                            name="lastName"
                            label="Last Name"
                            placeholder="last name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            error={!!touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <TextField
                            name="email"
                            type="email"
                            label="Email"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            placeholder="email address"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                        <FlexBox className="flex-row space-x-4">
                            <TextField
                                name="dialCode"
                                label="Dial Code"
                                placeholder="Dial Code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.dialCode}
                                error={!!touched.dialCode && !!errors.dialCode}
                                helperText={touched.dialCode && errors.dialCode}
                            />
                            <TextField
                                name="phone"
                                label="Phone"
                                placeholder="Phone"
                                value={values?.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                            />
                        </FlexBox>
                        <Paragraph>What is your address for delivery?</Paragraph>
                        <TextField
                            name="address.street1"
                            label="Street Line 1"
                            placeholder="Street Line 1"
                            value={values?.address?.street1}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched?.address?.street1 && !!errors?.address?.street1}
                            helperText={touched?.address?.street1 && errors?.address?.street1}
                        />
                        <TextField
                            name="address.street2"
                            label="Street Line 2"
                            placeholder="Street Line 2"
                            value={values?.address?.street2}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched?.address?.street2 && !!errors?.address?.street2}
                            helperText={touched?.address?.street2 && errors?.address?.street2}
                        />
                        <TextField
                            name="address.city"
                            label="City"
                            placeholder="City"
                            value={values?.address?.city}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched?.address?.city && !!errors?.address?.city}
                            helperText={touched?.address?.city && errors?.address?.city}
                        />
                        <TextField
                            name="address.state"
                            label="State"
                            placeholder="State"
                            value={values?.address?.state}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched?.address?.state && !!errors?.address?.state}
                            helperText={touched?.address?.state && errors?.address?.state}
                        />
                        <TextField
                            name="address.country"
                            label="Country"
                            placeholder="Country"
                            value={values?.address?.country}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={!!touched?.address?.country && !!errors?.address?.country}
                            helperText={touched?.address?.country && errors?.address?.country}
                        />
                        <TextField
                            name="address.zipcode"
                            label="Zipcode"
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
                            helperText={touched.termsAccepted && errors.termsAccepted}
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
                        <Button
                            className="place-self-center"
                            type="submit"
                            loading={loadingButton}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSubmit();
                            }}
                            disabled={values.termsAccepted === false}
                        >
                            Next
                        </Button>
                    </Grid>
                </form>
            </FormCard>
        </Page>
    );
}

export default UserSignUp;
