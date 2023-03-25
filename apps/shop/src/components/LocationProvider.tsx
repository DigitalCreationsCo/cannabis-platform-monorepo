import { selectSelectedLocationState } from '@cd/shared-lib';
import { useDispatch, useSelector } from 'react-redux';

const LocationProvider = ({ children }: PropsWithChildren) => {
    const dispatch = useDispatch();
    const location = useSelector(selectSelectedLocationState);

    const { coordinates, zipcode } = location.address;

    // const getVendorsAsync = async () => {
    //   await dispatch(vendorActions.getVendors());
    // };
    // const getProductsAsync = async () => {
    //   await dispatch(productActions.getProducts());
    // };

    // this useEffect should watch locationType,
    // and refetch vendors and products for the new geoLocation Coordinates
    // Test it!
    // useEffect(() => {
    //   console.log("locationType effect");
    //   if (geoLocation.coordinates.length === 2) {
    //     setIsLoading(true);
    //     if (!isFetching) {
    //       getVendorsAsync();
    //     }
    //     // console.log("geolocation effect ? ", geoLocation);
    //     // getProductsAsync();
    //   }
    // }, [locationType]);

    // useEffect(() => {
    //   console.log("geolocation effect");
    // }, [geoLocation]);

    // useEffect(() => {
    //   console.log("vendors length ? ", vendors?.length);
    //   if (vendors?.length >= 1) {
    //     console.log("calling get Products");
    //     getProductsAsync();
    //   }
    // }, [vendors]);

    // temporary useEffect until vendorCards and productCards and HomeScreen are connected components
    // useEffect(() => {
    //   // if (vendors?.length > 1 && products?.length > 1) {
    //   //   setTimeout(() =>
    //   setIsLoading(false);
    //   //   , 200);
    //   // }
    // }, []);

    return <>{children}</>;
};

export default LocationProvider;
