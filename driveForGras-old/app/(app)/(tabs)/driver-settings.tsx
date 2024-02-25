import {
	useAppDispatch,
	useAppSelector,
	TextContent,
	driverActions,
} from '@cd/core-lib';
import { Button, Center, Container, FlexBox, Screen, Text } from '@components';
import { styles } from '@styles';

function DriverSettings() {
	const dispatch = useAppDispatch();
	const { driver } = useAppSelector((state) => state.driver);
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
