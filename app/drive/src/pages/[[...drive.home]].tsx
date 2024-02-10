import { TextContent } from '@cd/core-lib';
import {
	LoginHeader,
	FlexBox,
	H1,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';

function DriveSignIn() {
	return (
		<Page className="bg-secondary text-light p-0 sm:p-0 md:p-0 lg:p-0">
			<FlexBox>
				<H1>{TextContent.account.SIGNIN}</H1>
				<LoginHeader />
			</FlexBox>
		</Page>
	);
}

DriveSignIn.getLayoutContext = (): LayoutContextProps => ({});
export default DriveSignIn;
