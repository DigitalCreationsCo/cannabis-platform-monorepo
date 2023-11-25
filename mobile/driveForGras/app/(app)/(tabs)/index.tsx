import TextContent from '@cd/core-lib/src/constants/text.constant';
import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import {
	selectSocketState,
	socketActions,
} from '@cd/core-lib/src/reducer/socket.reducer';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';
import { useAppDispatch } from '../../../redux/store';

const DriverMapScreen = () => {
	const { height, width } = spacing;

	const router = useRouter();

	const dispatch = useAppDispatch();

	const { isOnline } = useSelector(selectDriverState).driver.driverSession;
	const {
		connectionOpenInit,
		connectionCloseInit,
		isConnected,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useSelector(selectSocketState);

	// trigger status update
	const [updateOnlineStatus, setUpdateOnlineStatus] = useState(false);

	// use cases for connecting clients
	// isOnline is 0
	// 1. when the user clicks go Online, connect the socket.
	// 2. when the driver is online, and the socket is not connected, reconnect the socket
	// 3. when the driver is online, and the socket is connected, do nothing
	// 4. when the driver is offline, and the socket is connected, disconnect the socket
	// 5. when the driver is offline, and the socket is not connected, do nothing

	useAfterMount(() => {
		// if (isOnline) {
		// 	// if driver is online, and the socket is not connected, reconnect the socket
		// 	// handle this in middleware
		// } else {
		updateOnlineStatus
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
		// }
	}, [updateOnlineStatus]);

	useAfterMount(() => {
		isOnline === false && setUpdateOnlineStatus(false);
	}, [isOnline]);

	useEffect(() => {
		if (newOrder) {
			router.replace('/new-order');
		}
	}, [newOrder]);

	const _displayTestVars = useMemo(
		() =>
			JSON.stringify(
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

			<View>
				<Text>{_displayTestVars}</Text>
				<Text>
					{isConnected
						? 'connected to websocket server'
						: 'websocket not connected.'}
				</Text>
			</View>
			<Center>
				<Text style={{ color: 'red' }}>
					{(errorMessage && 'An Error Occured') || ''}
				</Text>
			</Center>
			<Button
				// disabled={connectionOpenInit}
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
