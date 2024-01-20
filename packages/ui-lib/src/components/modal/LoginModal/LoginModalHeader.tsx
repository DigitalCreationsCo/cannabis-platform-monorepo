import { TextContent } from '@cd/core-lib';
import Image from 'next/image';
import logo from '../../../../public/assets/images/logo.png';
import FlexBox from '../../FlexBox';
import { H1, H3 } from '../../Typography';

function LoginModalHeader() {
	return (
		<FlexBox>
			<Image
				src={logo}
				alt="Gras Cannabis logo"
				width={53}
				height={53}
				priority
			/>
			<H3>Welcome to</H3>
			<H1>Gras</H1>

			<H3>
				{/* {TextContent.info.CONNECT_WITH_WORLD_OF_CANNABIS} */}
				{TextContent.info.CANNABIS_DELIVERED}
			</H3>
		</FlexBox>
	);
}

export default LoginModalHeader;
