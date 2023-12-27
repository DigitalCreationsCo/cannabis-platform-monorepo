import { TextContent } from '@cd/core-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import { styles } from '../styleClassNames';
import FlexBox from './FlexBox';
import { GrasSignature, Paragraph } from './Typography';

function TopBar({ className = '' }: { className?: string | string[] }) {
	return (
		<div className={twMerge(styles.TOPBAR.topbar, className)}>
			<FlexBox className="flex-row items-center">
				<Link href={'/'} className="z-50">
					<GrasSignature className="text-secondary pt-0.5">Gras</GrasSignature>
				</Link>
				<Link href={'/'} className="shrink-0">
					<Image alt="Gras" width={55} height={55} src={logo} />
				</Link>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</FlexBox>
			<div className="flex-1"></div>
		</div>
	);
}

export default TopBar;
