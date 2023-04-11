import { OrganizationWithShopDetails, ProductWithDetails } from "@cd/data-access";
import { AppState } from "../types";
export declare const getDispensariesLocal: any;
export declare const getProductsFromLocal: any;
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
export declare const shopSlice: any;
export declare const shopActions: any;
export declare const shopReducer: any;
export declare const selectShopState: (state: AppState) => ShopStateProps;
export {};
