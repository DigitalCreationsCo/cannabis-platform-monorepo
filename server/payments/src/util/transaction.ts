import { OrderWithDetails } from "@cd/data-access"

/**
 * Determines the platform fee for every transaction
 * note: HARD CODE THIS VALUE
 * @param amount 
 * @returns 
 */
function calculatePlatformFeeForTransaction(amount: number) {
//   return Math.round(amount * 0.1)
    return amount
}

/**
 * format order Items list into stripe line items list
 * @param items 
 * @returns array of stripe line item objects
 */
function generateCheckoutLineItemsFromOrderItems(items:OrderWithDetails['items']) {
    return items.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    unit_label: item.unit,
                    metadata: {
                        productId: item.productId,
                    }
                },  
                unit_amount: item.salePrice,
            },
            quantity: item.quantity,
        }
    })
}

export { calculatePlatformFeeForTransaction, generateCheckoutLineItemsFromOrderItems }

