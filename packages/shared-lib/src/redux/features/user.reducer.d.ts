import { UserWithDetails } from "@cd/data-access";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppState, ThunkArgumentsType } from "../types";
export declare const signinUserAsync: import("@reduxjs/toolkit").AsyncThunk<UserWithDetails, {
    email: string;
    password: string;
}, {
    dispatch: Dispatch<AnyAction>;
    extra: ThunkArgumentsType;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export type UserStateProps = {
    token: string | null;
    user: UserWithDetails;
    isSignedIn: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
};
export declare const userSlice: import("@reduxjs/toolkit").Slice<import("immer/dist/internal").WritableDraft<UserStateProps>, {
    signinUserSync: (state: import("immer/dist/internal").WritableDraft<UserStateProps>, { payload }: {
        payload: any;
        type: string;
    }) => void;
    clearState: (state: import("immer/dist/internal").WritableDraft<UserStateProps>) => import("immer/dist/internal").WritableDraft<UserStateProps>;
    clearErrorMessage: (state: import("immer/dist/internal").WritableDraft<UserStateProps>) => void;
}, "user">;
export declare const userActions: {
    signinUserSync: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "user/signinUserSync">;
    clearState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/clearState">;
    clearErrorMessage: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/clearErrorMessage">;
    signinUserAsync: import("@reduxjs/toolkit").AsyncThunk<UserWithDetails, {
        email: string;
        password: string;
    }, {
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
export declare const userReducer: import("redux").Reducer<import("immer/dist/internal").WritableDraft<UserStateProps>, AnyAction>;
export declare const selectUserState: (state: AppState) => UserStateProps;
