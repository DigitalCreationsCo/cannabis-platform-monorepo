import { type PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { twMerge } from 'tailwind-merge';
interface Props extends PropsWithChildren<unknown> {
	color?: 'light' | 'dark';
	className?: string;
}

const styles = {
	'cursor-inherit': 'cursor-inherit',
};
export const H1 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'text-4xl font-bold whitespace-nowrap',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const H2 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'font-bold text-3xl whitespace-nowrap',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const H3 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'font-bold text-2xl whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const H4 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-xl whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const H5 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-lg whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const H6 = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-md whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const Paragraph = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'whitespace-pre-line',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const Small = ({ className, color = 'dark', children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				(color === 'light' && 'text-inverse') || 'text-dark',
				'text-sm whitespace-pre-line',
				className,
			)}
		>
			{children}
		</Text>
	);
};

export const Span = ({ className, children, ...props }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'text-md inline whitespace-normal',
				className,
			)}
			{...props}
		>
			{children}
		</Text>
	);
};

export const Tiny = ({ className, children }: Props) => {
	return (
		<Text
			className={twMerge(
				styles['cursor-inherit'],
				'text-xs whitespace-normal',
				className,
			)}
		>
			{children}
		</Text>
	);
};
