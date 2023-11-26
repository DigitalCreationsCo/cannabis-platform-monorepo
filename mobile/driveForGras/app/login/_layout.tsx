import { Stack } from 'expo-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
	initialRouteName: '/driver-signin',
};

export default function LoginStack() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="driver-signin" />
			<Stack.Screen name="driver-signin-handle-otp" />
		</Stack>
	);
}
