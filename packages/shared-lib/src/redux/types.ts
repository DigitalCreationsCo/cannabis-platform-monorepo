import { Store } from '@reduxjs/toolkit';
import { CartStateProps, LocationStateProps, ModalStateProps, ShopStateProps, UserStateProps } from './features';

export type AppState = Readonly<{ 
    modal: ModalStateProps
    user: UserStateProps
    location: LocationStateProps
    shop: ShopStateProps
    cart: CartStateProps
}>

export type ThunkArgumentsType = {
    store: Store;
    supertokens: { signUp: any; signIn: any; signOut: any}
};