/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
	Text as DefaultText,
	useColorScheme,
	View as DefaultView,
} from 'react-native';
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { styles } from '../styles';

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	const theme = useColorScheme() ?? 'light';
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

export type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<DefaultText style={[{ color }, styles.text.p, style]} {...otherProps} />
	);
}

export function SafeAreaView(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background',
	);

	return (
		<DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
	);
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background',
	);

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Container(props: ViewProps) {
	return <View style={styles.view.container} {...props} />;
}

export function Row(props: ViewProps) {
	return <View style={styles.view.row} {...props} />;
}
