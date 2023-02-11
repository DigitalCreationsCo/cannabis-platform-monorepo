import { Address, Driver, Order, OrderItem, Prisma, User } from "@prisma/client";
import { ProductVariantWithDetails } from "./product";
export declare function createOrder(): Promise<void>;
export declare function findOrdersByOrg(organizationId: string): Promise<Order[]>;
export declare function findOrderWithDetails(id: string): Promise<(Order & {
    items: (OrderItem & {
        productVariant: import(".prisma/client").ProductVariant & {
            images: import(".prisma/client").ImageProduct[];
        };
    })[];
    driver: Driver | null;
    deliveryInfo: Address;
    customer: User;
}) | null>;
export declare function updateOrderWithOrderItems(order: any): Promise<Order>;
export declare function deleteOrder(): Promise<void>;
export type OrderWithDetails = Order & {
    driver: Driver | null;
    items?: OrderItemWithDetails[];
    customer: User;
    deliveryInfo: Address;
    updatedAt?: any;
};
export type OrderItemWithDetails = OrderItem & {
    productVariant: ProductVariantWithDetails;
};
export type OrderUpdate = Prisma.OrderUpdateArgs["data"];
