import Center from './atomic/Center';
import FlexBox from './FlexBox';
import LoadingDots from './LoadingDots';

const LoadingPage = () => {
	const dot = 'animate-bounce w-[12px] h-[12px] rounded-full bg-primary';
	return (
		<FlexBox className="grow items-center min-h-screen">
			<Center>
				<LoadingDots />
			</Center>
		</FlexBox>
	);
};

export default LoadingPage;
