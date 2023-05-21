import { ProductVariantWithDetails } from "@cd/data-access";

/**
 * format order Items list into stripe line items list
 * @param items 
 * @returns array of stripe line item objects
 */
function generateCheckoutLineItemsFromOrderItems(items: ProductVariantWithDetails[]) {

    const 
    lineItems = items.map(item => {
        
        console.log('item: ', item);

        return({
            price_data: {
                unit_amount: item.salePrice,
                currency: 'usd',
                product_data: {
                    name: item.name,
                    metadata: {
                        productId: item.productId,
                    }
                },  
            },
            quantity: item.quantity,
        });
    });

    return lineItems
}

export { generateCheckoutLineItemsFromOrderItems };

