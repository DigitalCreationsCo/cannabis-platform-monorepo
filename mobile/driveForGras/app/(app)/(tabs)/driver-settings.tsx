import TextContent from '@gras/core/src/constants/text.constant';
import {
	driverActions,
	selectDriverState,
} from '@gras/core/src/reducer/driver.reducer';
import { type Action } from '@reduxjs/toolkit';
import { Link, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Center,
	Container,
	FlexBox,
	Padding,
	Screen,
	Text,
	View,
} from '@components';
import { styles } from '@styles';

function DriverSettings() {
	const dispatch = useDispatch();
	const { driver } = useSelector(selectDriverState);
	const renderProfile = `user id: ${driver.user.id}
phone: ${driver.user.phone}
email: ${driver.user.email}
username: ${driver.user.username}`;
	return (
		<Container>
			<Padding>
				<Text style={styles.text.h}>Driver Settings</Text>

				<Text>{renderProfile}</Text>
			</Padding>

			<View style={{ flexGrow: 1, flexDirection: 'column' }}>
				{/* <Button
					primary
					style={{ width: 140 }}
					onPress={() => router.push('preferences')}
				>
					Preferences
				</Button> */}
				<Button
					primary
					style={{ width: 140 }}
					onPress={() => router.push('billing')}
				>
					Billing
				</Button>
			</View>

			<Button
				onPress={() =>
					dispatch(driverActions.signOutUserAsync() as unknown as Action)
				}
			>
				{TextContent.account.SIGNOUT}
			</Button>
		</Container>
	);
}

export default Screen(DriverSettings);
