import { type PropsWithChildren } from 'react';
import IconWrapper, { type IconProps } from '../IconWrapper';
import Button, { type ButtonProps } from './Button';
export interface IconButtonProps extends ButtonProps, IconProps {
	type?: 'button' | 'submit' | 'reset';
	onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
	className?: string;
	iconClass?: string;
	iconSize?: number;
	theme?: 'light' | 'dark';
}
export default function IconButton({
	Icon,
	type = 'button',
	onClick,
	className,
	iconClass,
	iconSize = 20,
	children,
	theme = 'light',
	iconColor,
	...props
}: IconButtonProps & PropsWithChildren) {
	return (
		<Button type={type} onClick={onClick} className={className} {...props}>
			<IconWrapper
				iconColor={iconColor}
				theme={theme}
				iconSize={iconSize}
				className={iconClass}
				Icon={Icon}
			/>
			{children}
		</Button>
	);
}
