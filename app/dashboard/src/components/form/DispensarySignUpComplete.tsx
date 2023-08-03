import { renderAddress } from '@cd/core-lib';
import { Address } from '@cd/data-access';
import {
	Center,
	FlexBox,
	Grid,
	H2,
	H4,
	Paragraph,
	SignInButton,
	useFormContext,
} from '@cd/ui-lib';
import Image from 'next/image';
import { useEffect } from 'react';
import Confetti from 'react-confetti';

function DispensarySignUpComplete() {
	const { formValues, setCanProceed, resetFormValues } = useFormContext();

	const name = formValues?.organization?.name as string,
		address = formValues?.organization?.address as unknown as Address;

	useEffect(
		() => () => {
			resetFormValues();
			setCanProceed(false);
		},
		[]
	);
	return (
		<div>
			<Confetti
				className="w-full h-full"
				numberOfPieces={420}
				recycle={false}
			/>
			<Grid className="max-w-[525px] mx-auto pt-20 md:pt-8 space-y-2">
				<FlexBox className="flex-row justify-between">
					<H2 className="whitespace-normal">
						Congratulations, you created a Dispensary Account with
						Gras.
					</H2>
					{/* <Paragraph>
                    {`This is a great step towards introducing your products to the Gras Cannabis Marketplace. You're almost ready to meet our customers.
                    Please sign in upload your products and customize your storefront so your new customers can find you in the marketplace. Soon, they can find your products and place orders from your dispensary.
                    `}
                </Paragraph> */}
					<Image
						alt="Gras Cannabis logo"
						src={'/logo.png'}
						height={63}
						width={63}
						priority
					/>
				</FlexBox>
				<Center>
					<H4 className="py-4 cursor-default">What's next?</H4>
					<Paragraph className="m-auto text-left">
						You're now ready to receive delivery orders to{' '}
						{(name && <b>{name}</b>) || ' your business'}
						{address &&
							`, located at ${renderAddress({
								address,
								lineBreak: false,
								showCountry: false,
							})}`}
						.{'\n'}Sign in to{' '}
						<b>
							view your account, connect with your customers, and
							get orders delivered by Gras.
						</b>
					</Paragraph>
				</Center>
				<FlexBox className="items-center">
					<SignInButton />
				</FlexBox>
			</Grid>
		</div>
	);
}

export default DispensarySignUpComplete;
