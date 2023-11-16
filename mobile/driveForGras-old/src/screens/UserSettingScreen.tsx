import {
	driverActions,
	selectDriverState,
} from '@cd/core-lib';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, FlexBox, H3, Paragraph, Screen } from '../components';
import { useAppDispatch } from '../redux/store';

function UserSettingScreen() {
	const dispatch = useAppDispatch();

	const { driver } = useSelector(selectDriverState);

	function signOut() {
		dispatch(driverActions.signOutUserAsync());
	}

	return (
		<ScrollView>
			<FlexBox className="h-full">
				<H3>{driver.user.firstName || 'Your Account'}</H3>

				{/* <Text>{`driverId: ${user.id}`}</Text> */}
				{/* <Text>{`${user.firstName} ${user.lastName}`}</Text> */}
			</FlexBox>

			<Button onPress={signOut}>
				<Paragraph>logout</Paragraph>
			</Button>
		</ScrollView>
	);
}

export default Screen(UserSettingScreen);
