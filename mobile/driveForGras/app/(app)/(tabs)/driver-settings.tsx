import TextContent from '@cd/core-lib/src/constants/text.constant';
import { driverActions, selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import {useSelector } from 'react-redux'

import { Button, Center, Container, FlexBox, Screen, Text } from '@components';
import { styles } from '@styles';
import { useAppDispatch } from '@cd/core-lib/src/types';

function DriverSettings() {
	const dispatch = useAppDispatch();
	const { driver } = useSelector(selectDriverState);
	const renderProfile = `user id: ${driver.user.id}
phone: ${driver.user.phone}
email: ${driver.user.email}
username: ${driver.user.username}`;
	return (
		<Container>
			<Text style={styles.text.h}>Driver Settings</Text>
			<FlexBox>
				<Center>
					<Text>{renderProfile}</Text>
				</Center>
			</FlexBox>
			<Button onPress={() => dispatch(driverActions.signOutUserAsync())}>
				{TextContent.account.SIGNOUT}
			</Button>
		</Container>
	);
}

export default Screen(DriverSettings);
