import TextContent from '@cd/core-lib/src/constants/text.constant';
import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import {
	selectSocketState,
	socketActions,
} from '@cd/core-lib/src/reducer/socket.reducer';
import {
	useAppDispatch,
	useAppSelector,
} from '@cd/core-lib/src/types/redux.types';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';

const DriverMapScreen = () => {
	const { height, width } = spacing;

	const router = useRouter();

	const dispatch = useAppDispatch();

	const { isOnline } = useAppSelector(selectDriverState).driver.driverSession;
	const {
		connectionOpenInit,
		connectionCloseInit,
		isConnected,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useAppSelector(selectSocketState);

	// trigger status update
	const [updateOnlineStatus, setUpdateOnlineStatus] = useState(false);

	// use cases for connecting clients
	// isOnline is 0
	// 1. when the user clicks go Online, connect the socket.
	// 2. when the driver is online, and the socket is not connected, reconnect the socket
	// 3. when the driver is online, and the socket is connected, do nothing
	// 4. when the driver is offline, and the socket is connected, disconnect the socket
	// 5. when the driver is offline, and the socket is not connected, do nothing

	// handling socket connection and app state
	// updateOnline -> dispatch openConnection
	// middleware -> openConnection ->

	useAfterMount(() => {
		updateOnlineStatus
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
		// }
	}, [updateOnlineStatus]);

	useAfterMount(() => {
		isOnline === false && setUpdateOnlineStatus(false);
	}, [isOnline]);

	useAfterMount(() => {
		connectionCloseInit === false && setUpdateOnlineStatus(false);
	}, [connectionCloseInit === false]);

	useEffect(() => {
		if (newOrder) {
			router.replace('/new-order');
		}
	}, [newOrder]);

	const _displayTestVars = useMemo(
		() => (
			<View>
				<Text>
					{JSON.stringify(
						{
							connectionOpenInit,
							connectionCloseInit,
							isConnected,
							errorMessage: errorMessage,
							message,
							isOnline,
							updateOnlineStatus,
						},
						null,
						2,
					)}
					{'\n'}
					{isConnected
						? 'connected to websocket server'
						: 'websocket not connected.'}
				</Text>
			</View>
		),
		[
			connectionOpenInit,
			connectionCloseInit,
			isConnected,
			errorMessage,
			message,
			isOnline,
			updateOnlineStatus,
		],
	);

	return (
		<View>
			<Greeting />
			<View style={{ height: height / 3, width }}>
				<MapView
					showsUserLocation
					followsUserLocation
					showsMyLocationButton={true}
					style={{ height: '100%', width: '100%' }}
					// provider={PROVIDER_GOOGLE}
				/>
			</View>

			{/* {_displayTestVars} */}

			<Center>
				<Text style={{ color: 'red' }}>{errorMessage || ''}</Text>
			</Center>
			<Button
				disabled={connectionOpenInit}
				onPress={() => setUpdateOnlineStatus(!updateOnlineStatus)}
			>
				{isOnline
					? TextContent.dispatch.status.STOP_DELIVERING
					: TextContent.dispatch.status.START_DELIVERING}
			</Button>
		</View>
	);
};

export default Screen(DriverMapScreen);
