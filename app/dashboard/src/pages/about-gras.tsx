import { TextContent } from '@cd/core-lib';
import {
	FlexBox,
	H2,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function AboutGras() {
	return (
		<Page className={twMerge(styles.gradient)}>
			<FlexBox className={twMerge(styles.about)}>
				<FlexBox className="m-auto max-w-[400px]">
					<H2 className="text-secondary">About Gras</H2>
					<Paragraph className="text-justify">
						{TextContent.info.ABOUT_GRAS}
					</Paragraph>
					<Paragraph className="text-justify">
						{TextContent.info.GRAS_MISSION}
					</Paragraph>
				</FlexBox>
			</FlexBox>
		</Page>
	);
}

export default AboutGras;

AboutGras.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showTopBar: true,
	showSideNav: false,
});

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'md:pt-16'],
	about: [
		'bg-inverse md:rounded shadow',
		'cursor-default',
		'w-full md:w-auto mx-auto space-y-2 h-full p-16 items-center',
	],
};
