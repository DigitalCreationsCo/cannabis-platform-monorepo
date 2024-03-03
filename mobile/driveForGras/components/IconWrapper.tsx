import { type ThemeProps, useThemeColor } from './Themed';

export type IconProps = ThemeProps & {
	Icon: any;
	size?: number;
	theme?: 'light' | 'dark';
	color?: string;
};
export default function IconWrapper({
	theme,
	Icon,
	size = 20,
	color,
	...props
}: IconProps) {
	const { lightColor, darkColor } = props;
	const iconColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'primary',
	);
	color = color || iconColor;

	return <Icon size={size} color={color} {...props} />;
}
