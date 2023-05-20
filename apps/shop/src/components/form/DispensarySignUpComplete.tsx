import { renderAddress } from '@cd/core-lib/utils';
import { Address } from '@cd/data-access';
import { Center, FlexBox, Grid, H2, H4, Paragraph, SignInButton } from '@cd/ui-lib';
import Image from 'next/image';
import { FormDataProps, useFormContext } from '../StepFormProvider';

function DispensarySignUpComplete () {

    const { formData }: { formData: FormDataProps } = useFormContext();
    
    const
    name = formData?.organization?.name as string,
    address = formData?.organization?.address as Address;

    return (
        <Grid className="max-w-[525px] mx-auto space-y-2">
            <FlexBox className='flex-row justify-between'>
                <H2 className='whitespace-normal'>Congratulations, you've created your Dispensary Account with Gras!</H2>
                {/* <Paragraph>
                    {`This is a great step towards introducing your products to the Gras Cannabis Marketplace. You're almost ready to meet our customers.
                    Please sign in upload your products and customize your storefront so your new customers can find you in the marketplace. Soon, they can find your products and place orders from your dispensary.
                    `}
                </Paragraph> */}
                <Image alt="Gras Cannabis logo" src={'/logo.png'} height={63} width={63} priority />
            </FlexBox>
            <Center>
                <H4 className='py-4 cursor-default'>What's next?</H4>
                <Paragraph className='m-auto text-left'>
                    You're now ready to receive delivery orders to{' '}{ name && <b>{name}</b> || ' your business'}{address && `, located at ${renderAddress({ address, breakLine: false, showCountry: false })}` }.
                    {'\n'}Sign in to <b>view your account, connect with your customers, and get orders delivered by Gras.</b>
                </Paragraph>
            </Center>
            <FlexBox className='items-center'>
                <SignInButton />
            </FlexBox>
        </Grid>
    );
}

export default DispensarySignUpComplete;
