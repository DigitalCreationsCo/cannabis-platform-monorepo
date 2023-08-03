import {
	Button,
	Center,
	FlexBox,
	Grid,
	H1,
	H4,
	LayoutContextProps,
	Padding,
	Page,
	Paragraph,
	SignInButton,
} from '@cd/ui-lib';
import Link from 'next/link';

function SignUpStart() {
	return (
		<Page>
			<Grid>
				<Padding>
					<Center>
						<H1 className="text-center text-primary whitespace-pre-line font-display">
							Welcome to Gras
						</H1>
						<Padding>
							<FlexBox className="max-w-[400px]">
								<Paragraph className="whitespace-pre-line">
									To browse for cannabis products, you must be 21 years of age
									or older. Please sign in.
								</Paragraph>
							</FlexBox>
						</Padding>
					</Center>

					<Center>
						<SignInButton size="lg" />

						<FlexBox className="m-auto items-center space-y-2">
							<H4 className="text-xl">
								{`Are you a dispensary? Get started here.`}
							</H4>

							<Link href="/signup/create-dispensary-account">
								<Button
									size="lg"
									bg="primary"
									transparent
									className="p-4 hover:bg-primary-light"
								>
									<Paragraph color="light">
										{`Create a dispensary account`}
									</Paragraph>
								</Button>
							</Link>
						</FlexBox>
					</Center>
				</Padding>
			</Grid>
		</Page>
	);
}

SignUpStart.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default SignUpStart;
