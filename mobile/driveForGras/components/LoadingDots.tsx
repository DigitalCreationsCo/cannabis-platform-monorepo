import { View } from '@themed';

const LoadingDots = () => {
	const dot = 'animate-bounce w-[12px] h-[12px] rounded-full bg-primary';
	return (
		// <View className={twMerge('flex space-x-2 items-center rounded-full')}>
		// 	<View className={twMerge(dot, 'bg-secondary')} />
		// 	<View className={twMerge(dot, 'animate-[bounce_1s_0.15s_infinite]')} />
		// 	<View className={twMerge(dot, 'animate-[bounce_1s_0.3s_infinite]')} />
		// </View>
		<View>
			<View />
			<View />
			<View />
		</View>
	);
};

export default LoadingDots;
