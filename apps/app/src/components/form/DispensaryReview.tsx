import { OrganizationCreateType } from '@cd/data-access/dist';
import { Button, FlexBox, H3, H5, Paragraph } from '@cd/shared-ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useFormContext } from '../../context/StepFormProvider';
import { renderNestedDataObject } from '../../utils';

function DispensaryReview({ nextFormStep }: { nextFormStep: () => void }) {
    const [loadingButton, setLoadingButton] = useState(false);
    const { formData }:{formData: {organization: OrganizationCreateType}} = useFormContext();

    const handleFormSubmit = async () => {
        try {
            setLoadingButton(true);
            await axios.post('/api/organization/', formData.organization, {
            headers: {
                        'Content-Type': 'application/json'
                    }});
            console.log('posting organization');
            // const { data } = await axios.post('/api/users/', {
            //     email: formData.newUser.email,
            //     password: formData.newUser.password,
            //     lastName: formData.newUser.lastName,
            //     firstName: formData.newUser.firstName,
            //     username: formData.newUser.username,
            //     re_password: formData.newUser.re_password,
            //     termsAccepted: formData.newUser.agreement,
            //     phone: formData.newUser.phone,
            //     dialCode: formData.newUser.dialCode,
            //     vendorId: formData.organization.vendorId,
            //     role: 'ADMIN'
            // }, {
            //     headers: { 'Content-Type': 'application/json' }
            // });
            // console.log('posting user', data);

            // const user = await signIn("Credentials", { email: data.email, password: data.password });

            // const user = await signIn('credentials', {
            //     redirect: false,
            //     email: data.email,
            //     password: formData.newUser.password,
            //     callbackUrl: 'http://app.localhost:3000/'
            // });
            // console.log('user: ', user);

            // await axios.post('/api/stripe/', {
            //     email: formData.organization.email,
            //     vendorId: formData.organization.vendorId
            // });
            // console.log('posting stripe ');
            setLoadingButton(false);
            toast.success('Successfully created your Dispensary Account and User Account!');
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
        <form>
            <H3>Review Your Account Info</H3>
            <H5>My Dispensary</H5>
            {renderNestedDataObject(formData?.organization, Paragraph, ['coordinateId', 'subdomainId'])}

            <H5>My User Account</H5>
            {renderNestedDataObject(formData?.newUser, Paragraph, ['emailVerified', 'password', 're_password'])}
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
