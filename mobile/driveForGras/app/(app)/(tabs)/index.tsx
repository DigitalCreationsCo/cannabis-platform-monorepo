import MapView from 'react-native-maps';
import { Greeting, Screen, Text, View } from '@components';
import { styles } from '@styles';

function DriverMapScreen() {
	return (
		<View style={styles.view.container}>
			<Greeting />

			<View>
				<MapView />
			</View>
		</View>
	);
}

export default Screen(DriverMapScreen);

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 	},
// 	separator: {
// 		marginVertical: 30,
// 		height: 1,
// 		width: '80%',
// 	},
// });
