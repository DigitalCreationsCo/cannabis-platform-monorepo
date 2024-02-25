import { View, type ViewProps } from './Themed';

const FlexBox = (props: ViewProps) => (
	<View
		style={{
			flexDirection: 'column',
			flexGrow: 1,
			justifyContent: 'center',
		}}
	>
		{props.children}
	</View>
);

export default FlexBox;
