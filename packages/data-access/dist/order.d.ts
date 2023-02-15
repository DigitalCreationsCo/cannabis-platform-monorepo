import { Address, Driver, Order, OrderItem, Prisma, User } from "@prisma/client";
import { ProductVariantWithDetails } from "./product";
export declare function createOrder(): Promise<void>;
export declare function findOrdersByOrg(organizationId: string): Promise<Order[]>;
export declare function findOrderWithDetails(id: string): Promise<OrderWithDetails | null>;
export declare function updateOrderWithOrderItems(order: any): Promise<Order>;
export declare function deleteOrder(): Promise<void>;
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
