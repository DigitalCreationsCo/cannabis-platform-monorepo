import { Button, H3, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function DispensarySignUpComplete() {
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <form className={'content relative'}>
            <H3>Congratulations! You created your Dispensary Account on Gras Cannabis Marketplace.</H3>
            <Paragraph>
                {`This is a great step towards introducing your products to the Gras Cannabis Marketplace. You're almost ready to meet our customers.
                Please sign in upload your products and customize your storefront so your new customers can find you in the marketplace. Soon, they can find your products and place orders from your dispensary.
                `}
            </Paragraph>
            <Image alt="Gras Cannabis logo" src={'/logo.png'} height={63} width={63} priority />
            <Link href="/">
                <Button size="lg" type="submit" loading={loadingButton}>
                    Create My Storefront
                </Button>
            </Link>
        </form>
    );
}

export default DispensarySignUpComplete;
