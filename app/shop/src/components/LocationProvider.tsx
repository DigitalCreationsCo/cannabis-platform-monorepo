import {
	getGeoAddressFromCoordinates,
	locationActions,
	selectSelectedLocationState,
	selectShopState,
	useAppDispatch,
	useAppSelector,
} from '@cd/core-lib';
import { type AddressPayload } from '@cd/data-access';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

// ADD SWR FOR DATA FETCH
const LocationProvider = () => {
	const router = useRouter();
	const [enteredSite, setEnteredSite] = useState(false);
	const [cookies] = useCookies(['yesOver21']);

	useEffect(() => {
		function checkCheckAgeCookie(): boolean {
			return cookies.yesOver21 || false;
		}
		checkCheckAgeCookie() ? setEnteredSite(true) : setEnteredSite(false);
	}, [cookies.yesOver21, router]);

	const dispatch = useAppDispatch();

	const selectedLocation = useSelector(selectSelectedLocationState);
	const shopState = useAppSelector(selectShopState);
	const coordinates = selectedLocation?.address?.coordinates;

	// useEffect(() => {
	// 	if (
	// 		typeof window !== 'undefined' &&
	// 		enteredSite &&
	// 		navigator?.geolocation !== undefined
	// 	) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				if (
	// 					coordinates.latitude !== position.coords.latitude ||
	// 					coordinates.longitude !== position.coords.longitude
	// 				)
	// 					console.info('geolocating your position...', position);
	// 				dispatch(
	// 					locationActions.setCurrentCoordinates({
	// 						latitude: position.coords.latitude,
	// 						longitude: position.coords.longitude,
	// 					}),
	// 				);
	// 				getGeoAddressFromCoordinates({
	// 					latitude: position.coords.latitude,
	// 					longitude: position.coords.longitude,
	// 				})
	// 					.then((address) =>
	// 						dispatch(
	// 							locationActions.setCurrentAddress(address as AddressPayload),
	// 						),
	// 					)
	// 					.catch((error) =>
	// 						console.info(
	// 							'Location Provider getGeoAddressByCoordifdnates error: ',
	// 							error,
	// 						),
	// 					);
	// 			},
	// 			(api) =>
	// 				console.info('Geolocation is not supported by this browser. ', api),
	// 		);
	// 	}
	// }, [enteredSite]);

	// useEffect(() => {
	// 	if (
	// 		typeof window !== 'undefined' &&
	// 		enteredSite &&
	// 		navigator?.geolocation !== undefined
	// 	) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				if (
	// 					coordinates.latitude !== position.coords.latitude ||
	// 					coordinates.longitude !== position.coords.longitude
	// 				)
	// 					console.info('geolocating your position...', position);
	// 				dispatch(
	// 					locationActions.setCurrentCoordinates({
	// 						latitude: position.coords.latitude,
	// 						longitude: position.coords.longitude,
	// 					}),
	// 				);
	// 				getGeoAddressFromCoordinates({
	// 					latitude: position.coords.latitude,
	// 					longitude: position.coords.longitude,
	// 				})
	// 					.then((address) =>
	// 						dispatch(
	// 							locationActions.setCurrentAddress(address as AddressPayload),
	// 						),
	// 					)
	// 					.catch((error) =>
	// 						console.info(
	// 							'Location Provider getGeoAddressByCoordifdnates error: ',
	// 							error,
	// 						),
	// 					);
	// 			},
	// 			(api) =>
	// 				console.info('Geolocation is not supported by this browser. ', api),
	// 		);
	// 	}
	// }, [enteredSite]);

	return <></>;
};

export default LocationProvider;
