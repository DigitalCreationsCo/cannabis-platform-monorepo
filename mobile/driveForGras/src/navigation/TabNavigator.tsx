import Icons from '@cd/native-ui/src/icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HistoryScreen, MapScreen, UserSettingScreen } from '../screens';
import { TabScreens } from './paths';

const TabNavigator = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName={TabScreens.MAP_SCREEN}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					display: 'flex',
					borderTopWidth: 0,
					elevation: 0,
					backgroundColor: 'transparent',
					marginBottom: 5,
				},
			}}
		>
			<Tab.Screen
				name={TabScreens.SETTING_SCREEN}
				component={UserSettingScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.User
							size={focused ? 24 : 20}
							color={focused ? 'green' : 'green'}
						/>
					),
					tabBarShowLabel: true,
					tabBarLabel: 'Account',
					tabBarActiveTintColor: 'green',
				}}
			/>
			<Tab.Screen
				name={TabScreens.MAP_SCREEN}
				component={MapScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.Flower
							size={focused ? 24 : 20}
							color={focused ? 'green' : 'green'}
						/>
					),
					tabBarShowLabel: true,
					tabBarLabel: 'Delivery',
					tabBarActiveTintColor: 'green',
				}}
			/>
			<Tab.Screen
				name={TabScreens.HISTORY_SCREEN}
				component={HistoryScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.Search2
							size={focused ? 24 : 20}
							color={focused ? 'green' : 'green'}
						/>
					),
					tabBarShowLabel: true,
					tabBarLabel: 'Orders',
					tabBarActiveTintColor: 'green',
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
