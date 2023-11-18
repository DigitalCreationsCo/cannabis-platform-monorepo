import { type PropsWithChildren } from 'react';
import { View, Text } from '@themed';

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
		<View>
			{title && <Text>{title}</Text>}
			{children}
		</View>
	);
}

export default Grid;
