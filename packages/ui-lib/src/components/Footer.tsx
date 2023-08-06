import { getDashboardSite, getShopSite, TextContent } from '@cd/core-lib/src';
import Link from 'next/link';
import { styles } from '../styleClassNames';
import CopyRight from './CopyRight';
import FlexBox from './FlexBox';
import { H4, Small } from './Typography';

export default function Footer() {
	return (
		<FlexBox className={styles.FOOTER.container}>
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
					get support
				</Small>
			</Link>

			<Link href={getShopSite('/about-gras')}>
				<Small className="text-inverse hover:underline font-semibold">
					about Gras
				</Small>
			</Link>

			<Small className="text-inverse">
				<CopyRight />
			</Small>

			<H4 color="light">{TextContent.info.CANNABIS_DELIVERED}</H4>
		</FlexBox>
	);
}
