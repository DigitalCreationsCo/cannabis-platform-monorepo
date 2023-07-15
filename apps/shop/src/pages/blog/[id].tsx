import { TextContent, urlBuilder } from "@cd/core-lib";
import { ArticleWithDetails } from "@cd/data-access";
import { FlexBox, H2, H3, LayoutContextProps, Page } from "@cd/ui-lib";
import axios from "axios";

function BlogArticle ({ blog }: { blog: ArticleWithDetails }) {
    return (
        <Page>
            <FlexBox>
                <H3>{TextContent.info.COMPANY_NAME}</H3>
                <H2>{blog.title}</H2>
            </FlexBox>
        </Page>
    );
}

export async function getStaticPaths() {
    const 
    response = await axios(urlBuilder.shop + 'api/blog');

    const
    blogs = response.data; 
    
    const paths =blogs.map((blog: ArticleWithDetails) => ({
        params: { id: blog.id.toString()}
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: string }} ) {
    const response = await axios(urlBuilder.shop + `api/blog/${params.id}`)
    const
    blog = response.data;
    return { props: { blog } }
}
  
BlogArticle.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false,
});

export default BlogArticle