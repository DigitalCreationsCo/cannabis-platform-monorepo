import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { TextContent } from '../../../core-lib/src';
import logo from '../../public/assets/images/logo.png';
import { styles } from '../styleClassNames';
import FlexBox from './FlexBox';
import { GrasSignature, Paragraph } from './Typography';

function TopBar({ className = '' }: { className?: string | string[] }) {
	const { t } = useTranslation('common');

	return (
		<div className={twMerge(styles.TOPBAR.topbar, 'items-start', className)}>
			<FlexBox>
				<Link
					href={'/'}
					className={twMerge(
						'z-50 flex flex-row gap-x-4 items-center',
						styles.shadow.logoShadow
					)}
				>
					<Image
						alt="Gras"
						className="w-[36px] bg-inverse rounded-full"
						src={logo}
						quality={25}
					/>
					<GrasSignature className="text-inverse py-4 mb-0 leading-3">
						{t('gras')}
					</GrasSignature>
					{/* <Paragraph
						className={twMerge(styles.TOPBAR.tagline, 'text-inverse-soft')}
					>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph> */}
				</Link>
			</FlexBox>
			<div className="flex-1"></div>
		</div>
	);
}

export default TopBar;
