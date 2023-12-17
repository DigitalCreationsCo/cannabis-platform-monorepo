import { FontAwesome } from '@expo/vector-icons';
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';
import { AppProvider, UserProvider, RealmProvider } from '@realm/react';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import * as React from 'react';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appId, baseUrl } from '../atlasConfig.json';
import { store, persistor } from '../redux/store';
import { DriverSession } from '../schema/DriverSession';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});
	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	const colorScheme = useColorScheme();

	return (
		<ReduxProvider store={store}>
			<PersistGate persistor={persistor}>
				<AppProvider id={appId} baseUrl={baseUrl}>
					<UserProvider fallback={<Slot />}>
						<RealmProvider
							schema={[DriverSession]}
							sync={{
								flexible: true,
								onError: (_session, error) => {
									// Show sync errors in the console
									console.error(error);
								},
							}}
						>
							<SafeAreaProvider>
								<ThemeProvider
									value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
								>
									{/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
									{!loaded && <SplashScreen />}
									{loaded && <Slot />}
								</ThemeProvider>
							</SafeAreaProvider>
						</RealmProvider>
					</UserProvider>
				</AppProvider>
			</PersistGate>
		</ReduxProvider>
	);
}
