import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'index',
};

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}
		>
			<Tabs.Screen
				name="driver-history"
				options={{
					title: 'history',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="align-justify" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: 'drive',
					tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="driver-settings"
				options={{
					title: 'settings',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</Tabs>
	);
}
