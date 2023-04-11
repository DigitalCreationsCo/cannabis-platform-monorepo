import { OrganizationWithShopDetails, ProductWithDetails } from "@cd/data-access";
import { AppState } from "../types";
export declare const getDispensariesLocal: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const getProductsFromLocal: import("@reduxjs/toolkit").AsyncThunk<any, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
type OrganizationWithDetailsAndMetadata = OrganizationWithShopDetails & {
    metadata?: {
        productsFetched?: boolean;
    };
};
export type ShopStateProps = {
    dispensaries: OrganizationWithDetailsAndMetadata[];
    products: ProductWithDetails[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
};
export declare const shopSlice: import("@reduxjs/toolkit").Slice<ShopStateProps, {}, "shop">;
export declare const shopActions: {
    getDispensariesLocal: import("@reduxjs/toolkit").AsyncThunk<any, void, {
        state?: unknown;
        dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
        extra?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
    getProductsFromLocal: import("@reduxjs/toolkit").AsyncThunk<any, void, {
        state?: unknown;
        dispatch?: import("redux").Dispatch<import("redux").AnyAction>;
        extra?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
    }>;
};
export declare const shopReducer: import("redux").Reducer<ShopStateProps, import("redux").AnyAction>;
export declare const selectShopState: (state: AppState) => ShopStateProps;
export {};
