import { locationActions, selectSelectedLocationState, selectShopState, shopActions } from '@cd/core-lib';
import { AnyAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const LocationProvider = () => {
    const dispatch = useAppDispatch();

    const getDispensaries = async () => {
        dispatch(shopActions.getDispensariesLocal() as unknown as AnyAction);
    };

    const getProducts = async () => {
        dispatch(shopActions.getProductsFromLocal() as unknown as AnyAction);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (navigator?.geolocation !== undefined) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log('geolocating your position...');
                        dispatch(
                            locationActions.setCurrentCoordinates({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            })
                        );

                        dispatch(
                            locationActions.getAddressByCoordinates({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }) as unknown as AnyAction
                        );
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
