import { OrderWithDetails } from "@cd/data-access"

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

export { generateCheckoutLineItemsFromOrderItems }

