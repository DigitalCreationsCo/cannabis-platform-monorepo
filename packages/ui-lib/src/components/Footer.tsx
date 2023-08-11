import { getDashboardSite, getShopSite, TextContent } from '@cd/core-lib/src';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { styles } from '../styleClassNames';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import Grid from './Grid';
import { H4, Small } from './Typography';

export default function Footer() {
	return (
		// <FlexBox className={styles.FOOTER.container}>
		<FlexBox className={twMerge(styles.FOOTER.container)}>
			<Grid className="md:grid-cols-2 gap-y-2 gap-x-4 lg:mx-auto">
				<Link
					href={getDashboardSite('/signup/create-dispensary-account')}
					passHref
				>
					<Small className="text-inverse hover:underline font-semibold">
						{TextContent.account.DISPENSARIES_START_HERE}
					</Small>
				</Link>

				<Link href={getShopSite('/support')}>
					<Small className="text-inverse hover:underline font-semibold">
						get Technical Support
					</Small>
				</Link>

				<Link href={getShopSite('/support')}>
					<Small className="text-inverse hover:underline font-semibold">
						Frequently Asked Questions
					</Small>
				</Link>

				<Link href={getShopSite('/about-gras')} className="col-span-2">
					<Small className="text-inverse hover:underline font-semibold">
						about Gras
					</Small>
				</Link>

				<Small className="text-inverse flex items-center">
					<CopyRight />
				</Small>

				<H4 color="light" className="flex items-center">
					{TextContent.info.CANNABIS_DELIVERED}
				</H4>
			</Grid>
		</FlexBox>
	);
}
