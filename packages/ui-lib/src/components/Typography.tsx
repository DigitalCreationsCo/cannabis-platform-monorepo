import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
	extends PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>> {
	color?: 'light' | 'dark';
	className?: string;
}

const styles = {
	'cursor-inherit': 'cursor-inherit',
};
export const H1 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h1
			className={twMerge(
				styles['cursor-inherit'],
				'text-4xl font-bold whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
};

export const H2 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h2
			className={twMerge(
				styles['cursor-inherit'],
				'font-bold text-3xl whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
};

export const H3 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h3
			className={twMerge(
				styles['cursor-inherit'],
				'font-bold text-2xl whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
};

export const H4 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h4
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-xl whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
};

export const H5 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h5
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-lg whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h5>
	);
};

export const H6 = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<h6
			className={twMerge(
				styles['cursor-inherit'],
				'font-semibold text-md whitespace-normal',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</h6>
	);
};

export const Paragraph = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<p
			className={twMerge(
				styles['cursor-inherit'],
				'whitespace-pre-line',
				(color === 'light' && 'text-inverse') || 'text-dark',
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
};

export const Small = ({
	className,
	color = 'dark',
	children,
	...props
}: Props) => {
	return (
		<span
			className={twMerge(
				styles['cursor-inherit'],
				(color === 'light' && 'text-inverse') || 'text-dark',
				'text-sm whitespace-pre-line',
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export const Span = ({ className, children, ...props }: Props) => {
	return (
		<span
			className={twMerge(
				styles['cursor-inherit'],
				'text-md inline whitespace-normal',
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};

export const Tiny = ({
	color = 'dark',
	children,
	className,
	...props
}: Props) => {
	return (
		<span
			className={twMerge(
				(color === 'light' && 'text-inverse') || 'text-dark',
				styles['cursor-inherit'],
				'text-xs whitespace-normal',
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};
