import TextContent from '@cd/core-lib/src/constants/text.constant';
import useAfterMount from '@cd/core-lib/src/hooks/useAfterMount';
import {
	driverActions,
	selectDriverState,
} from '@cd/core-lib/src/reducer/driver.reducer';
import {
	selectSocketState,
	socketActions,
} from '@cd/core-lib/src/reducer/socket.reducer';
import { userActions } from '@cd/core-lib/src/reducer/user.reducer';
import { type AnyAction } from '@reduxjs/toolkit';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';
import { styles } from '@styles';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const DriverMapScreen = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { height, width } = spacing;

	const {
		connectionOpenInit,
		connectionCloseInit,
		isConnected,
		errorMessage,
		message,
		incomingOrder: { newOrder },
	} = useSelector(selectSocketState);
	const { isOnline } = useSelector(selectDriverState).driver.driverSession;

	// trigger status update
	const [updateOnlineStatus, setUpdateOnlineStatus] = useState(false);

	useEffect(() => {
		dispatch(
			driverActions.updateOnlineStatus(
				updateOnlineStatus,
			) as unknown as AnyAction,
		);
	}, [updateOnlineStatus]);

	useAfterMount(() => {
		isOnline
			? dispatch(socketActions.openConnection())
			: dispatch(socketActions.closingConnection());
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
