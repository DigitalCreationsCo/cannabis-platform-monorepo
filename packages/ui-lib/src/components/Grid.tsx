import { type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { H6 } from './Typography';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	className?: string;
	cols?: string | number;
	rows?: string | number;
	sm?: string | number;
	md?: string | number;
	lg?: string | number;
	xl?: string | number;
	gap?: string;
}
function Grid({
	gap,
	title,
	className,
	cols,
	rows,
	sm,
	md,
	lg,
	xl,
	children,
	...props
}: GridProps & PropsWithChildren) {
	return (
		<div
			className={twMerge(
				'grid',
				cols && `grid-cols-${cols}`,
				rows && 'grid-rows-' + rows,
				sm && `sm:grid-cols-${sm}`,
				md && `md:grid-cols-${md}`,
				lg && `lg:grid-cols-${lg}`,
				xl && `xl:grid-cols-${xl}`,
				gap && 'gap-' + gap,
				className,
			)}
			{...props}
		>
			{title && <H6 className="py-2">{title}</H6>}
			{children}
		</div>
	);
}

export default Grid;
