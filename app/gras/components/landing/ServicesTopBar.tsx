import { TextContent } from '@cd/core-lib';
import { Button, FlexBox, GrasSignature, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { type HtmlHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';
import { useTranslation } from 'react-i18next';

export type TopBarProps = {
	doesSessionExist?: boolean;
	signOut: () => void;
};

export default function ServicesTopBar({
	className,
	...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
	const { t } = useTranslation('common');
	return (
		<div
			className={twMerge(styles.TOPBAR.topbar, 'shadow-none', className)}
			{...props}
		>
			<FlexBox>
				<FlexBox className="flex-row items-center">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-secondary pt-0.5">
							{t('gras')}
						</GrasSignature>
					</Link>
					<Link href={'/'} className="shrink-0">
						<Image alt="Gras" width={40} height={40} src={logo} />
					</Link>
				</FlexBox>
				<Link href={'/'}>
					<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
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
