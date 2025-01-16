import { TextContent } from '@gras/core/constants';
import { Button, FlexBox, GrasSignature, Paragraph, styles } from '@gras/ui';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { type HtmlHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export interface TopBarProps {
	doesSessionExist?: boolean;
	signOut: () => void;
}

export default function ServicesTopBar({
	className,
	...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
	const { t } = useTranslation('common');
	return (
		<div className={twMerge(styles.TOPBAR.topbar, className)} {...props}>
			<FlexBox>
				<Link
					href={'/'}
					className={twMerge('z-50 flex flex-row gap-x-2 items-center')}
				>
					<GrasSignature
						className={twMerge(
							styles.shadow.textShadow,
							'text-secondary-light py-4 mb-0 leading-3'
						)}
					>
						{t('gras')}
					</GrasSignature>
					{/* <Image
						alt="Gras"
						className={twMerge(
							styles.shadow.textShadow,
							'w-[54px] rounded-full'
						)}
						src={logo}
					/> */}
					<Paragraph
						className={twMerge(
							styles.TOPBAR.tagline,
							// 'hidden md:block',
							'pt-2',
							'!drop-shadow-[0px_0px_0px_0px_#000000]'
						)}
					>
						{TextContent.info.CANNABIS_DELIVERED_TEXT}
					</Paragraph>
				</Link>
				{/* <FlexBox className="flex flex-row items-center md:space-x-4 md:pr-2">
				<GetStartedButton />
			</FlexBox> */}
			</FlexBox>
		</div>
	);
}

const GetStartedButton = () => {
	return (
		<Button
			size="lg"
			className="!min-h-[50px] !h-[50px] lg:!min-h-[60px] m-3 bg-orange-400 lg:w-[240px] hover:bg-orange-600 hover:text-light focus:bg-orange-700 active:bg-orange-700 hover:animate-[pulse_4s_infite]"
		>
			{TextContent.account.GET_STARTED}
		</Button>
	);
};
