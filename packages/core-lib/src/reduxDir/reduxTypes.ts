import { Store } from '@reduxjs/toolkit';
import { CartStateProps, DriverSessionState, LocationStateProps, ModalStateProps, ShopStateProps, UserStateProps } from './features';

export type AppState = Readonly<{ 
    modal: ModalStateProps
    user: UserStateProps
    driver: DriverSessionState
    location: LocationStateProps
    shop: ShopStateProps
    cart: CartStateProps
}>

export type ThunkArgumentsType = {
    store: Store;
    supertokens: { 
        signUp?: any; 
        signIn?: any; 
        signOut: any;
    },
    navigation?: {
        navigate: (routename: any, params: any) => void;
        goBack: () => void;
    }
};


