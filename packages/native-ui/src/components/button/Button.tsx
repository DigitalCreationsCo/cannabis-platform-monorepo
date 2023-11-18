/* eslint-disable sonarjs/cognitive-complexity */
import React, { type PropsWithChildren } from 'react';
import { TouchableOpacity, type GestureResponderEvent } from 'react-native';
import Center from '../atomic/Center';
import LoadingDots from '../LoadingDots';

export interface ButtonProps extends PropsWithChildren {
	size?: 'lg' | 'sm' | 'md';
	bg?:
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'secondary-light'
		| 'accent-soft'
		| 'transparent';
	hover?: 'accent' | 'primary' | 'primary-light' | 'secondary' | 'transparent';
	transparent?: true | false;
	border?: boolean;
	borderColor?: string;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	icon?: any;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function Button({
	size = 'md',
	bg = 'accent-soft',
	border = false,
	hover = 'accent',
	transparent = false,
	type,
	borderColor,
	className,
	disabled,
	loading,
	onPress,
	children,
	...props
}: ButtonProps) {
	return (
		<TouchableOpacity
			disabled={loading || disabled}
			onPress={onPress}
			{...props}
		>
			{loading ? (
				<Center>
					<LoadingDots />
				</Center>
			) : (
				children
			)}
		</TouchableOpacity>
	);
}
