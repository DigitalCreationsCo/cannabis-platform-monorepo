import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import { TransitionPresets } from '@react-navigation/stack';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'driverLogin',
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	return (
		<SafeAreaProvider>
			<ReduxProvider store={store}>
				<PersistGate persistor={persistor}>
					{/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
					{!loaded && <SplashScreen />}
					{loaded && <AuthNavigator />}
				</PersistGate>
			</ReduxProvider>
		</SafeAreaProvider>
	);
}

const AuthNavigator = () => {
	const { isSignedIn } = useSelector(selectDriverState);
	const colorScheme = useColorScheme();

	return (
		<>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen
						name="driverLogin"
						// options={{
						// 	...TransitionPresets.FadeFromBottomAndroid,
						// }}
					/>
					{/* <Stack.Screen name="driverSignUp" /> */}

					{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
				</Stack>
			</ThemeProvider>
		</>
	);
};
