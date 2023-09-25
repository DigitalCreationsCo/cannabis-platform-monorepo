import { getShopSite } from '@cd/core-lib';
import { H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export default function LogoCapsule() {
	return (
		<div className="bg-inverse m-5 flex w-fit flex-row items-center rounded-[30px] px-5 py-2">
			<Link href={getShopSite('/')} className="pr-2">
				<Image alt="Gras" width={50} height={50} src={logo} />
			</Link>

			<Link href={getShopSite('/')}>
				<H2 className="text-secondary pt-0.5">Gras</H2>
			</Link>

			<Link href={getShopSite('/')}>
				<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
					Cannabis Marketplace
				</Paragraph>
			</Link>
		</div>
	);
}
