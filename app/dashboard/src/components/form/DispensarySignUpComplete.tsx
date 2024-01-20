import { TextContent } from '@cd/core-lib';
import {
	Center,
	FlexBox,
	Grid,
	H2,
	H3,
	H4,
	Paragraph,
	SignInButton,
	useFormContext,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

function DispensarySignUpComplete() {
	const { formValues, setCanProceed, resetFormValues, isComplete } =
		useFormContext();

	const name = formValues?.organization?.name || '';

	const dispensaryFeatures = [
		`your ${name} account,`,
		'setup your delivery ecommerce app,',
		// 'connect with your customers',
	];

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
		<Grid className="mx-auto max-w-[525px] space-y-2 pt-8">
			<FlexBox className="items-center">
				<FlexBox className="flex-row justify-between items-end">
					<H2 className="whitespace-normal tracking-wide">Congratulations!</H2>
					<Image
						alt="Gras Cannabis logo"
						src={'/logo.png'}
						height={63}
						width={63}
						priority
					/>
				</FlexBox>
				<H4 className="whitespace-normal tracking-wide">
					{TextContent.account.DISPENSARY_ACCOUNT_IS_CREATED}
				</H4>
			</FlexBox>
			<Center className="space-y-4 py-4">
				<H4 className="cursor-default">What's next?</H4>
				<Paragraph className="m-auto text-center">
					Sign in to{' '}
					{dispensaryFeatures.map((feature, index) => (
						<>
							<b key={index}>{feature}</b>
							<br />
						</>
					))}
					and <b> receive orders for Delivery By Gras.</b>
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
