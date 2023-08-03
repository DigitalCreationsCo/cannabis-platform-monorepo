import {
	FlexBox,
	H2,
	type LayoutContextProps,
	Page,
	Paragraph,
} from '@cd/ui-lib';
import { twMerge } from 'tailwind-merge';

function AboutGras() {
	return (
		<Page className={twMerge(styles.gradient)}>
			<FlexBox className={twMerge(styles.about)}>
				<FlexBox className="m-auto max-w-[400px]">
					<H2 className="text-secondary">About Gras</H2>
					<Paragraph className="text-justify">
						{`Gras is a home-grown service provider for cannabis lovers.
                    We serve the people of our communities, that enjoy cannabis, by offering a bridge of communication, clarity and support.`}
					</Paragraph>
					<Paragraph className="text-justify">
						Gras is here to bring meaningful fulfillment to our
						customers and partners in the cannabis world,{' '}
						one&nbsp;delivery&nbsp;at&nbsp;a&nbsp;time. ❤️{' '}
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
});

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'md:pt-16'],
	about: [
		'bg-inverse md:rounded shadow',
		'cursor-default',
		'w-full md:w-auto mx-auto space-y-2 h-full p-16 items-center',
	],
};
