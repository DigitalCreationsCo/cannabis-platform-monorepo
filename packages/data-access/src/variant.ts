// @ts-nocheck

import { createId } from '@paralleldrive/cuid2';
import { CurrencyName, ImageProduct, Prisma, ProductVariant, Unit } from "@prisma/client";
import prisma from "./db/prisma";
import { OrderCreate } from "./order";

/**
 * connectVariantImages
 * createProductVariantsWithoutId
 * updateVariantQuantity
 * 
 */

export const connectVariantImages = async (items: ProductVariantWithDetails[]) => items?.filter((item) => !item.id).forEach(async (item) => {

    item.images &&
        await prisma.imageProduct.createMany({
            data: item?.images?.map((image: ImageProduct) => ({
                ...image,
                location: image.location,
                variantId: item?.id as string
            }))
        });
});

export async function createProductVariantsWithoutId(items: ProductVariantCreateType[], order: OrderCreate) {
    try {

        const
            createItems = items?.filter((item) => !item.id).map((item) => ({
                id: item.id || createId(),
                name: item.name,
                sku: Number(item.sku) || null,
                organizationId: item.organizationId || order.organizationId,
                organizationName: item.organizationName || order.organization.name,
                // product: {
                //     create: 
                // }
                productId: item.productId || '',
                unit: item.unit as Unit,
                size: Number(item.size),
                quantity: Number(0),
                basePrice: Number(item.basePrice),
                discount: Number(item.discount) || 0,
                isDiscount: item.isDiscount || false,
                salePrice: Number(item.salePrice),
                currency: item.currency || 'USD',
                stock: Number(item.stock) || 0,
            }));

        const result = await prisma.productVariant.createMany({
            data: [...createItems]
        })

        return createItems

    } catch (error: any) {
        console.error('error create product variants during create order error: ', error)
        throw new Error(error.message)
    }
}

export async function updateVariantQuantity(variantId: string, quantity: number, operation: '+' | '-') {
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

// export type ProductVariantCreateType = Prisma.ProductVariantUncheckedCreateInput
export type ProductVariantCreateType = {
    id?: string
    name: string
    sku?: number | null
    organizationId: string
    organizationName: string
    productId: string
    unit?: Unit
    size: number
    quantity: number
    basePrice: number
    discount: number
    isDiscount: boolean
    salePrice: number
    currency: CurrencyName
    stock: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order?: Prisma.OrderUncheckedCreateNestedManyWithoutItemsInput
    images?: ImageProduct[]
}