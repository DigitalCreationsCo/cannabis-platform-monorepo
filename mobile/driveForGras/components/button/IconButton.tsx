import { type PropsWithChildren } from 'react';
import IconWrapper, { type IconProps } from '../IconWrapper';
import Button from './Button';
export interface IconButtonProps extends IconProps {
	type?: 'button' | 'submit' | 'reset';
	onPress?: () => void;
	className?: string;
	size?: number;
	theme?: 'light' | 'dark';
}
export default function IconButton({
	Icon,
	type,
	onPress,
	className,
	size = 20,
	children,
	theme = 'light',
	...props
}: IconButtonProps & PropsWithChildren) {
	return (
		<Button type={type} onPress={onPress} className={className} {...props}>
			<IconWrapper theme={theme} size={size} Icon={Icon} />
			{children}
		</Button>
	);
}
