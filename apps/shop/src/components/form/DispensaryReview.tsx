import { renderNestedDataObject } from '@cd/core-lib';
import { FlexBox, H3, H5, Paragraph, SignInButton } from '@cd/ui-lib';
import { useEffect } from 'react';
import { FormDataProps, useFormContext } from '../StepFormProvider';
import DispensarySignUpComplete from './DispensarySignUpComplete';

function DispensaryReview({ nextFormStep }: { nextFormStep: () => void }) {

    const { formData }: { formData: FormDataProps } = useFormContext();
    console.log('formData: ', formData)
    // const handleFormSubmit = async () => {
    //     try {
    //         setLoadingButton(true);
    //         await axios.post('/api/organization/', formData.organization, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log('posting organization');
    //         // const { data } = await axios.post('/api/users/', {
    //         //     email: formData.newUser.email,
    //         //     password: formData.newUser.password,
    //         //     lastName: formData.newUser.lastName,
    //         //     firstName: formData.newUser.firstName,
    //         //     username: formData.newUser.username,
    //         //     re_password: formData.newUser.re_password,
    //         //     termsAccepted: formData.newUser.agreement,
    //         //     phone: formData.newUser.phone,
    //         //     dialCode: formData.newUser.dialCode,
    //         //     vendorId: formData.organization.vendorId,
    //         //     role: 'ADMIN'
    //         // }, {
    //         //     headers: { 'Content-Type': 'application/json' }
    //         // });
    //         // console.log('posting user', data);

    //         // const user = await signIn("Credentials", { email: data.email, password: data.password });

    //         // const user = await signIn('credentials', {
    //         //     redirect: false,
    //         //     email: data.email,
    //         //     password: formData.newUser.password,
    //         //     callbackUrl: 'http://app.localhost:3000/'
    //         // });
    //         // console.log('user: ', user);

    //         // await axios.post('/api/stripe/', {
    //         //     email: formData.organization.email,
    //         //     vendorId: formData.organization.vendorId
    //         // });
    //         // console.log('posting stripe ');
    //         setLoadingButton(false);
    //         toast.success('Successfully created your Dispensary Account and User Account!');
    //         nextFormStep();
    //         // await signIn("credentials", { email: formData.newUser.email, password: formData.newUser.password });
    //     } catch (error: any) {
    //         console.log('Dispensary Review Error: ', error);
    //         toast.error(error.response.data.message || error.response.data.errors);
    //         setLoadingButton(false);
    //     }
    // };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-2">
            <DispensarySignUpComplete 
            name={formData?.organization?.name} 
            address={formData?.organization?.address}
            />

            <FlexBox className='items-center'>
                <H5>Sign In to view your account</H5>
                <SignInButton />
            </FlexBox>
            <H3>Review Your Account Info</H3>
            <div className={styles.renderList}>
                <H5>{formData?.organization?.name}</H5>
                {renderNestedDataObject(formData?.organization, Paragraph, ['vendor', 'id', 'createdAt', 'updatedAt', 'coordinateId', 'subdomainId'])}
            </div>

            <div className={styles.renderList}>
                <H5>My User Account</H5>
                {renderNestedDataObject(formData?.newUser, Paragraph, ['emailVerified', 'password', 're_password'])}
            </div>
        </div>
    );
}

export default DispensaryReview;

const styles = {
    renderList: 'border rounded m-auto md:m-0 p-4 w-auto'
}