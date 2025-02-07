"use client"
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { TextContent } from '@gras/core/constants';
import { modalTypes } from '@gras/core/types';
import { replaceRelativePath } from '@gras/core/utils';
import {
	Button,
	FlexBox,
	GrasSignature,
	IconButton,
	Paragraph,
	styles,
} from '@gras/ui';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export interface TopBarProps {
	doesSessionExist?: boolean;
	signOut: () => void;
}

function TopBar({ signOut }: TopBarProps) {
	const t = useTranslations('common');
	return (
		<div className={twMerge(styles.TOPBAR.topbar)}>
			<FlexBox className="flex-row items-center">
				<Link href={'/'} className="z-50">
					<GrasSignature className="text-secondary pt-0.5">
						{t('gras')}
					</GrasSignature>
				</Link>
				<Link href={'/'} className="shrink-0">
					<Image alt="Gras" width={40} height={40} src={logo} quality={25} />
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

export default TopBar