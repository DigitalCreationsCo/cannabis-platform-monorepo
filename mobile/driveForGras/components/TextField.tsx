import { useRef } from 'react';
import { Controller, type Control } from 'react-hook-form';
import { TextInput, type TextInputProps } from 'react-native';
import { styles } from '../styles';
import { View, Text, useThemeColor, type ThemeProps } from './Themed';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
	ThemeProps &
	TextInputProps & {
		name: string;
		control: Control;
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
			<Text style={[{ color: inverseColor }, styles.text.p]}>{props.name}</Text>
			<Controller
				name={props.name}
				control={props.control}
				rules={{ required: props.required }}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						ref={ref}
						autoCapitalize={props.autoCapitalize}
						placeholder={props.placeholder}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={(styles.input.textField, styles.text.h)}
					/>
				)}
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
