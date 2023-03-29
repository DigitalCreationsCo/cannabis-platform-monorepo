import { Address, Driver, Order, OrderItem, OrderStatus, Prisma, User } from "@prisma/client";
import { ProductVariantWithDetails } from "./product";
export declare function createOrder(order: any): Promise<OrderWithDetails>;
export declare function createPurchase(purchase: any): Promise<import(".prisma/client").Purchase>;
export declare function findOrdersByOrg(organizationId: string): Promise<Order[]>;
export declare function findOrderWithDetails(id: string): Promise<OrderWithDetails>;
export declare function updateOrderWithOrderItems(order: any): Promise<Order>;
export declare function deleteOrder(): Promise<void>;
export declare function updateVariantQuantity(variantId: string, quantity: number, operation: '+' | '-'): Promise<any>;
export type OrderWithDetails = Order & {
    driver: Driver | null;
    items?: OrderItemWithDetails[];
    customer: User;
    destinationAddress: Address;
    updatedAt?: any;
};
export type OrderItemWithDetails = OrderItem & {
    productVariant: ProductVariantWithDetails;
};
export type OrderUpdate = Prisma.OrderUpdateArgs["data"];
export type OrderCreate = {
    id?: string;
    subtotal: number;
    total: number;
    taxFactor: number;
    tax: number;
    orderStatus?: OrderStatus;
    purchaseId?: string | null;
    addressId: string;
    customerId: string;
    organizationId: string;
    driverId?: string | null;
    isDelivered?: boolean;
    deliveredAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: OrderItemWithDetails[];
};
export type PurchaseCreate = Prisma.PurchaseCreateArgs["data"];
//# sourceMappingURL=order.d.ts.map