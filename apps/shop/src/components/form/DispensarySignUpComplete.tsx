import { renderAddress } from '@cd/core-lib/utils';
import { AddressCreateType } from '@cd/data-access';
import { FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import { useEffect } from 'react';

function DispensarySignUpComplete({ name, address }: {
    name?: string;
    address?: AddressCreateType;
}) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='space-y-2'>
            <FlexBox className='flex-row justify-between'>
            <H2 className='whitespace-normal'>You did it! You created your Dispensary Account with Gras.</H2>
            {/* <Paragraph>
                {`This is a great step towards introducing your products to the Gras Cannabis Marketplace. You're almost ready to meet our customers.
                Please sign in upload your products and customize your storefront so your new customers can find you in the marketplace. Soon, they can find your products and place orders from your dispensary.
                `}
            </Paragraph> */}
            <Image alt="Gras Cannabis logo" src={'/logo.png'} height={63} width={63} priority />
            </FlexBox>
            <Paragraph className='m-auto'>
                You're now ready to receive delivery orders to{ name && ` ${name}` || ' your business'}{address && `, located at ${renderAddress({ address, breakLine: false })}` }.
                {'\n'}Delivery orders will be sent to the user you've added to your account.
            </Paragraph>
        </div>
    );
}

export default DispensarySignUpComplete;
