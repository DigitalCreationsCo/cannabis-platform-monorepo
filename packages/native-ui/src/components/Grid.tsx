import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { H6 } from './Typography';

type GridProps = {
	title?: string;
	className?: string;
	cols?: string | number;
	rows?: string | number;
	sm?: string | number;
	md?: string | number;
	lg?: string | number;
	xl?: string | number;
	gap?: string;
};
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
}: GridProps & PropsWithChildren) {
	return (
		<View
			className={twMerge(
				'grid',
				cols && `grid-cols-${cols}`,
				rows && 'grid-rows-' + rows,
				sm && `sm:grid-cols-${sm}`,
				md && `md:grid-cols-${md}`,
				lg && `lg:grid-cols-${lg}`,
				xl && `xl:grid-cols-${xl}`,
				gap && 'gap-' + gap,
				className
			)}
		>
			{title && <H6 className="py-2">{title}</H6>}
			{children}
		</View>
	);
}

export default Grid;
