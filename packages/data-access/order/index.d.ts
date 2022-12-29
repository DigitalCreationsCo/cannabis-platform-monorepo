import { Prisma, Order, OrderItem, User, Driver, Address, Product, ImageProduct } from "@prisma/client";
export declare function createOrder(): Promise<void>;
export declare function findOrderWithDetails(id: any): Promise<(Order & {
    items: (OrderItem & {
        product: Product & {
            images: ImageProduct[];
        };
    })[];
    driver: Driver | null;
    deliveryInfo: Address;
    customer: User;
}) | null>;
export declare function updateOrder(order: any): Promise<Order>;
export declare function deleteOrder(): Promise<void>;
export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>;
export type OrderItemWithDetails = OrderItem & {
    product?: Product & {
        images: ImageProduct[];
    };
};
export type OrderUpdate = Prisma.OrderUpdateArgs["data"];
