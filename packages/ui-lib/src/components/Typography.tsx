import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
	extends PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>> {
	color?: 'light' | 'dark' | 'inherit';
	className?: string;
}

const styles = {
	'cursor-inherit': 'cursor-inherit',
};
export const GrasSignature = ({
	className,
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h1
			className={twMerge(
				'text-secondary',
				'pt-1 pb-0 mb-0',
				'font-gras',
				'tracking-wide leading-3',
				'overflow-visible z-50',
				styles['cursor-inherit'],
				'text-3xl font-bold whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-secondary') ||
					'text-secondary',
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
};

export const H1 = ({
	className,
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h1
			className={twMerge(
				'tracking-tight',
				'leading-tight',
				'font-encode',
				styles['cursor-inherit'],
				'text-4xl font-semibold whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h2
			className={twMerge(
				'font-encode',
				'tracking-tight',
				styles['cursor-inherit'],
				'font-semibold text-3xl whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h3
			className={twMerge(
				'font-encode',
				'tracking-tight',
				styles['cursor-inherit'],
				'font-semibold text-2xl whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h4
			className={twMerge(
				'font-encode',
				'tracking-normal',
				styles['cursor-inherit'],
				'font-semibold text-xl whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h5
			className={twMerge(
				'font-encode',
				'tracking-wider',
				styles['cursor-inherit'],
				'font-semibold text-lg whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<h6
			className={twMerge(
				'tracking-wider',
				styles['cursor-inherit'],
				'font-semibold text-md whitespace-normal',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<p
			className={twMerge(
				'font-encode',
				'font-normal',
				'text-sm',
				'tracking-[1px]',
				styles['cursor-inherit'],
				'whitespace-pre-line',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<p
			className={twMerge(
				'font-onest',
				styles['cursor-inherit'],
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
				'text-sm whitespace-pre-line',
				'tracking-wide',
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
};

export const Span = ({
	className,
	color = 'inherit',
	children,
	...props
}: Props) => {
	return (
		<span
			className={twMerge(
				'font-onest',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
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
	color = 'inherit',
	children,
	className,
	...props
}: Props) => {
	return (
		<span
			className={twMerge([
				'w-fit',
				'font-onest',
				(color === 'light' && 'text-inverse') ||
					(color === 'dark' && 'text-dark') ||
					'text-inherit',
				styles['cursor-inherit'],
				'text-xs whitespace-normal',
				className,
			])}
			{...props}
		>
			{children}
		</span>
	);
};
