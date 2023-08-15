import { getShopSite, TextContent } from '@cd/core-lib';
import {
	CopyRight,
	FlexBox,
	H2,
	Page,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

function AboutGras() {
	return (
		<Page className={twMerge(styles.gradient)}>
			<FlexBox className="flex-row items-end">
				<Link href={getShopSite('/')} className="pr-2">
					<Image alt="Gras" width={50} height={50} src={logo} />
				</Link>

				<Link href={getShopSite('/')}>
					<H2 className="pt-0.5 text-white">Gras</H2>
				</Link>
			</FlexBox>

			<Paragraph className="mt-4 max-w-md text-white">
				{TextContent.info.ABOUT_GRAS}
				<br />
				{TextContent.info.GRAS_MISSION}
			</Paragraph>
			<CopyRight />
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
