import { OrderItem, OrderStatus } from "@cd/data-access";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AppState, ThunkArgumentsType } from "../types";
export declare const addItem: import("@reduxjs/toolkit").AsyncThunk<OrderItem, OrderItem, {
    dispatch: Dispatch<AnyAction>;
    extra: ThunkArgumentsType;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export type CartStateProps = {
    order: {
        subtotal: number;
        total: number;
        taxFactor: number;
        tax: number;
        orderStatus: OrderStatus | null;
        addressId: string;
        customerId: string;
        organizationId: string;
    };
    orderDispensaryName: string;
    cart: OrderItem[];
    totalItems: number;
    subtotal: number;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
};
export declare const cartActions: {
    clearState: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"cart/clearState">;
    updateItem: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "cart/updateItem">;
    removeItem: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "cart/removeItem">;
    addItem: import("@reduxjs/toolkit").AsyncThunk<OrderItem, OrderItem, {
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
export declare const cartReducer: import("redux").Reducer<import("immer/dist/internal").WritableDraft<CartStateProps>, AnyAction>;
export declare const selectCartState: (state: AppState) => CartStateProps;
export declare const selectIsCartEmpty: (state: AppState) => Boolean;
