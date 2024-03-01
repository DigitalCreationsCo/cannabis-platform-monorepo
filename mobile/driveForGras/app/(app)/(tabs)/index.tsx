import TextContent from '@cd/core-lib/src/constants/text.constant';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import {
	socketActions,
	selectSocketState,
} from '@cd/core-lib/src/reducer/socket.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';
import { useLocation } from '../../../hooks';

const useAfterMount = (func: () => void, deps: any[]) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

const DriverMapScreen = () => {
	useLocation();

	const [updateOnlineStatus, setUpdateOnlineStatus] = useState(false);

	const { isOnline } = useSelector(selectDriverState).driver.driverSession;
	const {
		connectionOpenInit,
		connectionCloseInit,
		isConnectedToDispatch,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useSelector(selectSocketState);

	const dispatch = useDispatch();

	useAfterMount(() => {
		updateOnlineStatus
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
		// }
	}, [updateOnlineStatus]);

	const router = useRouter();

	useEffect(() => {
		if (newOrder) {
			router.replace('/new-order');
		}
	}, [newOrder]);

	const displayStatusPrompt = isOnline
		? ''
		: 'Tap Go Online to start delivering orders.';

	const _displayTestVars = useMemo(
		() => (
			<View>
				<Text>
					{JSON.stringify(
						{
							connectionOpenInit,
							connectionCloseInit,
							isConnectedToDispatch,
							errorMessage: errorMessage,
							message,
							isOnline,
							updateOnlineStatus,
						},
						null,
						2,
					)}
					{'\n'}
					{isConnectedToDispatch
						? 'connected to websocket server'
						: 'websocket not connected.'}
				</Text>
			</View>
		),
		[
			connectionOpenInit,
			connectionCloseInit,
			isConnectedToDispatch,
			errorMessage,
			message,
			isOnline,
			updateOnlineStatus,
		],
	);

	const { height, width } = spacing;
	return (
		<View>
			<Greeting />
			<View style={{ height: '50%', width }}>
				<MapView
					showsUserLocation
					followsUserLocation
					showsMyLocationButton
					style={{ height: '100%', width: '100%' }}
					// provider={PROVIDER_GOOGLE}
				/>
			</View>

			{/* {_displayTestVars} */}

			<Center>
				{/* <Text>env: {process.env.NEXT_PUBLIC_MAPS_API_KEY_DRIVE_PWA}</Text> */}
				<Text style={{ color: 'red' }}>{errorMessage || ''}</Text>
				<Text>{displayStatusPrompt}</Text>
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
