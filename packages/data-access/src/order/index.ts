import { Prisma, OrderItem, Product, ImageProduct, Unit, Currency, Driver, User, Address, Order } from "@prisma/client";
import prisma from "../db/prisma";

export async function createOrder() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findOrderWithDetails(id) {
    try {
        const order = await prisma.order.findUnique(
            {
                where: { id },
                include: {
                    customer: true,
                    driver: true,
                    deliveryInfo: true,
                    items: { include: { product: { include: { images: true } } } }
                }
            }
        )
        return order
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export async function updateOrderWithOrderItems(order:OrderWithDetails) {
    try {
        const updateOrderItems = order.items?.map((item: OrderItem) => {
            let { ...rest } = item;
            let orderId = order.id;
            let productId = item.productId
            const update = prisma.orderItem.upsert({
                where: {
                    orderId_productId: {
                        orderId, productId
                    }
                },
                create: { ...rest, quantity: Number(item.quantity) },
                update: { ...rest, quantity: Number(item.quantity) }
            });
            return update;
        });

        const connectOrderItems = order?.items.map(item => (
            {
                productId: item.productId,
                orderId: order.id
            })
        )
        delete order[ 'updatedAt' ];
        delete order[ 'items' ];
        let id = order.id;
        // const updateOrder = prisma.order.update({
        //     where: { id },
        //     data: {
        //         ...order,
        //         items: {
        //             connect: connectOrderItems
        //         }
        //     },
        // });

        await prisma.$transaction([ ...updateOrderItems
            // , updateOrder
        ]);
    } catch (error) {
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
    items?: (OrderItem & {
        product: Product & {
            images: ImageProduct[];
        };
    })[];
    customer: User;
    deliveryInfo: Address;
    updatedAt?: any;
}
export type OrderItemWithDetails = OrderItem & {
        product?: Product & {
            images: ImageProduct[];
        };
    }
export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
