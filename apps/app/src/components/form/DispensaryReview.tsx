import { Button, FlexBox, H3, H5, Paragraph } from '@cd/shared-ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useFormContext } from '../../context/StepFormProvider';

function DispensaryReview({ nextFormStep }: { nextFormStep: () => void }) {
    const [loadingButton, setLoadingButton] = useState(false);
    const { formData } = useFormContext();

    const handleFormSubmit = async () => {
        try {
            setLoadingButton(true);
            await axios.post('/api/organization/', {
                name: formData.organization.name,
                email: formData.organization.email,
                street1: formData.organization.street1,
                street2: formData.organization.street2,
                city: formData.organization.city,
                state: formData.organization.state,
                zipcode: formData.organization.zipcode,
                country: formData.organization.country,
                countryCode: formData.organization.countryCode,
                dialCode: formData.organization.dialCode,
                phone: formData.organization.phone,
                termsAccepted: formData.organization.agreement,
                subdomainId: formData.organization.name.toLowerCase(),
                vendorId: formData.organization.vendorId
            });
            console.log('posting organization');
            const { data } = await axios.post('/api/users/', {
                email: formData.newUser.email,
                password: formData.newUser.password,
                lastName: formData.newUser.lastName,
                firstName: formData.newUser.firstName,
                username: formData.newUser.username,
                re_password: formData.newUser.re_password,
                termsAccepted: formData.newUser.agreement,
                phone: formData.newUser.phone,
                dialCode: formData.newUser.dialCode,
                vendorId: formData.organization.vendorId,
                role: 'ADMIN'
            });
            console.log('posting user', data);

            // const user = await signIn("Credentials", { email: data.email, password: data.password });

            const user = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: formData.newUser.password,
                callbackUrl: 'http://app.localhost:3000/'
            });
            console.log('user: ', user);

            await axios.post('/api/stripe/', {
                email: formData.organization.email,
                vendorId: formData.organization.vendorId
            });
            console.log('posting stripe ');
            setLoadingButton(false);
            toast.success('Organization and User signed up successfully');
            nextFormStep();
            // await signIn("credentials", { email: formData.newUser.email, password: formData.newUser.password });
        } catch (error) {
            console.log('Dispensary Review Error: ', error);
            toast.error(error.response.data.message || error.response.data.errors);
            setLoadingButton(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <form className={'content relative'}>
            <H3>Review Your Account Info</H3>
            <H5>My Dispensary</H5>
            {Object.entries(formData?.organization).map((value, index) => (
                <Paragraph key={`Dispensary-value-${index}`}>{`${value}`}</Paragraph>
            ))}
            <H5>My User Account</H5>
            {Object.entries(formData?.newUser).map((value, index) => (
                <Paragraph key={`User-value-${index}`}>{`${value}`}</Paragraph>
            ))}
            <FlexBox>
                <Button
                    type="submit"
                    loading={loadingButton}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFormSubmit();
                    }}
                >
                    Create my Dispensary Account
                </Button>
            </FlexBox>
        </form>
    );
}

export default DispensaryReview;
