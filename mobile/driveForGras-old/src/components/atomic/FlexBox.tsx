import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FlexBox = ({
	children,
	className,
}: { className?: string } & PropsWithChildren) => (
	<View className={twMerge('flex flex-col', 'items-start', className)}>
		{children}
	</View>
);

export default FlexBox;
