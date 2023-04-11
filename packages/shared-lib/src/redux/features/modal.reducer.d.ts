import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppState, ThunkArgumentsType } from "../types";
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
export declare const modalActions: {
    openModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "modal/openModal">;
    closeModal: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/closeModal">;
    waitLoading: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/waitLoading">;
    confirm: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/confirm">;
    decline: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/decline">;
    select: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/select">;
    clearModalState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"modal/clearModalState">;
    launchConfirmModal: import("@reduxjs/toolkit").AsyncThunk<boolean, modalActionPayload, {
        dispatch: Dispatch<AnyAction>;
        extra: ThunkArgumentsType;
        state?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
    launchSelectModalLocationType: import("@reduxjs/toolkit").AsyncThunk<boolean, modalActionPayload, {
        dispatch: Dispatch<AnyAction>;
        extra: ThunkArgumentsType;
        state?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
    launchTipModal: import("@reduxjs/toolkit").AsyncThunk<boolean, modalActionPayload, {
        dispatch: Dispatch<AnyAction>;
        extra: ThunkArgumentsType;
        state?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
};
export declare const modalReducer: import("redux").Reducer<import("immer/dist/internal").WritableDraft<ModalStateProps>, AnyAction>;
export declare const selectModalState: (state: AppState) => ModalStateProps;
