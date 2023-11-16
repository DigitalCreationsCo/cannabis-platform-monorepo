import { PropsWithChildren } from 'react';
import { View } from 'react-native';
// import { twMerge } from 'tailwind-merge';

function Center({
	className,
	children,
}: { className?: string } & PropsWithChildren) {
	return (
		<View
		// className={twMerge(
		// 	'grow',
		// 	'justify-center items-center text-center',
		// 	className,
		// )}
		>
			{children}
		</View>
	);
}

export default Center;
