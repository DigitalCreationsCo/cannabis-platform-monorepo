import { locationActions, selectSelectedLocationState, selectShopState, shopActions } from '@cd/core-lib';
import { getGeoAddressByCoordinates } from '@cd/core-lib/src/utils/geo';
import { AnyAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const LocationProvider = () => {
    const dispatch = useAppDispatch();

    const getDispensaries = async () => {
        dispatch(shopActions.getDispensariesLocal() as unknown as AnyAction);
        console.log('getDispensaries');
    };

    const getProducts = async () => {
        dispatch(shopActions.getProductsFromLocal() as unknown as AnyAction);
        console.log('getProducts');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (navigator?.geolocation !== undefined) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('geolocating your position...', position);
                        // dispatch(
                        //     locationActions.setCurrentCoordinates({
                        //         latitude: position.coords.latitude,
                        //         longitude: position.coords.longitude
                        //     })
                        // );
                        getGeoAddressByCoordinates({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                        .then(address => dispatch(locationActions.setCurrentAddress(address)))
                        .catch(error => console.log("Location Provider getGeoAddressByCoordifdnates error: ", error));
                    },
                    () => console.log('Geolocation is not supported by this browser.')
                );
            }
        }
    }, []);

    const selectedLocation = useSelector(selectSelectedLocationState);
    const shopState = useAppSelector(selectShopState);

    const coordinates = selectedLocation?.address?.coordinates;

    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            if (!shopState.isLoading) {
                getDispensaries();
            }
        }
    }, [coordinates]);

    useEffect(() => {
        if (!shopState.isLoading && shopState?.dispensaries?.length >= 1) {
            getProducts();
        }
    }, [shopState]);
};

export default LocationProvider;
