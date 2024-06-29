import React, { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Center from '../../Center';
import LoadingDots from '../../LoadingDots';
import { Paragraph } from '../../Typography';

export interface ButtonProps
	extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
	size?: 'lg' | 'sm' | 'md';
	bg?:
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'secondary-light'
		| 'accent-soft'
		| 'accent'
		| 'inverse'
		| 'inverse-soft'
		| 'transparent';
	hover?:
		| 'accent'
		| 'accent-soft'
		| 'inverse'
		| 'inverse-soft'
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'secondary-light'
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
			'text-inherit',
			' px-4',
			(size === 'lg' && 'text-xl min-w-[180px] min-h-[70px]') ||
				(size === 'sm' && 'text-md h-[30px]') ||
				'min-w-[140px] text-md h-10',
		],
		bg: [
			(disabled && 'bg-accent') ||
				(bg === 'primary' && 'bg-primary') ||
				(bg === 'primary-light' && 'bg-primary-light') ||
				(bg === 'secondary' && 'bg-secondary') ||
				(bg === 'secondary-light' && 'bg-secondary-light') ||
				(bg === 'accent' && 'bg-accent') ||
				(bg === 'accent-soft' && 'bg-accent-soft') ||
				(bg === 'inverse' && 'bg-inverse') ||
				(bg === 'inverse-soft' && 'bg-inverse-soft') ||
				(bg === 'transparent' && 'bg-transparent') ||
				'',
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
		focus: ['focus:bg-' + bg],
		hover: [
			'transition ease-in-out duration-50',
			(!disabled &&
				((hover === 'primary' && 'hover:bg-primary') ||
					(hover === 'primary-light' && 'hover:bg-primary-light') ||
					(hover === 'secondary' && 'hover:bg-secondary') ||
					(hover === 'secondary-light' && 'hover:bg-secondary-light') ||
					(hover === 'accent' && 'hover:bg-accent') ||
					(hover === 'accent-soft' && 'hover:bg-accent-soft') ||
					(hover === 'inverse' && 'hover:bg-inverse') ||
					(hover === 'inverse-soft' && 'hover:bg-inverse-soft') ||
					(hover === 'transparent' && 'hover:bg-transparent'))) ||
				'hover:bg-accent',
		],
		transparent: (transparent && 'opacity-90') || '',
		border: [
			border ? 'border-' + (borderColor || hover) : 'border-transparent',
		],
		text: ['font-medium'],
	};

	return (
		<button
			name={children?.toString() || ''}
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
			) : typeof children?.valueOf() === 'string' ? (
				<Paragraph
					className={twMerge(
						classes.text,
						size === 'lg' ? 'text-xl' : 'text-md',
						'text-inherit'
					)}
				>
					{children}
				</Paragraph>
			) : (
				children
			)}
		</button>
	);
}
