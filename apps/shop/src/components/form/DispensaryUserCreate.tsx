import { urlBuilder } from '@cd/core-lib';
import { Button, FlexBox, Grid, H3, H6, Paragraph, Small, TermsAgreement, TextField, useFormContext } from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

function DispensaryUserCreate () {
    const { prevFormStep, nextFormStep, formData, setFormValues } = useFormContext();
    const [loadingButton, setLoadingButton] = useState(false);
    // const [passwordVisibility, setPasswordVisibility] = useState(false);
    // const togglePasswordVisibility = useCallback(() => {
    //     setPasswordVisibility((visible) => !visible);
    // }, []);

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            
            setFormValues({ newUser: values });

            const response = await axios.post(urlBuilder.shop + '/api/user/admin', {
                user: values,
                role: "OWNER",
                dispensaryId: formData.organization?.id
            }, { validateStatus: () => true});
            
            console.log('response: ', response);
            if (response.status === 404) {
                throw new Error(response.data);
            }

            if (response.status === 400) {
                throw new Error(response.data);
            }

            toast.success('User is created succesfully.');
            setLoadingButton(false);
            nextFormStep();
            
        } catch (error: any) {
            console.log('Dispensary User Error: ', error);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <form className={'content relative'} onSubmit={handleSubmit}>
            <Grid className="max-w-[525px] mx-auto">
                <FlexBox className="justify-between flex-row space-x-2 pr-2 md:pr-0">
                    <FlexBox>
                    <H3>{`Create a Dispensary User Account.`}</H3>
                    <Small>
                        {`Create an account to own and manage your dispensary's inventory, data, and other users. 
                    This account will have the most access to your dispensary.`}</Small>
                    </FlexBox>
                <Image src={'/logo.png'} alt="Gras Cannabis logo" height={63} width={63} priority />

                </FlexBox>
            <Small>* Please fill the required fields</Small>
            <TextField
                name="firstName"
                label="* first name"
                placeholder="First Name"
                value={values?.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
            />
            <TextField
                name="lastName"
                label="* last name"
                placeholder="Last Name"
                value={values?.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.lastName && !!errors.lastName}
            />
            <TextField
                name="username"
                label="* username"
                placeholder="UserName"
                value={values?.username}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.username && !!errors.username}
            />
            <TextField
                name="email"
                type="email"
                label="* email"
                placeholder="Email"
                value={values?.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
            />
            <FlexBox>
                <TextField
                    maxLength={3}
                    name="dialCode"
                    label="* dial code"
                    placeholder="DialCode"
                    value={values?.dialCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.dialCode && !!errors.dialCode}
                />
                <TextField
                    name="phone"
                    label="* phone"
                    placeholder="Phone"
                    value={values?.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.phone && !!errors.phone}
                />
            </FlexBox>
            {/* <TextField
                name="password"
                label="Password"
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
                label="Confirm Password"
                placeholder="********"
                value={values?.re_password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.re_password && !!errors.re_password}
                helperText={touched.re_password && errors.re_password}
                type={passwordVisibility ? 'text' : 'password'}
                insertIcon={passwordVisibility ? Icons.View : Icons.ViewOff}
                onClickIcon={togglePasswordVisibility}
            /> */}
            <TextField
                name="address.street1"
                label="* street line 1"
                placeholder="Street Line 1"
                value={values?.address?.street1}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched?.address?.street1 && !!errors?.address?.street1}
                helperText={touched?.address?.street1 && errors?.address?.street1}
            />
            <TextField
                name="address.street2"
                label="street line 2"
                placeholder="Street Line 2"
                value={values?.address?.street2}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched?.address?.street2 && !!errors?.address?.street2}
                helperText={touched?.address?.street2 && errors?.address?.street2}
            />{' '}
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
                // helperText={touched.termsAccepted && errors.termsAccepted}
                error={!!touched.termsAccepted && !!errors.termsAccepted}
                description={
                    <>
                        <Paragraph>By creating an account with Gras, you agree to our</Paragraph>
                        <a href="/termsandconditions/userterms" target="_blank" rel="noreferrer noopener">
                            <H6 className={'border-b-2 inline-block'}>User Terms and Conditions</H6>.
                        </a>
                    </>
                }
                label={`I agree to the User Terms and Conditions`}
            />
            <FlexBox className='m-auto flex-row space-x-4 pb-20'>
                <Button
                    onClick={prevFormStep}
                    disabled={loadingButton}
                >
                    back
                </Button>
                <Button
                    type="submit"
                    loading={loadingButton}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        notifyValidation();
                        handleSubmit();
                    }}
                    disabled={values.termsAccepted === false}
                >
                    Next
                </Button>
            </FlexBox>
            </Grid>
        </form>
    );
}

const initialValues = {
    firstName: 'initial',
    lastName: 'values',
    username: 'bigchiefa1',
    email: 'bmejiadeveloper2@gmail.com',
    emailVerified: false,
    // password: 'asdfasdf',
    // re_password: 'asdfasdf',
    dialCode: '1',
    phone: '1232343456',
    address: {
        street1: '313 West St',
        street2: '',
        city: 'Philadelphia',
        state: 'PA',
        zipcode: '17603',
        country: 'United States',
        countryCode: 'US',
    },
    isLegalAge: false,
    idVerified: false, 
    memberships: [],
    termsAccepted: false,
    imageUser: []
};

const validationSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    username: yup.string().required('required'),
    email: yup.string().required('required'),
    address: yup.object().shape({
        street1: yup.string().required('street line 1 is required'),
        street2: yup.string(),
        city: yup.string().required('city is required'),
        state: yup.string().required('state is required'),
        zipcode: yup.string().required('zipcode is required').length(5, 'zipcode must be 5 digits'),
        country: yup.string().required('country is required'),
        countryCode: yup.string().required('country code is required')
    }),
    dialCode: yup.string().required('dialing code is required'),
    phone: yup.string().required('phone number is required').length(10, 'phone number must be 10 digits'),
    termsAccepted: yup
        .bool()
        .test('termsAccepted', 'Please read and agree to our User Terms and Conditions.', (value) => value === true)
});

export default DispensaryUserCreate;
