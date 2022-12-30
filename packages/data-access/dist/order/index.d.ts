import { Prisma, OrderItem, Product, ImageProduct } from "@prisma/client";
export declare function createOrder(): Promise<void>;
export declare function findOrderWithDetails(id: any): Promise<import(".prisma/client").Order & {
    items: (OrderItem & {
        product: Product & {
            images: ImageProduct[];
        };
    })[];
    driver: import(".prisma/client").Driver;
    deliveryInfo: import(".prisma/client").Address;
    customer: import(".prisma/client").User;
}>;
export declare function updateOrder(order: any): Promise<import(".prisma/client").Order>;
export declare function deleteOrder(): Promise<void>;
export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>;
export type OrderItemWithDetails = OrderItem & {
    product?: Product & {
        images: ImageProduct[];
    };
};
export type OrderUpdate = Prisma.OrderUpdateArgs["data"];
