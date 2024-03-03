import IconWrapper, { type IconProps } from '../IconWrapper';
import Button, { type ButtonProps } from './Button';

export default function IconButton({
	Icon,
	onPress,
	size = 20,
	children,
	theme = 'light',
	...props
}: IconProps & ButtonProps) {
	return (
		<Button onPress={onPress} {...props}>
			<IconWrapper theme={theme} size={size} Icon={Icon} />
		</Button>
	);
}
