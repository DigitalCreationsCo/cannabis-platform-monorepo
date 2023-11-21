import TextContent from '@cd/core-lib/src/constants/text.constant';
import React from 'react';
import { Screen, View, Text } from '@components';
import Icons from '../icons';
import { styles } from '../styles';

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

// export default Screen(DriverLoginScreen);
export default Screen(DriverLoginScreen);
