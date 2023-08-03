import { selectDriverState } from '@cd/core-lib/src/reduxDir/features/driver.reducer';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
	CompleteDeliveryScreen,
	DeliveryOrderScreen,
	LoginScreen,
	NewOrderScreen,
	SignUpScreen,
} from '../screens';
import { DriveScreens } from './paths';
import TabNavigator from './TabNavigator';

const AuthNavigator = () => {
	const { isSignedIn } = useSelector(selectDriverState);

	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName={
				// "Test"
				DriveScreens.HOME
			}
			screenOptions={{
				headerShown: false,
			}}
		>
			{isSignedIn ? (
				<>
					<Stack.Screen
						name={DriveScreens.HOME}
						component={TabNavigator}
						options={{
							...TransitionPresets.FadeFromBottomAndroid,
						}}
					/>
					<Stack.Screen
						name={DriveScreens.NEW_ORDER_SCREEN}
						component={NewOrderScreen}
						options={{
							...TransitionPresets.ModalSlideFromBottomIOS,
						}}
					/>
					<Stack.Screen
						name={DriveScreens.DELIVERY_ORDER_SCREEN}
						component={DeliveryOrderScreen}
					/>
					<Stack.Screen
						name={DriveScreens.COMPLETE_DELIVERY_SCREEN}
						component={CompleteDeliveryScreen}
						options={{
							...TransitionPresets.ModalSlideFromBottomIOS,
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="LoginScreen"
						component={LoginScreen}
						options={{
							...TransitionPresets.FadeFromBottomAndroid,
						}}
					/>
					<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
				</>
			)}
		</Stack.Navigator>
	);
};

export default AuthNavigator;
