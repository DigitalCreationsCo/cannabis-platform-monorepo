import { renderNestedDataObject, selectUserState, TextContent } from "@cd/core-lib";
import { FlexBox, H2, LayoutContextProps, Page, Paragraph } from "@cd/ui-lib";
import { useSelector } from "react-redux";

function AccountPage() {
    const { user } = useSelector(selectUserState);
    return (
        <Page>
            <FlexBox>
                <H2 className="text-primary">{TextContent.account.MY_ACCOUNT}</H2>
                {renderNestedDataObject(user, Paragraph, ['id', 'createdAt', 'updatedAt', 'userId', 'blurhash', 'location', 'idFrontImage', 'idBackImage'])}
            </FlexBox>
        </Page>
    );
}

AccountPage.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
  });

export default AccountPage;