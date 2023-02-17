import { Button, H3, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../context/StepFormProvider';

function DispensarySignUpComplete() {
    const { formData } = useFormContext();
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <form className={'content relative'}>
            <H3>Congratulations, you created your Dispensary on Gras Cannabis Marketplace.</H3>
            <Paragraph>
                You're almost ready to meet the customers on our platform.
                <br />
                Soon, they can find your products and place orders from your dispensary.
                <br />
                Please sign in upload your products and customize your storefront so your new customers can find you in
                the marketplace.
            </Paragraph>
            <Image alt="Gras Cannabis logo" src={'/logo.png'} fill />
            <Link href="/">
                <Button type="submit" loading={loadingButton}>
                    Sign In
                </Button>
            </Link>
        </form>
    );
}

export default DispensarySignUpComplete;
