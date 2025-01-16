import TextContent from '@gras/core/src/constants/text.constant';
import { updateOnlineStatus } from '@gras/core/src/reducer/action/updateOnlineStatus';
import { selectDriverState } from '@gras/core/src/reducer/driver.reducer';
import {
	socketActions,
	selectSocketState,
} from '@gras/core/src/reducer/socket.reducer';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Center, Greeting, Screen, Text, View } from '@components';
import { spacing } from '@constants';
import { useLocation } from '../../../hooks';
import newOrder from '../new-order';

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
			? (() => {
					setConnectMessage('Connecting...');
					dispatch(socketActions.openConnection());
			  })()
			: (() => {
					setConnectMessage('Closing connection');
					dispatch(socketActions.closingConnection());
			  })();
	}, [updateOnlineStatus]);

	const router = useRouter();

	useEffect(() => {
		if (newOrder) {
			router.replace('/new-order');
		}
	}, [newOrder]);

	const displayStatusPrompt = isOnline
		? ''
		: 'Tap Go Online to start delivering';

	const [connectMessage, setConnectMessage] = useState(
		TextContent.dispatch.status.STOP_DELIVERING,
	);

	// flash connected message when connected to dispatch
	let switchBool = true;
	let interval: NodeJS.Timeout;
	useEffect(() => {
		if (isOnline === true) {
			interval = setInterval(() => {
				switch (switchBool) {
					case true:
						setConnectMessage('Waiting for orders..');
						break;
					case false:
						setConnectMessage(TextContent.dispatch.status.STOP_DELIVERING);
						break;
					default:
						setConnectMessage(TextContent.dispatch.status.STOP_DELIVERING);
				}
				switchBool = !switchBool;
			}, 3000);
		} else {
			clearInterval(interval);
			setConnectMessage(TextContent.dispatch.status.STOP_DELIVERING);
		}

		if (connectionCloseInit) {
			clearInterval(interval);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isOnline]);

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
				<Text style={{ color: 'red' }}>{errorMessage || ''}</Text>
				<Text>{displayStatusPrompt}</Text>
			</Center>
			<Button
				disabled={connectionOpenInit}
				onPress={() => setUpdateOnlineStatus(!updateOnlineStatus)}
			>
				{isOnline
					? connectMessage
					: TextContent.dispatch.status.START_DELIVERING}
			</Button>
		</View>
	);
};

export default Screen(DriverMapScreen);
