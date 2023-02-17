import { Button, FlexBox, H3, Paragraph, TextField } from '@cd/shared-ui';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormContext } from '../../context/StepFormProvider';

// ToDo:
// Organization Search for SearchTextField

function DispensaryCreate({ nextFormStep }: { nextFormStep: () => void }) {
    const [loadingButton, setLoadingButton] = useState(false);
    const { setFormValues } = useFormContext();

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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: formSchema
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <form className={'content relative'} onSubmit={handleSubmit}>
            <Image src={'/logo.png'} alt="Gras Cannabis logo" height={63} width={63} priority />
            <H3>{`Congratulations, you're joining Gras Cannabis`}</H3>
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
            {/* name={`variants[${index}].stock`}
                placeholder="Stock"
                value={values?.variants?.[index].stock}
                onBlur={handleBlur}
                onChange={handleChange}
            /> */}
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

            <Button type="submit" loading={loadingButton} disabled={values.termsAccepted === false}>
                Next
            </Button>
        </form>
    );
}

/* 
  id            String    @id @unique @default(cuid())
  name          String
  address Address?
  email         String   @unique
  emailVerified Boolean @default(false)
  dialCode String?
  phone String?
  images ImageOrganization[]
  memberships Membership[]
  products Product[]
  vendorId String
  vendor Vendor @relation(fields: [vendorId], references: [id], onDelete: Restrict, onUpdate:  Restrict)
  termsAccepted Boolean @default(false)
  subdomainId String
  subdomain SubDomain @relation(fields: [subdomainId], references: [id])
  siteSetting SiteSetting?
  orders Order[]
  categoryList CategoryList?
*/
const initialValues = {
    name: 'Curaleaf',
    email: Math.random() * 10 + '@email.com',
    address: {
        street1: '12345',
        street2: '',
        city: '123456',
        state: '1235',
        zipcode: '12356',
        country: 'United States',
        countryCode: 'US',
        coordinateId: '',
        organizationId: '2'
    },
    dialCode: '1',
    phone: '2343454567',
    termsAccepted: false,
    subdomainId: '',
    vendorId: '2'
};

const formSchema = yup.object().shape({
    name: yup.string().required('Dispensary name is required'),
    email: yup.string(),
    street1: yup.string().required('street line 1 is required'),
    street2: yup.string(),
    city: yup.string().required('city is required'),
    state: yup.string().required('state is required'),
    zipcode: yup.string().required('zipcode is required').length(5, 'zipcode must be 5 digits'),
    country: yup.string().required('country is required'),
    countryCode: yup.string().required('country code is required'),
    dialCode: yup.string().required('dialing code is required'),
    phone: yup.string().required('phone number is required').length(10, 'phone number must be 10 digits'),
    agreement: yup
        .bool()
        .test('agreement', 'You have to agree with our Terms and Conditions.', (value) => value === true)
});

export default DispensaryCreate;
