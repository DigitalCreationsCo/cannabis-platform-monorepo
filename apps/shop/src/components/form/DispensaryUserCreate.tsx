import { useFormContext } from '@cd/shared-lib';
import { Button, CheckBox, FlexBox, H3, H6, Icons, Label, Paragraph, Small, TextField } from '@cd/shared-ui';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

// To Do: Add helpertext to textfields
function DispensaryUserCreate({ nextFormStep }: { nextFormStep: () => void }) {
    const { setFormValues } = useFormContext();
    const [loadingButton, setLoadingButton] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisibility((visible) => !visible);
    }, []);

    const onSubmit = async (values: typeof initialValues) => {
        try {
            console.log('values');
            setLoadingButton(true);
            setFormValues({ newUser: { ...values } });
            setLoadingButton(false);
            console.log('Dispensary User Create Values: ', values);
            nextFormStep();
        } catch (error) {
            console.log('Dispensary User Create Error: ', error);
            toast.error(error.response.data.message || error.response.data.errors);
            setLoadingButton(false);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <form className={'content relative'} onSubmit={handleSubmit}>
            <Image src={'/logo.png'} alt="Gras Cannabis logo" height={63} width={63} priority />
            <H3>{`Create your first User Account.`}</H3>
            <Paragraph>{`Create an account to own and manage your dispensary's inventory, data, and other users. 
            This will be the account with the most access to view and change data in your dispensary.`}</Paragraph>
            <Small>Please fill the applicable fields to continue</Small>
            <TextField
                name="firstName"
                label="First Name"
                placeholder="First Name"
                value={values?.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
            />
            <TextField
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                value={values?.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.lastName && !!errors.lastName}
            />
            <TextField
                name="username"
                label="UserName"
                placeholder="UserName"
                value={values?.username}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.username && !!errors.username}
            />
            <TextField
                name="email"
                type="email"
                label="Email"
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
                    label="DialCode"
                    placeholder="DialCode"
                    value={values?.dialCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.dialCode && !!errors.dialCode}
                />
                <TextField
                    name="phone"
                    label="Phone"
                    placeholder="Phone"
                    value={values?.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.phone && !!errors.phone}
                />
            </FlexBox>
            <TextField
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
            />
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
            />{' '}
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
            <FlexBox>
                <Label>
                    By creating a User Account on Gras Cannabis Marketplace, you agree to our
                    <a href="/" target="_blank" rel="noreferrer noopener">
                        <H6 className={'border-b-2 inline-block'}>User Terms & Conditions</H6>
                    </a>
                </Label>
                <CheckBox
                    type="checkbox"
                    name="termsAccepted"
                    onChange={handleChange}
                    checked={values?.termsAccepted || false}
                />
                <Label>{touched.termsAccepted && errors.termsAccepted}</Label>
                <Paragraph>I agree to the dispensary terms and conditions</Paragraph>
            </FlexBox>
            <Button
                type="submit"
                loading={loadingButton}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('submit');
                    handleSubmit();
                }}
                disabled={values.termsAccepted === false}
            >
                Next
            </Button>
        </form>
    );
}

const initialValues = {
    firstName: 'Bryant',
    lastName: 'Mehaffey',
    username: 'bigchiefa1',
    email: 'bigchief@gmail.com',
    emailVerified: false,
    password: 'asdfasdf',
    re_password: 'asdfasdf',
    dialCode: '1',
    phone: '1232343456',
    address: {
        street1: '313 West St',
        street2: '',
        city: 'Philadelphia',
        state: 'PA',
        zipcode: '17603',
        country: 'United States',
        countryCode: 'US'
    },
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
