import { urlBuilder } from '@cd/core-lib';
import { type ArticleWithDetails } from '@cd/data-access';
import {
	Button,
	CopyRight,
	FlexBox,
	H2,
	Page,
	Small,
	type LayoutContextProps,
} from '@cd/ui-lib';
import axios from 'axios';
import Router from 'next/router';
import logo from '../../../public/logo.png';

function BlogArticle({ article }: { article: ArticleWithDetails }) {
	return (
		<Page className="px-2 pb-0 md:pb-24">
			<FlexBox className="grow space-y-2">
				<FlexBox>
					<H2>{article.title}</H2>
					<Small>{article.author && `By ${article.author}`}</Small>
					<Small>
						{`${new Date(article.createdAt).toDateString()} ${new Date(
							article.createdAt,
						).toLocaleTimeString()}`}
					</Small>
					<Button
						size="sm"
						bg="accent-soft"
						className="text-dark self-start px-4"
						onClick={() => Router.back()}
					>
						{'<'}
					</Button>
				</FlexBox>
				<Small>{article.description}</Small>
				<img
					src={article.image.location || logo.src}
					alt={article.name}
					width={200}
					height={200}
				/>
				<FlexBox className="grow">
					<Small>{article.content}</Small>
				</FlexBox>
				<CopyRight />
			</FlexBox>
		</Page>
	);
}

export async function getStaticPaths() {
	if (process.env.SKIP_BUILD_STATIC_GENERATION) {
		return {
			paths: [],
			fallback: 'blocking',
		};
	}

	const response = await axios(urlBuilder.shop + '/api/blog');
	if (response.data.success === false) return { paths: [], fallback: false };

	const blogs = response.data.payload;
	const paths = blogs?.map((blog: ArticleWithDetails) => ({
		params: { post: blog.id.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { post: string } }) {
	const response = await axios(urlBuilder.shop + `/api/blog/${params.post}`);
	const article = response.data.payload;
	return { props: { article } };
}

BlogArticle.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default BlogArticle;
