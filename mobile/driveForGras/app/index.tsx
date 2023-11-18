import TextContent from '@cd/core-lib/src/constants/text.constant';
import { Screen, styles, View, Text } from '@cd/native-ui';
import Icons from '@cd/native-ui/src/icons';
import React from 'react';

const DriverLoginScreen = () => {
	return (
		<View>
			<Text style={styles.text.h1}>{TextContent.info.COMPANY_NAME}</Text>
			<Icons.Flower />
		</View>
	);

	/* <
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
};

export default Screen(DriverLoginScreen);
