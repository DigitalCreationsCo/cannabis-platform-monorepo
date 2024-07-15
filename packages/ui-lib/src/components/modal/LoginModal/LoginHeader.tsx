import Image from 'next/image';
import logo from '../../../../public/assets/images/logo.png';
import FlexBox from '../../FlexBox';
import { GrasSignature, H2 } from '../../Typography';

function LoginModalHeader() {
	return (
		<FlexBox className="relative top-0 left-0 w-full h-full">
			<FlexBox className="flex-row items-center gap-x-2 pt-2">
				<GrasSignature className="lg:text-4xl drop-shadow-lg pt-1 pb-0 mb-0 leading-3">
					Gras
				</GrasSignature>
				<Image
					alt="Gras"
					className="w-[36px] md:w-[48px]"
					src={logo}
					quality={25}
				/>
			</FlexBox>
			<Image
				className="absolute w-full h-full object-cover -z-10"
				src={require('../../../../public/events-1.png')}
			/>
			<H2 className="">{`Find cannabis events in your city`}</H2>
		</FlexBox>
	);
}

export default LoginModalHeader;
