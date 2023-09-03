import { TextContent } from '@cd/core-lib';
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
import Link from 'next/link';
import { useEffect } from 'react';

function DispensarySignUpComplete() {
	const dispensaryFeatures = [
		'view your account',
		'connect with your customers',
	];

	const { formValues, setCanProceed, resetFormValues, isComplete } =
		useFormContext();

	const name = formValues?.organization?.name as string;

	useEffect(
		() => {
			isComplete && isComplete();
			setCanProceed(false);
			return () => resetFormValues();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isComplete],
	);
	return (
		<Grid className="mx-auto max-w-[525px] space-y-2 pt-20 md:pt-8">
			<FlexBox className="flex-row justify-between">
				<H2 className="whitespace-normal">
					{TextContent.account.DISPENSARY_ACCOUNT_IS_CREATED}
				</H2>
				<Image
					alt="Gras Cannabis logo"
					src={'/logo.png'}
					height={63}
					width={63}
					priority
				/>
			</FlexBox>
			<Center className="space-y-4 py-4">
				<H4 className="cursor-default">What's next?</H4>
				<Paragraph className="m-auto text-center">
					{(name && <b>{name}</b>) || 'Your business'} is ready to deliver to
					your customers.
					<br />
					Sign in to{' '}
					{dispensaryFeatures.map((feature, index) => (
						<>
							<b key={index}>{feature}</b>
							<br />
						</>
					))}
					and <b>get orders delivered by Gras.</b>
				</Paragraph>
				<FlexBox className="items-center">
					<SignInButton size="lg" hover="primary-light" bg="primary" />
				</FlexBox>
				<Paragraph>
					If you have questions, our Support Team is one click away.
					<br />
					<Link
						href={TextContent.href.support}
						className="font-semibold underline"
					>
						Get Support
					</Link>
				</Paragraph>
			</Center>
		</Grid>
	);
}

export default DispensarySignUpComplete;
