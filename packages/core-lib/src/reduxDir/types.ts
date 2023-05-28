import { Store } from '@reduxjs/toolkit';
import { UserWithDetails } from '../../../data-access/src';
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
    supertokens: { 
        signUp?: any; 
        signIn?: any; 
        signOut: any;
    }
};

// export type PasswordlessResponseWithUserDetails = PromiseReturnType<typeof passwordlessSignIn> & { user: UserWithDetails }
export type PasswordlessResponseWithUserDetails = {
      status: "OK";
      createdNewUser: boolean;
      user: UserWithDetails;
      fetchResponse: Response;
  }