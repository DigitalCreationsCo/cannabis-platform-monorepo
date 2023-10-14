import { TextContent } from '@cd/core-lib';
import { type LayoutContextProps, Page, Grid, H1 } from '@cd/ui-lib';

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

type CoverProps = {
	src: string;
};
const Cover = ({ src }: CoverProps) => (
	<div className="relative top-0 h-20 w-full">COVER {src.toString()}</div>
);
