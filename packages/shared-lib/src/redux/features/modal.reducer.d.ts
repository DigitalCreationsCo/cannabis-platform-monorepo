import { AppState } from "../types";
export type ModalStateProps = {
    modalType: string;
    modalVisible: boolean;
    modalText?: string;
    isLoading?: boolean;
    isConfirmed?: boolean;
    isDeclined?: boolean;
    isSelected?: boolean;
    errorMessage: string;
};
export type modalActionPayload = {
    modalType: string;
    modalText?: string;
};
export declare const modalActions: any;
export declare const modalReducer: any;
export declare const selectModalState: (state: AppState) => ModalStateProps;
