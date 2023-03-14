import { Store } from '@reduxjs/toolkit';

export * from './features';
export * from './middleware';
export { default as Selector } from './selector';

export type AppState = Readonly<{ 
    modal: {
        modalType: string;
        modalVisible: boolean;
        modalText: string;
        isLoading: boolean;
        isConfirmed: boolean;
        isDeclined: boolean;
        isSelected: boolean;
    }
}>

export type ThunkArgumentsType = {
    store: Store;
};