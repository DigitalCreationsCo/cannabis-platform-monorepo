import { Address, Driver, Order, OrderStatus, Organization, Prisma, ProductVariant, User } from "@prisma/client";
import { AddressWithDetails } from "./address";
import prisma from "./db/prisma";
import { OrganizationWithShopDetails } from "./organization";
import { UserWithDetails } from "./user";
import { ProductVariantWithDetails } from "./variant";

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
        const createOrder = await prisma.order.create({
            data: { ...order }
        })
        return createOrder as OrderWithDetails
    } catch (error: any) {
        console.error(error.message)
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
        const order:OrderWithDetails|null = await prisma.order.findUnique(
            {
                where: { id },
                include: {
                    customer: true,
                    driver: true,
                    organization: true,
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
                create: { ...rest, 
                    sku: Number(item.sku),
                    size: Number(item.size),
                    quantity: Number(item.quantity),
                    basePrice: Number(item.basePrice),
                    discount: Number(item.discount),
                    salePrice: Number(item.salePrice),
                    stock: Number(item.stock),
                },
                update: { ...rest,
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
export async function updateOrder(id: string, data: Prisma.OrderUpdateArgs['data']) {
    try {
        const update = await prisma.order.update({ where: { id }, data: {...data }})
        return update
    } catch (error: any) {
        console.error(error)
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

export type OrderUpdate = Prisma.OrderUpdateArgs[ "data" ]
// export type OrderCreate = Prisma.OrderCreateArgs[ "data" ]
export type OrderCreate = {
    id?: string
    subtotal: number
    total: number
    taxFactor: number
    taxAmount: number
    orderStatus?: OrderStatus
    purchaseId?: string | null
    addressId: string
    destinationAddress: AddressWithDetails
    
    customerId: string
    customer: UserWithDetails | null
    
    organizationId: string
    // organization: Organization
    organization: OrganizationWithShopDetails

    driverId?: string | null
    driver: Driver | null
    
    isDeliveredOrder: boolean
    isCustomerReceivedOrder: boolean
    isCompleted: boolean

    deliveredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ProductVariantWithDetails[]
    // purchase?: PurchaseCreateNestedOneWithoutOrderInput
}
  
// export type OrderWithDetails = Prisma.PromiseReturnType<typeof findOrderWithDetails>
export type OrderWithDetails = Order & {
    id?: string
    subtotal: number
    total: number
    taxFactor: number
    taxAmount: number
    orderStatus?: OrderStatus
    purchaseId?: string | null
    addressId: string
    destinationAddress: Address
    
    customerId: string
    customer: User
    
    organizationId: string
    organization: Organization
    // organization: OrganizationWithShopDetails

    driverId?: string | null
    driver: Driver | null
    
    isDeliveredOrder: boolean
    isCustomerReceivedOrder: boolean
    isCompleted: boolean

    deliveredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ProductVariantWithDetails[]
    // purchase?: PurchaseCreateNestedOneWithoutOrderInput

    // driver: Driver | null;
    // items?: ProductVariantWithDetails[];
    // customer: User;
    // destinationAddress: Address;
    // updatedAt?: any;
}

export type PurchaseCreate = Prisma.PurchaseCreateArgs[ "data" ]