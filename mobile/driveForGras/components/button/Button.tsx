/* eslint-disable sonarjs/cognitive-complexity */
import * as React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import Center from '../atomic/Center';
import LoadingDots from '../LoadingDots';
import { styles } from '../../styles';
import { Text, type ThemeProps, useThemeColor } from '../Themed';

type ButtonProps = TouchableOpacityProps &
	ThemeProps & {
		// size?: 'lg' | 'sm' | 'md';
		// bg?:
		// 	| 'primary'
		// 	| 'primary-light'
		// 	| 'secondary'
		// 	| 'secondary-light'
		// 	| 'accent-soft'
		// 	| 'transparent';
		// hover?: 'accent' | 'primary' | 'primary-light' | 'secondary' | 'transparent';
		// transparent?: true | false;
		// border?: boolean;
		// borderColor?: string;
		// className?: string;
		// disabled?: boolean;
		primary: boolean;
		secondary: boolean;
		loading?: boolean;
		// onPress?: (event: GestureResponderEvent) => void;
		// icon?: any;
		// type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	};

export default function Button({
	// size = 'md',
	// bg = 'accent-soft',
	// border = false,
	// hover = 'accent',
	// transparent = false,
	// type,
	// borderColor,
	// className,
	// disabled,
	// loading,
	// onPress,
	// children,
	...props
}: ButtonProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'accent',
	);
	const borderColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'borderColor',
	);
	const buttonStyle = props.secondary
		? styles.view.buttonSecondary
		: styles.view.buttonPrimary;
	return (
		<TouchableOpacity
			style={[{ backgroundColor, borderColor }, buttonStyle, style]}
			disabled={props.loading || props.disabled}
			onPress={props.onPress}
			{...otherProps}
		>
			{props.loading ? (
				<Center>
					<LoadingDots />
				</Center>
			) : (
				<Text style={styles.text.p}>{props.children}</Text>
			)}
		</TouchableOpacity>
	);
}

Button.defaultProps = {
	primary: true,
	secondary: false,
	loading: false,
};
