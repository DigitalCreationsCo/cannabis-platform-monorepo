import { Address, Driver, Order, OrderItem, Prisma, User } from "@prisma/client";
import prisma from "./db/prisma";
import { ProductVariantWithDetails } from "./product";

export async function createOrder() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findOrdersByOrg(organizationId: string) {
    try {
        const order = await prisma.order.findMany(
            {
            where:
                { organizationId },
            orderBy: [
                { updatedAt: 'desc' }
            ]
            }
            ) || [];
        return order;
    } catch (error: any) {
        console.error(error.message)
        throw new Error(error.message)
    }
}

export async function findOrderWithDetails(id: string) {
    try {
        const order = await prisma.order.findUnique(
            {
                where: { id },
                include: {
                    customer: true,
                    driver: true,
                    deliveryInfo: true,
                    items: { include: { productVariant: { include: { images: true } } } }
                }
            }
        )
        return order
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export async function updateOrderWithOrderItems(order: any) {
    try {
        const updateOrderItemsOp = !!order.items && order.items.map((item: OrderItem) => {
            let { ...rest } = item;
            let orderId = order.id;
            let variantId = item.variantId
            const update = prisma.orderItem.upsert({
                where: {
                    orderId_variantId: {
                        orderId, variantId
                    }
                },
                create: { ...rest, quantity: Number(item.quantity) },
                update: { ...rest, quantity: Number(item.quantity) }
            });
            return update;
        });
        const connectOrderItems = !!order.items && order.items.map((item: OrderItem) => (
            {
                variantId: item.variantId,
                orderId: order.id
            })
        ) || []
        delete order[ 'items' ];
        let id = order.id;
        const updateOrderOp = prisma.order.update({
            where: { id },
            data: {
                ...order,
                items: {
                    connect: connectOrderItems
                }
            },
        });
        await prisma.$transaction([ ...updateOrderItemsOp ]);
        const updateOrder = await prisma.$transaction([ updateOrderOp ]);
        return updateOrder[0]
    } catch (error: any) {
        console.error('error: ', error)
        throw new Error(error)
    }
}

export async function deleteOrder() {
    // try {

    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}

// export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>
export type OrderWithDetails = Order & {
    driver: Driver | null;
    items?: OrderItemWithDetails[];
    customer: User;
    deliveryInfo: Address;
    updatedAt?: any;
}

export type OrderItemWithDetails = OrderItem & {
    productVariant: ProductVariantWithDetails
    }
export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
