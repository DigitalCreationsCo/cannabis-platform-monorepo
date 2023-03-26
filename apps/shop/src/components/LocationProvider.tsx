import { locationActions, selectSelectedLocationState, selectShopState, shopActions } from '@cd/shared-lib';
import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const LocationProvider = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();

    const getDispensaries = async () => {
        dispatch(shopActions.getDispensariesLocal());
    };

    const getProducts = async () => {
        dispatch(shopActions.getProductsFromLocal());
    };

    if (typeof window !== 'undefined') {
        if (navigator?.geolocation !== undefined) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(
                        locationActions.setCurrentCoordinates({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        })
                    );
                },
                () => console.log('Geolocation is not supported by this browser.')
            );
        }
    }

    const location = useSelector(selectSelectedLocationState);
    const shop = useAppSelector(selectShopState);

    const { coordinates, zipcode } = location.address;

    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            if (!shop.isLoading) {
                getDispensaries();
            }
        }
    }, [coordinates, zipcode, location]);

    useEffect(() => {
        if (shop?.dispensaries?.length >= 1) {
            console.log('calling get Products');
            getProducts();
        }
    }, [shop?.dispensaries?.length]);

    return <>{children}</>;
};

export default LocationProvider;
