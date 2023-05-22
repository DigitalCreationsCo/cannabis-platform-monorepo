import { ImageProduct, Prisma, ProductVariant, Unit } from "@prisma/client";
import { OrderCreate } from "order";
import prisma from "./db/prisma";

/*
*   updateVariantQuantity
*/

export async function createProductVariantsWithoutId (items: ProductVariantCreateType[], order: OrderCreate) {
    try {
        
        const 
        createItems = items?.filter((item) => !item.id).map((item) => ({
            name: item.name,
            sku: item.sku || null,
            organizationId: item.organizationId || order.organizationId,
            organizationName: item.organizationName || order.organization.name,
            // product: {
            //     create: 
            // }
            productId: item.productId || '',
            unit: item.unit as Unit,
            size: item.size,
            quantity: 0,
            basePrice: item.basePrice,
            discount: item.discount || 0,
            isDiscount: item.isDiscount || false,
            salePrice: item.salePrice,
            currency: item.currency || 'USD',
            stock: item.stock || 0,
            order: {
                connect: order.id
            },
            images: item.images
        }));

        await prisma.productVariant.createMany({
            data: createItems
        })

        return createItems
        
    } catch (error: any) {
        console.error('error create product variants during create order error: ', error)
        throw new Error(error.message)
    }
}

export async function updateVariantQuantity(variantId:string, quantity:number, operation:'+'|'-') {
    try {
        let updateVariant
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
            })
        } else if (operation === '+') {
            updateVariant = await prisma.productVariant.update({
                where: {
                    id: variantId
                },
                data: {
                    stock: {
                        increment: quantity
                    }
                }
            })
        }
        return updateVariant
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export type ProductVariantWithDetails = ProductVariant & {
    images?: ImageProduct[];
  };

export type ProductVariantCreateType = Prisma.ProductVariantUncheckedCreateInput