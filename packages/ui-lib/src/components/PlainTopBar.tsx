import { getShopSite, TextContent } from '@cd/core-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import { styles } from '../styleClassNames';
import { H2, Paragraph } from './Typography';

function TopBar({ className = '' }: { className?: string | string[] }) {
	return (
		<div className={twMerge(styles.TOPBAR.topbar, className)}>
			<Link href={getShopSite('/')} className="shrink-0">
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>

			<Link href={getShopSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<Link href={getShopSite('/')}>
				<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
					{TextContent.info.CANNABIS_DELIVERED_TEXT}
				</Paragraph>
			</Link>
			<div className="flex-1"></div>
		</div>
	);
}

export default TopBar;
