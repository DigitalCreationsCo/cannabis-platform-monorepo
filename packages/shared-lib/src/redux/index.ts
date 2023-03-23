import { Store } from '@reduxjs/toolkit';
import { ModalStateProps } from './features';

export * from './features';
export * from './middleware';
export { default as Selector } from './selector';

export type AppState = Readonly<{ 
    modal: ModalStateProps
}>

export type ThunkArgumentsType = {
    store: Store;
    supertokens: { signUp: any; signIn: any; signOut: any}
};