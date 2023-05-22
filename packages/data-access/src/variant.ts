import { ImageProduct, ProductVariant } from "@prisma/client";
import prisma from "./db/prisma";

/*
*   updateVariantQuantity
*/

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