import {
	type TextStyle,
	type ViewStyle,
	type TextInputProps,
} from 'react-native';
import { fontSize, shadow, spacing } from './constants';

const textStyles = Object.freeze<
	Record<'h' | 'p' | 'secondary' | 'error', TextStyle>
>({
	h: { fontSize: fontSize.lg, letterSpacing: 0.4 },
	p: { fontSize: fontSize.sm, letterSpacing: 0.4 },
	secondary: { textDecorationLine: 'underline' },
	error: {
		fontSize: fontSize.sm,
		color: '#dd1616',
		fontWeight: '500',
		letterSpacing: 0.4,
	},
});

const viewStyles = Object.freeze<
	Record<
		| 'container'
		| 'row'
		| 'center'
		| 'padding'
		| 'buttonPrimary'
		| 'buttonSecondary',
		ViewStyle
	>
>({
	container: {
		width: '100%',
		height: '100%',
	},
	row: { flexDirection: 'row', alignItems: 'center' },
	center: {
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
	},
	padding: {
		padding: spacing[4],
	},
	buttonPrimary: {
		borderRadius: spacing.radius,
		alignItems: 'center',
		justifyContent: 'center',
		height: spacing.sm,
		margin: spacing[2],
		...shadow,
	},
	buttonSecondary: {
		borderRadius: spacing.radius,
		alignItems: 'center',
		justifyContent: 'center',
		height: spacing.sm,
		margin: spacing[2],
		backgroundColor: 'transparent',
	},
});

const inputStyles = Object.freeze<
	Record<'textFieldContainer' | 'textField', TextInputProps['style']>
>({
	textFieldContainer: {
		borderWidth: 1,
		borderColor: 'green',
		borderRadius: spacing.radius,
		padding: spacing[2],
		margin: spacing[2],
		justifyContent: 'center',
		height: spacing.sm,
		...shadow,
	},
	textField: { flex: 1, justifyContent: 'flex-end', textAlign: 'center' },
});

const styles = {
	text: { ...textStyles },
	view: { ...viewStyles },
	input: { ...inputStyles },
};

export { styles };
