import { TextContent, urlBuilder } from '@cd/core-lib';
import { ArticleWithDetails } from '@cd/data-access';
import {
  FlexBox,
  H2,
  H3,
  LayoutContextProps,
  Page,
  Paragraph,
  Small,
} from '@cd/ui-lib';
import axios from 'axios';
import logo from '../../../public/logo.png';

function BlogArticle({ blog }: { blog: ArticleWithDetails }) {
  console.info('blog: ', blog);
  return (
    <Page className="mx-auto">
      <FlexBox className="grow m-auto">
        <FlexBox>
          <H3>{TextContent.info.COMPANY_NAME}</H3>
          <H2>{blog.title}</H2>
        </FlexBox>
        <img
          src={blog.image.location || logo.src}
          alt={blog.name}
          className="w-60"
        />
        <Paragraph>{blog.description}</Paragraph>
        <div className="grow"></div>
        <Small>
          {TextContent.info.THANK_YOU}{' '}
          {TextContent.info.MORE_CONTENT_COMING_SOON}
        </Small>
      </FlexBox>
    </Page>
  );
}

export async function getStaticPaths() {
  const response = await axios(urlBuilder.main.blog());

  if (response.data.success === false) return { paths: [], fallback: false };

  const blogs = response.data.payload;

  const paths = blogs?.map((blog: ArticleWithDetails) => ({
    params: { id: blog.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await axios(urlBuilder.main.blogById(params.id));

  const blog = response.data.payload;
  return { props: { blog } };
}

BlogArticle.getLayoutContext = (): LayoutContextProps => ({
  showHeader: false,
});

export default BlogArticle;
