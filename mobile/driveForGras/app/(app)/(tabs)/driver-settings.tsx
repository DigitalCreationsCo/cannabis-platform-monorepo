import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen, Text, View } from '@components';
import { EditScreenInfo } from '@views';
import { styles } from '@styles';

function DriverSettings() {
	return (
		<View>
			<Text style={styles.text.h}>Driver Settings</Text>
		</View>
	);
}

export default Screen(DriverSettings);
