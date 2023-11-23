import { type TextStyle, type ViewStyle } from 'react-native';
import { fontSize, shadow, spacing } from './constants';

const textStyles = Object.freeze<Record<string, TextStyle>>({
	h: { fontSize: fontSize.lg },
	p: { fontSize: fontSize.sm },
});

const viewStyles = Object.freeze<Record<string, ViewStyle>>({
	container: {
		flex: 1,
	},
	row: { flexDirection: 'row' },
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonPrimary: {
		borderRadius: spacing.radius,
		alignItems: 'center',
		justifyContent: 'center',
		height: spacing.sm,
		margin: spacing[2],
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

const inputStyles = Object.freeze<Record<string, ViewStyle>>({
	textFieldContainer: {
		borderWidth: 1,
		borderColor: 'green',
		borderRadius: spacing.radius,
		padding: spacing[1],
		margin: spacing[2],
		justifyContent: 'center',
		...shadow,
	},
	textField: { flex: 1, justifyContent: 'flex-end' },
});

const styles = {
	text: { ...textStyles },
	view: { ...viewStyles },
	input: { ...inputStyles },
};

export { styles };
