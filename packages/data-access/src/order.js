import prisma from "./db/prisma";
/*
*   createOrder
*   createPurchase
*   findOrdersByOrg
*   findOrderWithDetails
*   updateOrderWithOrderItems
*
*   updateVariantQuantity
*/
export async function createOrder(order) {
    try {
        const createOrder = await prisma.order.upsert({
            where: {
                id: order.id
            },
            update: {
                ...order,
                purchase: {
                    connect: {
                        id: order.purchaseId
                    }
                },
                destinationAddress: {
                    connect: {
                        id: order.addressId
                    }
                },
                customer: {
                    connect: {
                        id: order.customerId
                    }
                },
                organization: {
                    connect: {
                        id: order.organizationId
                    }
                }
            },
            create: {
                ...order,
                purchase: {
                    connect: {
                        id: order.purchaseId
                    }
                }
            },
        });
        return createOrder;
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function createPurchase(purchase) {
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
        });
        return createPurchase;
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function findOrdersByOrg(organizationId) {
    try {
        const order = await prisma.order.findMany({
            where: { organizationId },
            orderBy: [
                { updatedAt: 'desc' }
            ]
        }) || [];
        return order;
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
export async function findOrderWithDetails(id) {
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                driver: true,
                destinationAddress: true,
                items: { include: { productVariant: { include: { images: true } } } }
            }
        });
        return order;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
export async function updateOrderWithOrderItems(order) {
    try {
        const updateOrderItemsOp = !!order.items && order.items.map((item) => {
            let { ...rest } = item;
            let orderId = order.id;
            let variantId = item.variantId;
            const update = prisma.orderItem.upsert({
                where: { variantId },
                create: { ...rest, quantity: Number(item.quantity) },
                update: { ...rest, quantity: Number(item.quantity) }
            });
            return update;
        });
        const connectOrderItems = !!order.items && order.items.map((item) => ({
            variantId: item.variantId,
            orderId: order.id
        })) || [];
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
        return updateOrder[0];
        return updateOrder[0];
    }
    catch (error) {
        console.error('error: ', error);
        throw new Error(error);
    }
}
export async function deleteOrder() {
    // try {
    // } catch (error) {
    //     console.error(error.message)
    //     throw new Error(error.message)
    // }
}
export async function updateVariantQuantity(variantId, quantity, operation) {
    try {
        let updateVariant;
        if (operation === '-') {
            updateVariant = await prisma.productVariant.update({
                where: {
                    id: variantId
                },
                data: {
                    stock: {
                        decrement: quantity
                    }
                }
            });
        }
        else if (operation === '+') {
            updateVariant = await prisma.productVariant.update({
                where: {
                    id: variantId
                },
                data: {
                    stock: {
                        increment: quantity
                    }
                }
            });
        }
        return updateVariant;
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
