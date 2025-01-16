import { TextContent } from '@gras/core/constants';
import { CopyRight, FlexBox, GrasSignature, Paragraph } from '@gras/ui';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import logo from '../../public/logo.png';

function AboutGras() {
	const { t } = useTranslation('common');
	return (
		<div className="md:m-auto md:max-w-xl  bg-gray-800 border-gray-500 border shadow-inner rounded p-10">
			<FlexBox className="flex-row items-center">
				<GrasSignature className="text-inverse lg:text-4xl drop-shadow-lg pt-1 pb-0 mb-0 leading-3">
					{t('gras')}
				</GrasSignature>
				<Image
					alt="Gras"
					className="w-[36px] md:w-[48px]"
					src={logo}
					quality={25}
				/>
			</FlexBox>
			<Paragraph className="mt-2">
				{TextContent.info.ABOUT_GRAS}
				<br />
				<br />
				{TextContent.info.GRAS_MISSION}
			</Paragraph>
			<CopyRight />
		</div>
	);
}

export default AboutGras;
