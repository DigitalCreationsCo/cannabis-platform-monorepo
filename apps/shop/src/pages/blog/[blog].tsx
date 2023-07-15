import { TextContent } from "@cd/core-lib";
import { FlexBox, H2, H3, LayoutContextProps, Page } from "@cd/ui-lib";

function BlogArticle () {
    return (
        <Page className="-z-10">
            <FlexBox>
                <H3>{TextContent.info.COMPANY_NAME}</H3>
                <H2>{'Blog Title'}</H2>
            </FlexBox>
        </Page>
    );
}

export default BlogArticle

BlogArticle.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
  });