import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import {useSelector } from 'react-redux'
import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '/(tabs)',
};

export default function AppStack() {
	const colorScheme = useColorScheme();

	const { isSignedIn } = useSelector(selectDriverState);
	if (!isSignedIn) return <Redirect href="/login" />;
	return (
		<Stack
			screenOptions={{
				animation: 'simple_push',
				animationTypeForReplace: 'push',
				headerShown: false,
				// headerTintColor: Colors[colorScheme ?? 'light'].tint,
				// navigationBarColor: Colors[colorScheme ?? 'light'].background,
				// statusBarColor: Colors[colorScheme ?? 'light'].background,
			}}
		>
			<Stack.Screen
				name="(tabs)"
				options={
					{
						// 	title: 'Map',
						// 	headerRight: () => (
						// 		<Link href="/modal" asChild>
						// 			<Pressable>
						// 				{({ pressed }) => (
						// 					<FontAwesome
						// 						name="info-circle"
						// 						size={25}
						// 						color={Colors[colorScheme ?? 'light'].text}
						// 						style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
						// 					/>
						// 				)}
						// 			</Pressable>
						// 		</Link>
						// 	),
					}
				}
			/>
			<Stack.Screen
				name="new-order"
				options={{
					title: 'New Order',
				}}
			/>
			<Stack.Screen
				name="deliver-order"
				options={{
					title: 'Deliver Order',
				}}
			/>
			<Stack.Screen
				name="complete-order"
				options={{
					title: 'Complete Order',
				}}
			/>
			<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
		</Stack>
	);
}
