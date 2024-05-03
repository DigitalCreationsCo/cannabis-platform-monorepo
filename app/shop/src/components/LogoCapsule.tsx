import { getShopSite, TextContent } from '@cd/core-lib';
import { FlexBox, GrasSignature, H2, Paragraph, styles } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import logo from '../../public/logo.png';

export default function LogoCapsule() {
	return (
		<div className="bg-inverse h-screen w-screen items-center flex m-auto justify-center">
			<div className="flex w-full justify-center flex-row items-center">
				<FlexBox className="m-5 flex-row items-center rounded-[30px] bg-inverse px-5 py-2">
					<Link href={'/'} className="z-50">
						<GrasSignature className="text-secondary pt-0.5">
							Gras
						</GrasSignature>
					</Link>
					<Link href={'/'} className="shrink-0">
						<Image alt="Gras" width={40} height={40} src={logo} />
					</Link>
					<Link href={'/'}>
						<Paragraph className={twMerge(styles.TOPBAR.tagline)}>
							{TextContent.info.CANNABIS_DELIVERED_TEXT}
						</Paragraph>
					</Link>
				</FlexBox>
			</div>
		</div>
	);
}
