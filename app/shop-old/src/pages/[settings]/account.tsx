import {
	renderNestedDataObject,
	selectUserState,
	TextContent,
} from '@cd/core-lib';
import { Card, H2, Page, Paragraph, type LayoutContextProps } from '@cd/ui-lib';
import { useSelector } from 'react-redux';

function ShopAccountPage() {
	const { user } = useSelector(selectUserState);
	return (
		<Page className="pb-0 md:pb-24">
			<Card className="m-auto h-full my-0 pb-0 md:max-w-[500px]">
				<H2 className="text-primary">{TextContent.account.MY_ACCOUNT}</H2>
				{renderNestedDataObject(user, Paragraph, {
					removeFields: [
						'id',
						'createdAt',
						'updatedAt',
						'userId',
						'blurhash',
						'location',
						'idFrontImage',
						'idBackImage',
						'orders',
					],
				})}
			</Card>
		</Page>
	);
}

ShopAccountPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default ShopAccountPage;
