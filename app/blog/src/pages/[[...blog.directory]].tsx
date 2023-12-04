import { blogActions, TextContent } from '@cd/core-lib';
import { type LayoutContextProps, Page, Grid, H1 } from '@cd/ui-lib';
import { type AnyAction } from '@reduxjs/toolkit';
import { wrapper } from '../store';

function BlogDirectory() {
	return (
		<Page className={'bg-inherit'}>
			<Grid>
				<H1 className="text-inverse shadow drop-shadow-lg">
					{TextContent.blog.DIRECTORY}
				</H1>
			</Grid>
		</Page>
	);
}

export default BlogDirectory;

BlogDirectory.getLayoutContext = (): LayoutContextProps => ({
	showHeader: true,
	showSideNav: true,
});

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ res }) => {
			try {
				store.dispatch(blogActions.getLatestArticles() as unknown as AnyAction);
				return {
					props: {},
				};
			} catch (error) {
				console.log('Blog Directory ssr: ', error);
				return {
					notFound: true,
				};
			}
		},
);

type CoverProps = {
	src: string;
};
const Cover = ({ src }: CoverProps) => (
	<div className="relative top-0 h-20 w-full">COVER {src.toString()}</div>
);
