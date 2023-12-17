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

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="driver-history" />
			<Tabs.Screen
				name="driver-settings"
				// options={{
				// 	title: 'Settings',
				// 	tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				// }}
			/>
		</Tabs>
	);
}
