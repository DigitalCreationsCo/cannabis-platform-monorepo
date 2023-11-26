import { useRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { styles } from '../styles';
import { View, Text, useThemeColor, type ThemeProps } from './Themed';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
	ThemeProps &
	TextInputProps & {
		label?: string;
	};

const RNTextField = (props: TextFieldProps) => {
	const { style, lightColor, darkColor } = props;

	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'primary',
	);
	const borderColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'borderColor',
	);
	const inverseColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'inverseText',
	);
	const ref = useRef<TextInput>(null);
	return (
		<View
			onStartShouldSetResponder={() => {
				ref.current?.focus();
				return true;
			}}
			style={[
				{ backgroundColor, borderColor },
				styles.input.textFieldContainer,
				style,
			]}
		>
			{(props.label && (
				<Text style={[{ color: inverseColor }, styles.text.p]}>
					{props.label}
				</Text>
			)) ||
				null}
			<TextInput
				autoComplete="off"
				ref={ref}
				autoCapitalize={props.autoCapitalize}
				placeholder={props.placeholder}
				onBlur={props.onBlur}
				onChangeText={props.onChangeText}
				value={props.value}
				style={(styles.input.textField, styles.text.p)}
				{...props}
			/>
		</View>
	);
};
RNTextField.displayName = 'TextField';

export default RNTextField;

RNTextField.defaultProps = {
	autoCapitalize: 'none',
	required: true,
	placeholder: '',
};
