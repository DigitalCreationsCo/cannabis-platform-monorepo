import React, { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Center from '../Center';
import LoadingDots from '../LoadingDots';

export interface ButtonProps
	extends PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {
	size?: 'lg' | 'sm' | 'md';
	bg?:
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'secondary-light'
		| 'accent-soft'
		| 'accent'
		| 'transparent';
	hover?:
		| 'accent'
		| 'accent-soft'
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'transparent';
	transparent?: true | false;
	border?: boolean;
	borderColor?: string;
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
	onClickCapture?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
	icon?: any;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

// eslint-disable-next-line sonarjs/cognitive-complexity
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
	onClick,
	onClickCapture,
	children,
	...props
}: ButtonProps) {
	const classes = {
		button: [
			'rounded-btn',
			'whitespace-nowrap',
			'font-btn',
			'shadow-md',
			'flex items-center place-self-center',
			'justify-center',
		],
		noClickWhileLoading: loading && 'cursor-not-allowed',
		size: [
			(size === 'lg' && 'text-xl min-w-[180px] h-[70px]') ||
				(size === 'sm' && 'text-sm h-[30px]') ||
				'min-w-[140px] h-10',
		],
		// bgColor: [disabled && 'bg-accent' || 'bg-' + bg],
		bgColor: [
			(disabled && 'bg-accent') ||
				(bg === 'primary' && 'bg-primary') ||
				(bg === 'primary-light' && 'bg-primary-light') ||
				(bg === 'secondary' && 'bg-secondary') ||
				(bg === 'secondary-light' && 'bg-secondary-light') ||
				(bg === 'accent' && 'bg-accent') ||
				(bg === 'accent-soft' && 'bg-accent-soft') ||
				(bg === 'transparent' && 'bg-transparent'),
		],
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
		<button
			type={type}
			disabled={loading || disabled}
			onClick={(e) => {
				if (onClick) {
					onClick(e);
				}
			}}
			className={twMerge(Object.values(classes), className)}
			{...props}
		>
			{loading ? (
				<Center>
					<LoadingDots />
				</Center>
			) : (
				children
			)}
		</button>
	);
}
