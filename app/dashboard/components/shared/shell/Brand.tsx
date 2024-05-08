/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GrasSignature, useTheme } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.png';

const Brand = () => {
	const { t } = useTranslation('common');

	return (
		<div className="flex pt-6 px-2 shrink-0 items-center text-xl font-bold gap-2 dark:text-gray-100">
			<Link
				href={'/dashboard'}
				className="shrink-0 flex flex-row items-center gap-2"
			>
				<GrasSignature className="text-secondary pt-1 pb-0 mb-0 leading-3">
					{t('gras')}
				</GrasSignature>
				<Image alt="Gras" width={40} height={40} src={logo} />
			</Link>
			{/* <Image
				className="w-auto"
				src={theme !== 'dark' ? app.logoUrl : '/logowhite.png'}
				alt={app.name}
				width={30}
				height={30}
			/> */}
		</div>
	);
};

export default Brand;
