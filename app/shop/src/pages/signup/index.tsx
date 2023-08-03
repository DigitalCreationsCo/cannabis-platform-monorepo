import { getDashboardSite, TextContent } from '@cd/core-lib';
import {
	Button,
	Center,
	FlexBox,
	Grid,
	H1,
	H4,
	type LayoutContextProps,
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
					<Center className="space-y-4">
						<H1 className="text-primary font-display whitespace-pre-line text-center">
							Welcome to Gras
						</H1>
						<FlexBox className="max-w-[400px]">
							<Paragraph className="whitespace-pre-line">
								To browse our site, you must be 21 years or
								older. Please sign in.
							</Paragraph>
						</FlexBox>

						<SignInButton size="lg" />

						<FlexBox className="m-auto items-center space-y-2">
							<H4 className="text-xl">
								{TextContent.account.ARE_YOU_A_DISPENSARY}
							</H4>
							<Link
								href={getDashboardSite(
									'/signup/create-dispensary-account'
								)}
							>
								<Button
									size="lg"
									bg="primary"
									transparent
									className="hover:bg-primary-light p-4"
								>
									<Paragraph color="light">
										{
											TextContent.account
												.CREATE_DISPENSARY_ACCOUNT
										}
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
});

export default SignUpStart;
