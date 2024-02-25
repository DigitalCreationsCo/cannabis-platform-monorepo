import { styles } from '../../styles';
import { View, type ViewProps } from '../Themed';

function Center(props: ViewProps) {
	return (
		<View style={styles.view.center} {...props}>
			{props.children}
		</View>
	);
}

export default Center;
