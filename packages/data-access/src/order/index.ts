import { Prisma, OrderItem, Product, ImageProduct, Unit, Currency } from "@prisma/client";
import prisma from "../db/prisma";

export async function createOrder() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
 }

export async function findOrderWithDetails(id) {
    // try {
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
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}

// export interface OrderDetail extends Order {
//     items?: Prisma.OrderItemUpdateInput;
//     customer?: Prisma.UserUpdateInput;
//     driver?: Prisma.DriverUpdateInput;
//     deliveryInfo?: any;
//     organization?: any;
// }

// export type OrderItemDetail = {
//   product?: Product;
// }

export async function updateOrderWithOrderItems(order) {
    // try {
        console.log('hello')
        console.log('hi')
        return []
        // const updateOrderItems = order.items.map((item) => {
        //     let { createdAt, updatedAt, productId, ...rest } = item;
        //     let orderId = order.id;
        //     const update = prisma.orderItem.upsert({
        //         where: { productId },
        //         create: {
        //             ...rest,
        //             orderId,
        //             unit: Unit[ item.unit ],
        //             currency: Currency[ item.currency ]
        //         },
        //         update: {
        //             ...rest,
        //             orderId,
        //             unit: Unit[ item.unit ],
        //             currency: Currency[ item.currency ],
        //             createdAt
        //         }
        //     });
        //     return update;
        // });
    
        // delete order[ 'updatedAt' ];
        // delete order[ 'items' ];
        // let id = order.id;
        // const updateOrder = await prisma.order.update({
        //     where: { id },
        //     data: {
        //         ...order,
        //         items: {
        //             connect: order.items.map(item => ({
        //                 productId: item.productId,
        //                 orderId: order.id
        //             }))
        //         }
        //     },
        // });
        // await prisma.$transaction([ ...updateOrderItems, updateOrder ]);
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}

export async function deleteOrder() {
    // try {

    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}

export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>
export type OrderItemWithDetails = OrderItem & {
        product?: Product & {
            images: ImageProduct[];
        };
    }
export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
