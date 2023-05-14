import { urlBuilder } from '@cd/core-lib/utils';
import { Button, FlexBox, Grid, H2, H3, H6, Paragraph, TermsAgreement, TextField } from '@cd/ui-lib';
import axios from 'axios';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useFormContext } from '../StepFormProvider';

// ToDo:
// Organization Search for SearchTextField
// Add country picker to set Country and countryCode fields

function DispensaryCreate({ nextFormStep }: { nextFormStep: () => void }) {
    const { formData, setFormValues } = useFormContext();
    const [loadingButton, setLoadingButton] = useState(false);

    console.log('formData: ', formData);
    
    const initialValues = {
        id: formData.organization?.id || '',
        name: formData.organization?.name || '',
        email: formData.organization?.email || '',
        address: {
            id: formData.organization?.address?.id || '',
            street1: formData.organization?.address?.street1 || '',
            street2: formData.organization?.address?.street2 || '',
            city: formData.organization?.address?.city || '',
            state: formData.organization?.address?.state || '',
            zipcode: formData.organization?.address?.zipcode || '',
            country: formData.organization?.address?.country || '',
            countryCode: formData.organization?.address?.countryCode || 'US',
        },
        dialCode: formData.organization?.dialCode || 1,
        phone: formData.organization?.phone || '',
        termsAccepted: false,
        subdomainId: formData.organization?.subdomainId || '',
        vendorId: formData.organization?.vendorId || ''
    };
    
    const onSubmit = async (values: typeof initialValues) => {
        try {
            setLoadingButton(true);
            
            setFormValues({ organization: { ...values } });

            const updateOrganization = await axios.put(urlBuilder.shop + '/api/organization', values)
            
            if (updateOrganization.status === 200) {
                toast.success('Dispensary Info is uploaded successfully.');
                nextFormStep();
                
            } else { 
                throw new Error('Error adding Dispensary record.')
            }
        } catch (error: any) {
            console.log('Dispensary Account Error: ', error);
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
            <Grid>
                <FlexBox className="justify-between flex-row space-x-2 pr-2 md:pr-0">
                    <FlexBox>
                    <H2>Welcome to Gras</H2>
                    <H3>a one stop cannabis marketplace</H3>
                    </FlexBox>
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
                    helperText={touched.termsAccepted && errors.termsAccepted || ''}
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
                        notifyValidation();
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
