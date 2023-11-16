import { Login } from '@carbon/icons-react';
import TextContent from '@cd/core-lib/src/constants/text.constant';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import React from 'react';
// import Icons from '@cd/native-ui/src/icons';
// import {
// 	createStackNavigator,
// 	TransitionPresets,
// } from '@react-navigation/stack';
import { View, Text } from 'react-native';
// import { FlexBox, H1, H5, Screen } from '../components';
import Screen from '../components/atomic/Screen';
// import { LoginView, PasscodeView } from '../views';
import { NODE_ENV, NEXT_PUBLIC_SHOP_APP_URL } from '@env';
import { useAppSelector } from '../redux/store';
import { useSelector } from 'react-redux';

const DriverLoginScreen = () => {
	const driver = useSelector(selectDriverState);
	// const LoginStack = createStackNavigator();

	return (
		<>
			<Text>env: {NODE_ENV}</Text>
			<Text>Shop Url: {NEXT_PUBLIC_SHOP_APP_URL}</Text>
			<Text>LoginScreen</Text>
			<Text>Driver username: {driver.driver.user.username}</Text>
			<Text>name: {driver.driver.user.firstName}</Text>
		</>
	);

	{
		/* <View>
				<FlexBox className="flex-row items-center">
					<H1 color="light">{TextContent.info.COMPANY_NAME}</H1>
					<Icons.Flower color="white" />
				</FlexBox>
				<H5 color="light">{TextContent.technical.DRIVER_APP} DRIVER APP</H5>
			</View>

			<LoginStack.Navigator
				initialRouteName="Login"
				screenOptions={{ headerShown: false }}
			>
				<LoginStack.Screen
					name="Login"
					component={LoginView}
					options={{
						...TransitionPresets.FadeFromBottomAndroid,
					}}
				/>

				<LoginStack.Screen
					name="Passcode"
					component={PasscodeView}
					options={{
						...TransitionPresets.ModalSlideFromBottomIOS,
					}}
				/>
			</LoginStack.Navigator> */
	}
};

export default Screen(DriverLoginScreen);
