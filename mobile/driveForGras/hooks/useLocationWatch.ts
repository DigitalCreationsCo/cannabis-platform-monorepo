import { useAppDispatch } from '@cd/core-lib/src/types';
import * as Location from 'expo-location';
import { useEffect } from 'react';

// driver location updates will store data in several places,
// under several conditions:

// 'position' variable tracks the clients current location,
// and will update 'currentLocation' in the client state

// 'databasePosition' variable tracks the client current location,
// with a larger distance interval, and will trigger an action to
// save the position in the driver session database document

// 'location share' event is a socket event, which will be called by socketMiddleware,
// when a dispatch event to update

export const useLocationWatch = async () => {
	const dispatch = useAppDispatch();

	useEffect(async () => {
		console.log('uselocation useffect hook run');
		// put location coords in the state
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.info('Location permission was denied.');
			return;
		}

		// update local client location with high frequency
		const localPositionUpdate = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 10000,
				distanceInterval: 50,
				mayShowUserSettingsDialog: false,
			},
			(location) => {
				if (location.coords) {
					const { longitude, latitude } = location.coords;
					console.log('position update: ', longitude, latitude);
					// dispatch(
					// 	userActions.localCurrentLocationUpdate({
					// 		geoLocation: {
					// 			type: 'Point',
					// 			coordinates: [longitude, latitude],
					// 		},
					// 	}),
					// );
				}
			},
		);

		// update location through socket event,
		// update location in db driver session with medium frequency
		const remotePositionUpdate = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 10000,
				distanceInterval: 500,
				mayShowUserSettingsDialog: false,
			},
			(location) => {
				console.log('remote position update');
				if (location.coords) {
					const { longitude, latitude } = location.coords;
					console.log('position update: ', longitude, latitude);
					// dispatch(
					// 	userActions.currentLocationUpdate({
					// 		geoLocation: {
					// 			type: 'Point',
					// 			coordinates: [longitude, latitude],
					// 		},
					// 	}),
					// );

					// // will update the driver session regardless of driver's online status
					// dispatch(
					// 	userActions.updateDBSessionLocation({
					// 		type: 'Point',
					// 		coordinates: [longitude, latitude],
					// 	}),
					// );
				}
			},
		);

		// deferred location update for pendingOrder document with low frequency
		// const driverPathPositionUpdate = await Location.watchPositionAsync()
	}, []);
};
