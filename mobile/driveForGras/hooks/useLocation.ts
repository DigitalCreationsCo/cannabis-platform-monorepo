import { 
	selectDriverState,
	driverActions } from '@gras/core/src/reducer/driver.reducer';
import {useSelector } from 'react-redux'
import { useRealm } from '@realm/react';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// driver location updates will store data in several places,
// under several conditions:

// 'position' variable tracks the clients current location,
// and will update 'currentLocation' in the client state

// 'databasePosition' variable tracks the client current location,
// with a larger distance interval, and will trigger an action to
// save the position in the driver session database document

// 'location share' event is a socket event, which will be called by socketMiddleware,
// when a dispatch event to update

// ADD REALM HOOKS AND FUNCTIONS HERE

export const useLocation = async () => {
	const { isOnline } = useSelector(selectDriverState).driver.driverSession;

	// const realm = useRealm();
	// const [pauseSync, togglePauseSync] = useState(false);

	// useEffect(() => {
	// 	if (!isOnline && realm.syncSession?.state === 'active') {
	// 		realm.syncSession.pause();
	// 		// togglePauseSync(true);
	// 	} else if (isOnline && realm.syncSession?.state === 'inactive') {
	// 		realm.syncSession.resume();
	// 		// togglePauseSync(false);
	// 	}
	// }, [isOnline]);

	const dispatch = useDispatch();

	useEffect(() => {
		/**
		 request location permissions and live update app state and mongo realm db
		 * */
		const startWatchPositionAsync = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.info('Location permission was denied.');
				return;
			}

			// update coordinates with high frequency
			// used for local client location
			await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.BestForNavigation,
					timeInterval: 1000,
					distanceInterval: 50,
					mayShowUserSettingsDialog: false,
				},
				(location) => {
					if (location.coords) {
						const { longitude, latitude } = location.coords;
						dispatch(driverActions.updateCoordinates({ longitude, latitude }));
					}
				},
			);

			// update coordinates with medium frequency
			// used for driver session location in mongo realm db
			// used for socket event to update driver location
			await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 7000,
					distanceInterval: 100,
					mayShowUserSettingsDialog: false,
				},
				(location) => {
					if (location.coords) {
						const { longitude, latitude } = location.coords;
						if (isOnline)
							dispatch(
								driverActions.appendCoordinatesToRoute({ longitude, latitude }),
							);
						// update monogo realm device sync
						// update socket event
					}
				},
			);
		};
		startWatchPositionAsync();
	}, []);
};
