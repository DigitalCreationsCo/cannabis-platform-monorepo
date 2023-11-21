import { type SVGAttributes } from 'react';

export type IconProps = {
	Icon: (props: SVGAttributes<SVGElement>) => JSX.Element;
	className?: string;
	size?: number;
	iconColor?: string;
	theme?: 'light' | 'dark';
};
export default function IconWrapper({
	theme,
	Icon,
	className,
	size = 20,
	iconColor = theme === 'dark' ? 'light' : 'primary',
	...props
}: IconProps) {
	return (
		<div>
			<Icon height={size} width={size} {...props} />
		</div>
	);
}
