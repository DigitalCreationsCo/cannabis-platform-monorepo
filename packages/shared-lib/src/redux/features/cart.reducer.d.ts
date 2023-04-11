import { OrderItem, OrderStatus } from "@cd/data-access";
import { AppState } from "../types";
export declare const addItem: any;
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
export declare const cartActions: any;
export declare const cartReducer: any;
export declare const selectCartState: (state: AppState) => CartStateProps;
export declare const selectIsCartEmpty: (state: AppState) => Boolean;
