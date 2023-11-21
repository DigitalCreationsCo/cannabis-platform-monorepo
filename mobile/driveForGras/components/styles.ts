import { type TextStyle, type ViewStyle } from 'react-native';

const textStyles: Record<string, TextStyle> = Object.freeze({
	h1: { fontSize: 30 },
});

const viewStyles: Record<string, ViewStyle> = Object.freeze({
	container: { flex: 1 },
});

const styles = {
	text: { ...textStyles },
	view: { ...viewStyles },
};

export { styles };
