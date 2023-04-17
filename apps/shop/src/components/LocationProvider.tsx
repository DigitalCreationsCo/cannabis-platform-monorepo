import { locationActions, selectSelectedLocationState, selectShopState, shopActions } from '@cd/core-lib';
import { AnyAction } from '@reduxjs/toolkit';
import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const LocationProvider = ({ children }: PropsWithChildren) => {
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

    const location = useSelector(selectSelectedLocationState);
    const shop = useAppSelector(selectShopState);

    const { coordinates, zipcode } = location.address;

    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            if (!shop.isLoading) {
                getDispensaries();
            }
        }
    }, [coordinates]);
    // }, [coordinates, zipcode, location]);

    useEffect(() => {
        if (shop?.dispensaries?.length >= 1) {
            getProducts();
        }
    }, [!shop.isLoading, shop?.dispensaries?.length]);

    return <>{children}</>;
};

export default LocationProvider;
