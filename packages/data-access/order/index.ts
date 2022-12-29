import { Prisma, Order, OrderItem, User, Driver, Address, Organization, Product } from "@prisma/client";
import prisma from "../prisma";

export async function createOrder() { }

export async function findOrderWithDetails(id) {
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

export async function updateOrder(order) {
    const update = await prisma.order.update({
        where: {
            id: order.id
        },
        data: order
    })
    return update
}

export async function deleteOrder() {}

export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>
export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
