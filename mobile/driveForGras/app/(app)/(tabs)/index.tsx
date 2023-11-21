import { Greeting, Screen, Text, View } from '@components';
import { styles } from '@styles';
import { EditScreenInfo } from '@views';

function DriverMapScreen() {
	return (
		<View style={styles.view.container}>
			<Greeting />
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
