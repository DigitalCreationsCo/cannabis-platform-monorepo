import { Text, View, Screen } from '@components';
import { styles } from '@styles';

function DriverHistoryScreen() {
	return (
		<View>
			<Text style={styles.text.h}>Driver History</Text>
			<Text>Your recent deliveries</Text>
		</View>
	);
}

export default Screen(DriverHistoryScreen);
