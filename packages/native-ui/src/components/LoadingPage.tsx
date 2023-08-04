import Center from './atomic/Center';
import FlexBox from './FlexBox';
import LoadingDots from './LoadingDots';

const LoadingPage = () => {
	return (
		<FlexBox className="grow items-center min-h-screen">
			<Center>
				<LoadingDots />
			</Center>
		</FlexBox>
	);
};

export default LoadingPage;
