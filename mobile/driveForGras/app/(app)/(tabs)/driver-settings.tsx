import { TextContent } from '@cd/core-lib/src/constants';
import { driverActions } from '@cd/core-lib/src/reducer/driver.reducer';
import { useAppDispatch } from '@cd/core-lib/src/types';
import { Button, Screen, Text, View } from '@components';
import { styles } from '@styles';

function DriverSettings() {
	const dispatch = useAppDispatch();
	return (
		<View>
			<Text style={styles.text.h}>Driver Settings</Text>
			<Button onPress={() => dispatch(driverActions.signOutUserAsync())}>
				{TextContent.account.SIGNOUT}
			</Button>
		</View>
	);
}

export default Screen(DriverSettings);
