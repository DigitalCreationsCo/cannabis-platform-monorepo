import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { twMerge as merge } from 'tailwind-merge';
import Center from '../atomic/Center';
// import LoadingDots from '../LoadingDots';

export interface ButtonProps {
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
	onPress?: () => void;
	icon?: any;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	children: React.ReactNode;
}

{
	/* CREATE GLOBAL BUTTON STYLES
            STYLES.BUTTON.BASE
            STYLES.BUTTON.PRESSED
            APPLY HERE
            ACCEPT ARGS
             */
}

export default function RNButton({
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
	const classes = {
		button: [
			'rounded-md',
			'whitespace-nowrap',
			'font-btn',
			'shadow',
			'flex items-center place-self-center',
			'justify-center',
		],
		noClickWhileLoading: loading && 'cursor-not-allowed',
		size: [
			(size === 'lg' && 'text-xl min-w-[180px] h-[70px]') ||
				(size === 'sm' && 'text-sm h-[30px]') ||
				'min-w-[140px] h-10',
		],
		bgColor: [!disabled ? 'bg-' + bg : 'bg-accent'],
		textColor: [
			!disabled
				? [
						(bg === 'transparent' && 'text-dark shadow-none') ||
							(bg === 'accent-soft' && 'text-dark') ||
							'text-light',
				  ]
				: 'text-secondary',
		],
		focus: ['focus:outline-none focus:bg-' + bg],
		hover: [
			!disabled
				? hover && ['hover:bg-' + hover, 'transition ease-in-out duration-50']
				: '',
		],
		transparent: (transparent && 'opacity-90') || '',
		border: [
			border ? 'border-' + (borderColor || hover) : 'border-transparent',
		],
	};
	return (
		<Pressable disabled={loading || disabled} onPress={onPress} {...props}>
			{/* CREATE GLOBAL BUTTON STYLES
            STYLES.BUTTON.BASE
            STYLES.BUTTON.PRESSED
            APPLY HERE
            ACCEPT ARGS
             */}
			{({ pressed }) => (
				<View
					className={merge(
						Object.values(classes),
						merge(className),
						pressed && merge(['bg-accent']),
					)}
				>
					{loading ? (
						<Center>
							{/* <LoadingDots /> */}
							<Text>Loading</Text>
						</Center>
					) : (
						children
					)}
				</View>
			)}
		</Pressable>
	);
}
