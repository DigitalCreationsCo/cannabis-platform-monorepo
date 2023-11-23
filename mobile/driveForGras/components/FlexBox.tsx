import { View, type ViewProps } from './Themed';

const FlexBox = (props: ViewProps) => (
	<View style={{ flexDirection: 'column' }}>{props.children}</View>
);

export default FlexBox;
