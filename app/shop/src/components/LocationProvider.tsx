import {
	locationActions,
	selectSelectedLocationState,
	selectShopState,
	shopActions,
} from '@cd/core-lib';
import { getGeoAddressFromCoordinates } from '@cd/core-lib/src/utils/geo';
import { type AddressPayload } from '@cd/data-access';
import { type AnyAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

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

	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			enteredSite &&
			navigator?.geolocation !== undefined
		) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					if (
						coordinates.latitude !== position.coords.latitude ||
						coordinates.longitude !== position.coords.longitude
					)
						console.info('geolocating your position...', position);
					dispatch(
						locationActions.setCurrentCoordinates({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						}),
					);
					getGeoAddressFromCoordinates({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					})
						.then((address) =>
							dispatch(
								locationActions.setCurrentAddress(address as AddressPayload),
							),
						)
						.catch((error) =>
							console.info(
								'Location Provider getGeoAddressByCoordifdnates error: ',
								error,
							),
						);
				},
				() => console.info('Geolocation is not supported by this browser.'),
			);
		}
	}, [coordinates.latitude, coordinates.longitude, dispatch, enteredSite]);

	useEffect(() => {
		if (
			coordinates.latitude &&
			coordinates.longitude &&
			enteredSite &&
			!shopState.isLoading &&
			!shopState.isError
		) {
			const getDispensaries = async () => {
				dispatch(shopActions.getDispensariesLocal() as unknown as AnyAction);
			};

			getDispensaries();
		}
	}, [
		coordinates,
		dispatch,
		enteredSite,
		shopState.isError,
		shopState.isLoading,
	]);
	return <></>;
};

export default LocationProvider;
