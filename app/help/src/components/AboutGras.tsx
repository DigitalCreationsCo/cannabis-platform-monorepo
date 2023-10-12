import { TextContent } from '@cd/core-lib';
import { CopyRight, FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import logo from '../../public/logo.png';

function AboutGras() {
	return (
		<div className="md:m-auto">
			<FlexBox className="flex-row items-end">
				<Image alt="Gras" width={50} height={50} src={logo} />
				<H2 className="text-primary p-1">
					About {TextContent.info.COMPANY_NAME}
				</H2>
			</FlexBox>
			<Paragraph className="mt-4 max-w-md">
				{TextContent.info.ABOUT_GRAS}
				<br />
				{TextContent.info.GRAS_MISSION}
			</Paragraph>
			<CopyRight />
		</div>
	);
}

export default AboutGras;
