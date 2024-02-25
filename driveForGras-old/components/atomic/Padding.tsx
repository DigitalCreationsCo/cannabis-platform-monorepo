import { styles } from '../../styles';
import { View, type ViewProps } from '../Themed';

function Padding(props: ViewProps) {
	return (
		<View style={styles.view.padding} {...props}>
			{props.children}
		</View>
	);
}

export default Padding;
