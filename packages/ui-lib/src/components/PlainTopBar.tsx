import { TextContent } from '@cd/core-lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/assets/images/logo.png';
import { styles } from '../styleClassNames';
import FlexBox from './FlexBox';
import { GrasSignature, Paragraph } from './Typography';

function TopBar({ className = '' }: { className?: string | string[] }) {
	const { t } = useTranslation('common');

	return (
		<div className={twMerge(styles.TOPBAR.topbar, className)}>
			<div>
				<FlexBox className="flex-row items-center gap-x-2">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-inverse pt-1 pb-0 mb-0 leading-3">
							{t('gras')}
						</GrasSignature>
					</Link>
					<Link href={'/'} className="shrink-0 bg-inverse w-fit rounded-full">
						<Image alt="Gras" className="w-[36px]" src={logo} quality={25} />
					</Link>
				</FlexBox>
				<Link href={'/'}>
					<Paragraph
						className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
					>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
			</div>
			<div className="flex-1"></div>
		</div>
	);
}

export default TopBar;
