import { Button, FlexBox, Grid, H3, H6, Paragraph, TextField } from '@cd/shared-ui';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useFormContext } from '../../context/StepFormProvider';
import TermsAgreement from '../TermsAgreement';

// ToDo:
// Organization Search for SearchTextField
// Add country picker to set Country and countryCode fields

function DispensaryCreate({ nextFormStep }: { nextFormStep: () => void }) {
    const { setFormValues } = useFormContext();
    const [loadingButton, setLoadingButton] = useState(false);

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            setFormValues({ organization: { ...values } });
            setLoadingButton(false);
            nextFormStep();
        } catch (error) {
            console.log('Dispensary Create Error: ', error);
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
            <Grid>
                <FlexBox className="flex-row space-x-2 pr-2 md:pr-0">
                    <H3>{`Congratulations, you're joining Gras Cannabis. 
                Welcome to our customers' favorite Cannabis marketplace.`}</H3>
                    <Image
                        className="rounded-btn"
                        src={'/logo.png'}
                        alt="Gras Cannabis logo"
                        height={63}
                        width={63}
                        priority
                    />
                </FlexBox>
                <Paragraph>Please fill all the fields and continue to create your dispensary account.</Paragraph>
                <TextField
                    name="name"
                    label="Dispensary Name"
                    placeholder="What is the name of your Dispensary?"
                    value={values?.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                />
                <TextField
                    name="email"
                    label="Email"
                    placeholder="you@yourdispensary.com"
                    value={values?.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                />
                <Paragraph>What is the phone number of your dispensary business?</Paragraph>
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
                <Paragraph>Where are you located?</Paragraph>
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
                <TermsAgreement
                    name="termsAccepted"
                    onChange={handleChange}
                    checked={values?.termsAccepted || false}
                    helperText={touched.termsAccepted && errors.termsAccepted}
                    description={
                        <>
                            By signing up to be listed on Gras Cannabis Marketplace, you agree to our
                            <a href="/" target="_blank" rel="noreferrer noopener">
                                <H6 className={'border-b-2 inline-block'}>Dispensary Terms and Conditions</H6>.
                            </a>
                        </>
                    }
                    label={`I agree to the Dispensary Terms and Conditions`}
                />
                <Button
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
    );
}

const initialValues = {
    name: 'Curaleaf',
    email: 'makedreamsreal@email.com',
    address: {
        street1: '123 MLK Ave',
        street2: 'Suite 900',
        city: 'Philadelphia',
        state: 'PA',
        zipcode: '19130',
        country: 'United States',
        countryCode: 'US',
        coordinateId: ''
    },
    dialCode: '1',
    phone: '2343454567',
    termsAccepted: false,
    subdomainId: '',
    vendorId: '2'
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Dispensary name is required'),
    email: yup.string().email('invalid email').required('Email is required'),
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
        .test(
            'termsAccepted',
            'Please read and agree to our Dispensary Terms and Conditions.',
            (value) => value === true
        )
});

export default DispensaryCreate;
