import { AddressPayload, locationActions, selectSelectedLocationState, selectShopState, shopActions } from '@cd/core-lib';
import { getGeoAddressByCoordinates } from '@cd/core-lib/src/utils/geo';
import { AnyAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const LocationProvider = () => {
    const router = useRouter()
    const [enteredSite, setEnteredSite] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['yesOver21']);

    useEffect(() => {
        function checkCheckAgeCookie(): boolean {
            return cookies.yesOver21 || false
        }
        checkCheckAgeCookie() ? setEnteredSite(true) : setEnteredSite(false);
    }, [router])

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
        if (typeof window !== 'undefined' && enteredSite) {
            if (navigator?.geolocation !== undefined) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (coordinates.latitude !== position.coords.latitude || 
                            coordinates.longitude !== position.coords.longitude)
                        console.log('geolocating your position...', position);
                        dispatch(
                            locationActions.setCurrentCoordinates({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            })
                        );
                        getGeoAddressByCoordinates({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                        .then(address => dispatch(locationActions.setCurrentAddress(address as AddressPayload)))
                        .catch(error => console.log("Location Provider getGeoAddressByCoordifdnates error: ", error));
                    },
                    () => console.log('Geolocation is not supported by this browser.')
                );
            }
        }
    }, [enteredSite]);

    const selectedLocation = useSelector(selectSelectedLocationState);
    const shopState = useAppSelector(selectShopState);

    const coordinates = selectedLocation?.address?.coordinates;
    
    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude && enteredSite) {
            if (!shopState.isLoading) {
                getDispensaries();
            }
        }
    }, [coordinates]);

    useEffect(() => {
        if (!shopState.isLoading && shopState?.dispensaries?.length >= 1 && enteredSite) {
            getProducts();
        }
    }, [shopState]);
};

export default LocationProvider;