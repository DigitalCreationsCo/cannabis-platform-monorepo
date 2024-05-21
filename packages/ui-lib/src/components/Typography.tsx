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
		<div
			className={twMerge(
				'text-secondary',
				'pt-1 pb-0 mb-0',
				'font-gras',
				'tracking-wide leading-3',
				'overflow-visible z-50',
				styles['cursor-inherit'],
				'text-3xl font-bold whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
					(color === 'dark' && 'text-secondary') ||
					'text-secondary',
				className,
			)}
			{...props}
		>
			{children}
		</div>
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
				'tracking-wide',
				'leading-tight',
				'font-encode',
				styles['cursor-inherit'],
				'text-2xl md:text-4xl font-semibold whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-wide',
				styles['cursor-inherit'],
				'text-2xl md:!text-3xl',
				'font-semibold whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-wide',
				styles['cursor-inherit'],
				'text-xl md:text-2xl',
				'font-semibold whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-[1px]',
				styles['cursor-inherit'],
				'font-medium text-xl whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-[1px]',
				styles['cursor-inherit'],
				'font-medium text-lg whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				'font-encode',
				'tracking-[1px]',
				styles['cursor-inherit'],
				'font-semibold text-md whitespace-normal',
				(color === 'light' && 'text-inverse-soft') ||
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
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-[1px]',
				'font-onest',
				styles['cursor-inherit'],
				(color === 'light' && 'text-inverse-soft') ||
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
				(color === 'light' && 'text-inverse-soft') ||
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
				'tracking-[1px]',
				'font-encode',
				(color === 'light' && 'text-inverse-soft') ||
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
