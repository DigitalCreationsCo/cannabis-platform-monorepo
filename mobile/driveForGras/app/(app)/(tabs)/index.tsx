import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import TextContent from '@cd/core-lib/src/constants/text.constant';
import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import { socketActions, selectSocketState } from '@cd/core-lib/src/reducer/socket.reducer';
import {useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';
import { useLocation } from '../../../hooks';

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
