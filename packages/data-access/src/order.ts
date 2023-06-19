import { Driver, Order, Organization, Prisma, ProductVariant, User } from "@prisma/client";
import prisma from "./db/prisma";
import { connectVariantImages, createProductVariantsWithoutId, ProductVariantWithDetails } from "./variant";

/*
*   createOrder
*   createPurchase
*   findOrdersByOrg
*   findOrderWithDetails
*   updateOrderWithOrderItems
*   updateOrder
*/


export async function createOrder(order: any) {
    try {

        order.items = await createProductVariantsWithoutId(order?.items, order);

        await
            connectVariantImages(order?.items);

        let { coordinates, userId, coordinateId, organizationId, ...destinationAddressData } = order.destinationAddress;

        const itemsConnect = () => order.items?.map((item: ProductVariantWithDetails) => ({ id: item.id }))

        const createOrder = await prisma.order.upsert({
            where: {
                id: order.id
            },
            create: {
                id: order.id,
                subtotal: order.subtotal || order.total,
                total: order.total,
                taxFactor: order.taxFactor || 0,
                taxAmount: order.taxAmount || 0,
                orderStatus: order.orderStatus,
                addressId: order.addressId,
                customerId: order.customerId,
                organizationId: order.organizationId,
                driverId: order.driverId,
                isDeliveredOrder: order.isDeliveredOrder,
                isCustomerReceivedOrder: order.isCustomerReceivedOrder,
                isCompleted: order.isCompleted,
                deliveredAt: order.deliveredAt,
                purchaseId: order.purchaseId,
                items: {
                    connect: itemsConnect()
                },
                // customer: order.customer,
                // organization: order.organization,
                // destinationAddress: {
                //     connectOrCreate: {
                //         where: { id: order.destinationAddress.id },
                //         create: {
                //             ...destinationAddressData,
                //             coordinates: {
                //                 create: {
                //                     latitude: Number(coordinates?.latitude),
                //                     longitude: Number(coordinates?.longitude)
                //                 }
                //             }
                //         }
                //     }
                // }
            },
            update: {
                id: order.id,
                subtotal: order.subtotal || order.total,
                total: order.total,
                taxFactor: order.taxFactor || 0,
                taxAmount: order.taxAmount || 0,
                orderStatus: order.orderStatus,
                addressId: order.addressId,
                customerId: order.customerId,
                organizationId: order.organizationId,
                driverId: order.driverId,
                isDeliveredOrder: order.isDeliveredOrder,
                isCustomerReceivedOrder: order.isCustomerReceivedOrder,
                isCompleted: order.isCompleted,
                deliveredAt: order.deliveredAt,
                purchaseId: order.purchaseId,
                items: {
                    connect: itemsConnect()
                },
            }
        });

        return createOrder as OrderWithDetails

    } catch (error: any) {
        console.error('create order error: ', error.message)
        throw new Error(error.message)
    }
}

export async function createPurchase(purchase: any) {
    try {
        const createPurchase = await prisma.purchase.upsert({
            where: {
                id: purchase.id
            },
            update: { ...purchase, order: { connect: { id: purchase.orderId } } },
            create: {
                ...purchase,
                order: {
                    connect: {
                        id: purchase.orderId
                    }
                },
                customer: {
                    connect: {
                        id: (purchase.customerId)
                    }
                }
            }
        })
        return createPurchase
    } catch (error: any) {
        console.error(error.message)
        throw new Error(error.message)
    }
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
        const order: any = await prisma.order.findUnique(
            {
                where: { id },
                include: {
                    customer: true,
                    driver: true,
                    organization: {
                        include: {
                            address: {
                                include: {
                                    coordinates: true
                                }
                            },
                        }
                    },
                    destinationAddress: true,
                    items: { include: { images: true } }
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
        const updateOrderItemsOp = !!order.items && order.items.map((item: ProductVariant) => {
            let { ...rest } = item;
            let orderId = order.id;
            let variantId = item.id
            const update = prisma.productVariant.upsert({
                where: { id: variantId },
                create: {
                    ...rest,
                    sku: Number(item.sku),
                    size: Number(item.size),
                    quantity: Number(item.quantity),
                    basePrice: Number(item.basePrice),
                    discount: Number(item.discount),
                    salePrice: Number(item.salePrice),
                    stock: Number(item.stock),
                },
                update: {
                    ...rest,
                    sku: Number(item.sku),
                    size: Number(item.size),
                    quantity: Number(item.quantity),
                    basePrice: Number(item.basePrice),
                    discount: Number(item.discount),
                    salePrice: Number(item.salePrice),
                    stock: Number(item.stock)
                }
            });
            return update;
        });
        const connectOrderItems = !!order.items && order.items.map(
            (item: ProductVariant) => ({ id: item.id })) || []
        delete order['items'];
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
        await prisma.$transaction([...updateOrderItemsOp]);
        const updateOrder = await prisma.$transaction([updateOrderOp]);
        return updateOrder[0]
        return updateOrder[0]
    } catch (error: any) {
        console.error('error: ', error)
        throw new Error(error)
    }
}

/**
 * update Order
 * @param id order id
 * @param data fields to update
 * @returns 
 */
export async function updateOrder(id: string, data: OrderUpdateType) {
    try {
        const updated = await prisma.order.update({ where: { id: id }, data: { ...data } })
        return updated
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

/**
 * delete Order
 * @param id order id
 * @returns 
 */
export async function deleteOrder(id: string) {
    try {
        const deleted = await prisma.order.delete({
            where: {
                id
            }
        });
        return deleted;
    } catch (error: any) {
        console.error(error.message)
        throw new Error(error.message)
    }
}

export type OrderUpdateType = Prisma.OrderUpdateArgs["data"]
export type OrderCreateType = Prisma.OrderUncheckedCreateInput & {
    organization: Organization
}

export type OrderWithDetails = Order & {
    items: ProductVariantWithDetails[];
    customer: User;
    driver?: Driver;
    // purchase?: Prisma.PurchaseCreateNestedOneWithoutOrderInput
    // destinationAddress: Address;
}

export type OrderWithDashboardDetails = Order & {
    items: ProductVariantWithDetails[];
    customer: User;
    driver?: Driver;
    // route?: Route;
    // purchase?: Prisma.PurchaseCreateNestedOneWithoutOrderInput
    // destinationAddress: Address;
}

export type PurchaseCreate = Prisma.PurchaseCreateArgs["data"]