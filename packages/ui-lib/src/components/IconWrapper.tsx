import { type SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type IconProps = {
	Icon: ((props: SVGAttributes<SVGElement>) => JSX.Element) | any;
	className?: string;
	iconSize?: number;
	iconClass?: string | string[];
	iconColor?: string;
	theme?: 'light' | 'dark';
};
export default function IconWrapper({
	theme,
	Icon,
	className,
	iconSize = 20,
	iconClass,
	iconColor = theme === 'dark' ? 'light' : 'primary',
	...props
}: IconProps) {
	const styles = {
		fill: 'fill-' + iconColor,
	};
	return (
		<div
			className={twMerge(
				'items-center justify-center flex align-items',
				className
			)}
		>
			<Icon
				className={twMerge(
					iconClass
					// styles.fill
				)}
				height={iconSize}
				width={iconSize}
				{...props}
			/>
		</div>
	);
}
