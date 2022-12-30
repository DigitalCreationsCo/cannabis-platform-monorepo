import { Prisma, OrderItem, Product, ImageProduct, Unit, Currency } from "@prisma/client";
import prisma from "../db/prisma";

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
    const updateItems = order.items.map((item) => {
        let { createdAt, updatedAt, ...rest } = item
        const update = {
            create: {
                ...rest,
                unit: Unit[ item.unit ],
                currency: Currency[item.currency]
            },
            update: {
                ...rest,
                unit: Unit[ item.unit ],
                currency: Currency[ item.currency ],
                createdAt
            },
            where: { productId: item.productId }
        }
        return update
    })
    delete order[ 'createdAt' ]
    delete order[ 'updatedAt' ]
    delete order[ 'items' ]

    console.log('order!!: ', order)
    const update = await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            ...order,
            items: {
                upsert: updateItems
            }
        },
    })
    return update
}

export async function deleteOrder() {}

export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>
export type OrderItemWithDetails = OrderItem & {
        product?: Product & {
            images: ImageProduct[];
        };
    }
export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
