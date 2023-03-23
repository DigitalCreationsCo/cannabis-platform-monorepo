import { Store } from '@reduxjs/toolkit';
import { LocationStateProps, ModalStateProps, UserStateProps } from './features';

export * from './features';
export * from './middleware';
export { default as Selector } from './selector';

export type AppState = Readonly<{ 
    modal: ModalStateProps
    user: UserStateProps
    location: LocationStateProps
}>

export type ThunkArgumentsType = {
    store: Store;
    supertokens: { signUp: any; signIn: any; signOut: any}
};